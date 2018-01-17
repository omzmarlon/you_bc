package com.youbc.pooling;

import java.util.Set;

public abstract class PoolingStrategy {
    /***
     * Pool matching user from
     * @param amount number of users to pool
     * @param except except these users
     * @return Set of USER_IDs
     */
    public abstract Set<String> poolUser(int amount, Set<String> except);
}
