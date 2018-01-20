package com.youbc.pooling;

import com.youbc.database.ProfileDAO;
import com.youbc.database.UserPoolStrategyDAO;
import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.models.candidate.ClassmateCandidate;
import com.youbc.models.profile.ClassmatesProfile;
import com.youbc.models.profile.UserProfile;
import org.springframework.http.HttpStatus;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PoolingRandomClassmates implements PoolingStrategy {

    private ProfileDAO profileDAO;
    private UserPoolStrategyDAO userPoolStrategyDAO;

    public PoolingRandomClassmates(ProfileDAO profileDAO, UserPoolStrategyDAO userPoolStrategyDAO) {
        this.profileDAO = profileDAO;
        this.userPoolStrategyDAO = userPoolStrategyDAO;
    }

    public Set<BasicCandidate> poolUsers(int amount, Set<String> except) {
        List<String> candidateIDs = userPoolStrategyDAO.fetchRandomClassmates(amount, except);
        Set<BasicCandidate> candidates = new HashSet<>();

        for (String id : candidateIDs) {
            ClassmatesProfile classmatesProfile = profileDAO.fetchClassmatesProfile(id)
                    .orElseThrow(() -> new YouBCException(new YouBCError(HttpStatus.NOT_FOUND, "cannot find user info", "cannot find  module profile info")));
            UserProfile userProfile = profileDAO.fetchUserProfile(id)
                    .orElseThrow(() -> new YouBCException(new YouBCError(HttpStatus.NOT_FOUND, "cannot find user info", "cannot find general user profile info")));
            ClassmateCandidate classmateCandidate = new ClassmateCandidate(
                    userProfile.getUserId(),
                    userProfile.getUsername(),
                    userProfile.getAvatarUrl(),
                    userProfile.getSex(),
                    userProfile.getAge(),
                    userProfile.getHoroscope(),
                    userProfile.getMatchRate(),
                    classmatesProfile.getMajor(),
                    "year ?", // todo: add year attribute
                    classmatesProfile.getCourses(),
                    classmatesProfile.getMotto(),
                    classmatesProfile.getTags()
            );
            candidates.add(classmateCandidate);
        }
        return candidates;
    }
}
