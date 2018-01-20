package com.youbc.pooling.classmates;

import com.youbc.database.ProfileDAO;
import com.youbc.database.UserPoolStrategyDAO;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.pooling.PoolingStrategy;

import java.util.List;
import java.util.Set;

public class PoolingByLikesClassmates extends PoolingClassmates implements PoolingStrategy {
    // todo: Big Issue: how do I get userId??? cookieService doesn't work since it needs request
    private ProfileDAO profileDAO;
    private UserPoolStrategyDAO userPoolStrategyDAO;
    private String userId;

    public PoolingByLikesClassmates(ProfileDAO profileDAO, UserPoolStrategyDAO userPoolStrategyDAO, String userId) {
        super(profileDAO);
        this.userPoolStrategyDAO = userPoolStrategyDAO;
        this.userId = userId;
    }

    public Set<BasicCandidate> poolUsers(int amount, Set<String> except) {
        List<String> candidateIDs = userPoolStrategyDAO.fetchClassmatesByLikes(amount, userId, except);
        return populateToClassmates(candidateIDs);
    }
}
