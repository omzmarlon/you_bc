package com.youbc.models.profile;

public class UserProfile {

    private String userId;
    private String username;
    private int age;
    private int sex;
    private String avatarUrl;
    private String horoscope;
    private double matchRate;

    public UserProfile () {}

    public UserProfile (String userId, String username, int age, int sex, String avatarUrl, String horoscope, double matchRate) {
        this.userId = userId;
        this.username = username;
        this.age = age;
        this.sex = sex;
        this.avatarUrl = avatarUrl;
        this.horoscope = horoscope;
        this.matchRate = matchRate;
    }

    public String getUserId() { return userId; }

    public void setUserId(String userId) { this.userId = userId; }


    public String getUsername() { return username; }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getHoroscope() {
        return horoscope;
    }

    public void setHoroscope(String horoscope) {
        this.horoscope = horoscope;
    }

    public double getMatchRate() {
        return matchRate;
    }

    public void setMatchRate(double matchRate) {
        this.matchRate = matchRate;
    }
}
