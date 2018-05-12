package com.youbc.pooling.roommates;

import com.youbc.database.ProfileDAO;
import com.youbc.database.UserPoolStrategyDAO;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.pooling.PoolingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class PoolingByLikesRoommates extends PoolingRoommates implements PoolingStrategy{

    private ProfileDAO profileDAO;
    private UserPoolStrategyDAO userPoolStrategyDAO;

    @Autowired
    public PoolingByLikesRoommates(ProfileDAO profileDAO, UserPoolStrategyDAO userPoolStrategyDAO) {
        super(profileDAO);
        this.userPoolStrategyDAO = userPoolStrategyDAO;
    }

    public Set<BasicCandidate> poolUsers(Integer userId, Integer amount, Integer gender, Set<Integer> except) {
        List<Integer> candidateIDs = userPoolStrategyDAO.fetchRoommatesByLikes(userId, amount, gender, except);
        return populateToRoommates(candidateIDs);
    }
}
