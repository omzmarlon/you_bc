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
        "jOOQ version:3.9.6"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class ClassmatesProfileCourses implements Serializable {

    private static final long serialVersionUID = -1268281027;

    private final Integer userId;
    private final String  course;

    public ClassmatesProfileCourses(ClassmatesProfileCourses value) {
        this.userId = value.userId;
        this.course = value.course;
    }

    public ClassmatesProfileCourses(
        Integer userId,
        String  course
    ) {
        this.userId = userId;
        this.course = course;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public String getCourse() {
        return this.course;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("ClassmatesProfileCourses (");

        sb.append(userId);
        sb.append(", ").append(course);

        sb.append(")");
        return sb.toString();
    }
}