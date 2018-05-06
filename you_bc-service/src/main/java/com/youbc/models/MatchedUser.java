package com.youbc.models;

public class MatchedUser implements Comparable<MatchedUser>{

    private String avatarURL;
    private String name;
    private String weChatId;
    private long matchedTime;
    private boolean matchedAtClassmates;
    private boolean matchedAtFriends;
    private boolean matchedAtRoommates;

    public MatchedUser() {}

    public MatchedUser(
            String avatarURL,
            String name,
            String weChatId,
            long matchedTime,
            boolean matchedAtClassmates,
            boolean matchedAtFriends,
            boolean matchedAtRoommates
    ) {
        this.avatarURL = avatarURL;
        this.name = name;
        this.weChatId = weChatId;
        this.matchedTime = matchedTime;
        this.matchedAtClassmates = matchedAtClassmates;
        this.matchedAtFriends = matchedAtFriends;
        this.matchedAtRoommates = matchedAtRoommates;
    }

    public String getAvatarURL() {
        return avatarURL;
    }

    public void setAvatarURL(String avatarURL) {
        this.avatarURL = avatarURL;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWeChatId() {
        return weChatId;
    }

    public void setWeChatId(String weChatId) {
        this.weChatId = weChatId;
    }

    public long getMatchedTime() { return matchedTime; }

    public void setMatchedTime(long matchedTime) { this.matchedTime = matchedTime; }

    public boolean isMatchedAtClassmates() {
        return matchedAtClassmates;
    }

    public void setMatchedAtClassmates(boolean matchedAtClassmates) {
        this.matchedAtClassmates = matchedAtClassmates;
    }

    public boolean isMatchedAtFriends() {
        return matchedAtFriends;
    }

    public void setMatchedAtFriends(boolean matchedAtFriends) {
        this.matchedAtFriends = matchedAtFriends;
    }

    public boolean isMatchedAtRoommates() {
        return matchedAtRoommates;
    }

    public void setMatchedAtRoommates(boolean matchedAtRoommates) {
        this.matchedAtRoommates = matchedAtRoommates;
    }

    public int compareTo(MatchedUser user) {
        return Math.toIntExact(user.getMatchedTime() - this.matchedTime);
    }
}
