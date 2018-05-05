package com.youbc.pooling.friends;

import com.youbc.database.ProfileDAO;
import com.youbc.database.UserPoolStrategyDAO;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.pooling.PoolingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class PoolingRandomFriends extends PoolingFriends implements PoolingStrategy{

    private ProfileDAO profileDAO;
    private UserPoolStrategyDAO userPoolStrategyDAO;

    @Autowired
    public PoolingRandomFriends(ProfileDAO profileDAO, UserPoolStrategyDAO userPoolStrategyDAO) {
        super(profileDAO);
        this.userPoolStrategyDAO = userPoolStrategyDAO;
    }

    public Set<BasicCandidate> poolUsers(String userId, Integer amount, Integer gender, Set<String> except) {
        List<String> candidateIDs = userPoolStrategyDAO.fetchRandomfriends(userId, amount, gender, except);
        return populateToFriends(candidateIDs);
    }
}
