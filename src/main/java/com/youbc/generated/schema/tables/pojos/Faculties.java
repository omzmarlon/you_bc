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
public class Faculties implements Serializable {

    private static final long serialVersionUID = -692135150;

    private final String faculty;

    public Faculties(Faculties value) {
        this.faculty = value.faculty;
    }

    public Faculties(
        String faculty
    ) {
        this.faculty = faculty;
    }

    public String getFaculty() {
        return this.faculty;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Faculties (");

        sb.append(faculty);

        sb.append(")");
        return sb.toString();
    }
}