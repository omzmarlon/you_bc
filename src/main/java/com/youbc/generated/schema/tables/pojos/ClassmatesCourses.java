/*
 * This file is generated by jOOQ.
*/
package com.youbc.generated.schema.tables.pojos;


import java.io.Serializable;

import javax.annotation.Generated;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.9.1"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class ClassmatesCourses implements Serializable {

    private static final long serialVersionUID = 325570540;

    private final Integer courseId;
    private final String  courseName;

    public ClassmatesCourses(ClassmatesCourses value) {
        this.courseId = value.courseId;
        this.courseName = value.courseName;
    }

    public ClassmatesCourses(
        Integer courseId,
        String  courseName
    ) {
        this.courseId = courseId;
        this.courseName = courseName;
    }

    public Integer getCourseId() {
        return this.courseId;
    }

    public String getCourseName() {
        return this.courseName;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("ClassmatesCourses (");

        sb.append(courseId);
        sb.append(", ").append(courseName);

        sb.append(")");
        return sb.toString();
    }
}