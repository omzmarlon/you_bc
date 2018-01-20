package com.youbc.pooling;

import com.youbc.models.candidate.BasicCandidate;

import java.util.Set;

public interface PoolingStrategy {
    /***
     * Pool matching user from
     * @param amount number of users to pool
     * @param except except these users
     * @return Set of USER_IDs
     */
    Set<BasicCandidate> poolUsers(int amount, Set<String> except);
}
