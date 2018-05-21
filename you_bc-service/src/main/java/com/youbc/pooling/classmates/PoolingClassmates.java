package com.youbc.pooling.classmates;

import com.youbc.database.ProfileDAO;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.models.candidate.ClassmateCandidate;
import com.youbc.models.profile.ClassmatesProfile;
import com.youbc.models.profile.UserProfile;
import org.springframework.http.HttpStatus;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public abstract class PoolingClassmates {

    private ProfileDAO profileDAO;

    public PoolingClassmates(ProfileDAO profileDAO) {
        this.profileDAO = profileDAO;
    }

    public Set<BasicCandidate> populateToClassmates(List<Integer> userIds) {

        Set<BasicCandidate> candidates = new HashSet<>();

        for (Integer id : userIds) {
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
                    "大一", // todo: add year attribute
                    classmatesProfile.getCourses(),
                    classmatesProfile.getMotto(),
                    classmatesProfile.getTags()
            );
            candidates.add(classmateCandidate);
        }
        return candidates;
    }
}
