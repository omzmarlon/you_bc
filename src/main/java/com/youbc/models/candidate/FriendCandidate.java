package com.youbc.models.candidate;

import java.util.Set;

public class FriendCandidate extends BasicCandidate {

    private String faculty;
    private String relationship;
    private String motto;
    private Set<String> tags;

    public FriendCandidate() {}

    public FriendCandidate(
            String id,
            String name,
            String avatarUrl,
            int sex,
            int age,
            String constellation,
            double matchRate,
            String faculty,
            String relationship,
            String motto,
            Set<String> tags
    )
    {
        super(id, name, avatarUrl, sex, age, constellation, matchRate);

        this.faculty = faculty;
        this.relationship = relationship;
        this.motto = motto;
        this.tags = tags;
    }

    public String getFaculty() {
        return faculty;
    }

    public String getRelationship() {
        return relationship;
    }

    public String getMotto() {
        return motto;
    }

    public Set<String> getTags() {
        return tags;
    }
}
