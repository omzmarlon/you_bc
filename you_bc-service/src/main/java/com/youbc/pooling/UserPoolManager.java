package com.youbc.pooling;

import com.youbc.models.candidate.BasicCandidate;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class UserPoolManager {
    private ArrayList<WeightedStrategy> strategies;

    public UserPoolManager(ArrayList<WeightedStrategy> strategies) {
        this.strategies = strategies;
    }
    
    public Set<BasicCandidate> poolUsers(Integer userId, Integer amount, String gender) {
        Set<BasicCandidate> result = new HashSet<>();
        Set<Integer> except = new HashSet<>();
        Integer leftover = 0;

        for (WeightedStrategy s: strategies) {
            int amt = (int)Math.round(amount * s.getWeight()) + leftover;
            Set<BasicCandidate> newUsers = s.getPoolingStrategy().poolUsers(userId, amt, genderDataTypeConverter(gender), except);
            leftover = (amt - newUsers.size())>0 ? (amt - newUsers.size()) : 0;
            result.addAll(newUsers);
            for (BasicCandidate user : result) {
                except.add(user.getUserId());
            }
        }

        return result;
    }

    private Integer genderDataTypeConverter(String gender) {
        switch (gender) {
            case "male":
                return 1;
            case "female":
                return 2;
            case "mix":
                return 0;
            default:
                return 0;
        }
    }
}
