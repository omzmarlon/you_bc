package com.youbc.models.candidate;

import java.util.Set;

public class RoommateCandidate extends BasicCandidate {

    private String location;
    private String hometown;
    private String motto;
    private Set<String> tags;

    public RoommateCandidate() {}

    public RoommateCandidate(
            String id,
            String name,
            String avatarUrl,
            Integer sex,
            Integer age,
            String constellation,
            double matchRate,
            String location,
            String hometown,
            String motto,
            Set<String> tags
    )
    {
        super(id, name, avatarUrl, sex, age, constellation, matchRate);

        this.location = location;
        this.hometown = hometown;
        this.motto = motto;
        this.tags = tags;
    }

    public String getLocation() {
        return location;
    }

    public String getHometown() {
        return hometown;
    }

    public String getMotto() {
        return motto;
    }

    public Set<String> getTags() {
        return tags;
    }
}
