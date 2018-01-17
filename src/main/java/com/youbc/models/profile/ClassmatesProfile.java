package com.youbc.models.profile;

import java.util.Set;

public class ClassmatesProfile {
    private String major;
    private Set<String> courses;
    private String motto;
    private Set<String> tags;

    public ClassmatesProfile() {}

    public ClassmatesProfile(String major, Set<String> courses, String motto, Set<String> tags) {
        this.major = major;
        this.courses = courses;
        this.motto = motto;
        this.tags = tags;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Set<String> getCourses() {
        return courses;
    }

    public void setCourses(Set<String> courses) {
        this.courses = courses;
    }

    public String getMotto() {
        return motto;
    }

    public void setMotto(String motto) {
        this.motto = motto;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }
}
