package com.youbc.pooling;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class UserPoolManager {
    private ArrayList<StrategyPriority> strategies;

    public UserPoolManager(ArrayList<StrategyPriority> strategies) {
        this.strategies = strategies;
    }
    
    public Set<String> poolUser(Integer amount) {
        Set<String> result = new HashSet<>();
        Integer leftover = 0;

        for (StrategyPriority s: strategies) {
            int amt = (int)Math.round(amount * s.getStrategyPriority()) + leftover;
            Set<String> newUsers = s.getPoolingStrategy().poolUser(amt, result);
            leftover = (amt - newUsers.size())>0 ? (amt - newUsers.size()) : 0;
            result.addAll(newUsers);
        }

        return result;
    }

}
