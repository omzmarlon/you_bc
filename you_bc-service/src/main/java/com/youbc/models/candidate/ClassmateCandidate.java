package com.youbc.models.candidate;

import java.util.Set;

public class ClassmateCandidate extends BasicCandidate {

    private String major;
    private String year;
    private Set<String> courses;
    private String studyAbility;
    private Set<String> tags;

    public ClassmateCandidate() {}

    public ClassmateCandidate(
            Integer id,
            String name,
            String avatarUrl,
            Integer sex,
            Integer age,
            String horoscope,
            double matchRate,
            String major,
            Set<String> courses,
            String studyAbility,
            Set<String> tags
    )
    {
        super(id, name, avatarUrl, sex, age, horoscope, matchRate);

        this.courses = courses;
        this.major = major;
        this.studyAbility = studyAbility;
        this.tags = tags;
    }

    public String getMajor() {
        return major;
    }

    public Set<String> getCourses() {
        return courses;
    }

    public String getStudyAbility() {
        return studyAbility;
    }

    public Set<String> getTags() {
        return tags;
    }
}
