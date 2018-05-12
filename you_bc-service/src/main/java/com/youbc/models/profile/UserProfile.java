package com.youbc.models.profile;

public class UserProfile {

    private Integer userId;
    private String username;
    private Integer age;
    private Integer sex;
    private String avatarUrl;
    private String horoscope;
    private double matchRate;
    private String weChatId;

    public UserProfile () {}

    public UserProfile (Integer userId, String weChatId, String username, Integer age, Integer sex, String avatarUrl, String horoscope, double matchRate) {
        this.userId = userId;
        this.username = username;
        this.age = age;
        this.sex = sex;
        this.avatarUrl = avatarUrl;
        this.horoscope = horoscope;
        this.matchRate = matchRate;
        this.weChatId = weChatId;
    }

    public String getWeChatId() {
        return weChatId;
    }

    public void setWeChatId(String weChatId) {
        this.weChatId = weChatId;
    }

    public Integer getUserId() { return userId; }

    public void setUserId(Integer userId) { this.userId = userId; }


    public String getUsername() { return username; }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
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
