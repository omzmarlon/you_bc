package com.youbc.models.profile;

import java.util.Set;

public class RoommatesProfile {

    private String location;
    private String hometown;
    private String motto;
    private Set<String> tags;

    public RoommatesProfile() {}

    public RoommatesProfile(String location, String hometown, String motto, Set<String> tags) {
        this.location = location;
        this.hometown = hometown;
        this.motto = motto;
        this.tags = tags;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
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
