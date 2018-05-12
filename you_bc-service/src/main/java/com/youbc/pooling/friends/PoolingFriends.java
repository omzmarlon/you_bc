package com.youbc.pooling.friends;

import com.youbc.database.ProfileDAO;
import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.models.candidate.FriendCandidate;
import com.youbc.models.profile.FriendsProfile;
import com.youbc.models.profile.UserProfile;
import org.springframework.http.HttpStatus;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public abstract class PoolingFriends {

    private ProfileDAO profileDAO;

    public PoolingFriends(ProfileDAO profileDAO) {
        this.profileDAO = profileDAO;
    }

    public Set<BasicCandidate> populateToFriends(List<Integer> userIds) {

        Set<BasicCandidate> candidates = new HashSet<>();

        for (Integer id : userIds) {
            FriendsProfile friendsProfile = profileDAO.fetchFriendsProfile(id)
                    .orElseThrow(() -> new YouBCException(new YouBCError(HttpStatus.NOT_FOUND, "cannot find user info", "cannot find module profile info")));
            UserProfile userProfile = profileDAO.fetchUserProfile(id)
                    .orElseThrow(() -> new YouBCException(new YouBCError(HttpStatus.NOT_FOUND, "cannot find user info", "cannot find general user profile info")));
            FriendCandidate friendCandidate = new FriendCandidate(
                    userProfile.getUserId(),
                    userProfile.getUsername(),
                    userProfile.getAvatarUrl(),
                    userProfile.getSex(),
                    userProfile.getAge(),
                    userProfile.getHoroscope(),
                    userProfile.getMatchRate(),
                    friendsProfile.getFaculty(),
                    friendsProfile.getRelationship(),
                    friendsProfile.getMotto(),
                    friendsProfile.getTags()
            );
            candidates.add(friendCandidate);
        }
        return candidates;
    }
}
