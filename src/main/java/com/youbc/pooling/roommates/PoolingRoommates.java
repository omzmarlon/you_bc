package com.youbc.pooling.roommates;

import com.youbc.database.ProfileDAO;
import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.models.candidate.RoommateCandidate;
import com.youbc.models.profile.RoommatesProfile;
import com.youbc.models.profile.UserProfile;
import org.springframework.http.HttpStatus;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public abstract class PoolingRoommates {
    private ProfileDAO profileDAO;

    public PoolingRoommates(ProfileDAO profileDAO) {
        this.profileDAO = profileDAO;
    }

    public Set<BasicCandidate> populateToRoommates(List<String> userIds) {

        Set<BasicCandidate> candidates = new HashSet<>();

        for (String id : userIds) {
            RoommatesProfile roommatesProfile = profileDAO.fetchRoommatesProfile(id)
                    .orElseThrow(() -> new YouBCException(new YouBCError(HttpStatus.NOT_FOUND, "cannot find user info", "cannot find  module profile info")));
            UserProfile userProfile = profileDAO.fetchUserProfile(id)
                    .orElseThrow(() -> new YouBCException(new YouBCError(HttpStatus.NOT_FOUND, "cannot find user info", "cannot find general user profile info")));
            RoommateCandidate roommateCandidate = new RoommateCandidate(
                    userProfile.getUserId(),
                    userProfile.getUsername(),
                    userProfile.getAvatarUrl(),
                    userProfile.getSex(),
                    userProfile.getAge(),
                    userProfile.getHoroscope(),
                    userProfile.getMatchRate(),
                    roommatesProfile.getLocation(),
                    roommatesProfile.getHometown(),
                    roommatesProfile.getMotto(),
                    roommatesProfile.getTags()
            );
            candidates.add(roommateCandidate);
        }
        return candidates;
    }
}
