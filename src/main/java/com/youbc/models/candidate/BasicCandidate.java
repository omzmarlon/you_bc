package com.youbc.models.candidate;

public abstract class BasicCandidate {
    private String userId;
    private String name;
    private String avatarUrl;
    private Integer sex;
    private Integer age;
    private String horoscope;
    private double matchRate;

    public BasicCandidate() {}

    public BasicCandidate(String userId, String name, String avatarUrl, Integer sex, Integer age, String horoscope, double matchRate) {
        this.userId = userId;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.sex = sex;
        this.age = age;
        this.horoscope = horoscope;
        this.matchRate = matchRate;
    }

    public String getUserId() { return userId; }

    public String getName() {
        return name;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public Integer getSex() {
        return sex;
    }

    public Integer getAge() {
        return age;
    }

    public String getConstellation() {
        return horoscope;
    }

    public double getMatchRate() {
        return matchRate;
    }
}
