package com.youbc.models.profile;

import java.util.Set;

public class FriendsProfile {
    private String faculty;
    private String relationship;
    private String motto;
    private Set<String> tags;

    public FriendsProfile() {}

    public FriendsProfile(String faculty, String relationship, String motto, Set<String> tags) {
        this.faculty = faculty;
        this.relationship = relationship;
        this.motto = motto;
        this.tags = tags;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
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
