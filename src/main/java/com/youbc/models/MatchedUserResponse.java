package com.youbc.models;

import java.util.Set;

public class MatchedUserResponse {

    private Integer newMatch;
    private Set<MatchedUser> matchedUsers;

    public MatchedUserResponse() {}

    public MatchedUserResponse(Integer newMatch, Set<MatchedUser> matchedUsers) {
        this.newMatch = newMatch;
        this.matchedUsers = matchedUsers;
    }

    public Integer getNewMatch() {
        return newMatch;
    }

    public void setNewMatch(Integer newMatch) {
        this.newMatch = newMatch;
    }

    public Set<MatchedUser> getMatchedUsers() {
        return matchedUsers;
    }

    public void setMatchedUsers(Set<MatchedUser> matchedUsers) {
        this.matchedUsers = matchedUsers;
    }
}
