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

    private static final long serialVersionUID = -1134450255;

    private final Integer id;
    private final String  faculty;

    public Faculties(Faculties value) {
        this.id = value.id;
        this.faculty = value.faculty;
    }

    public Faculties(
        Integer id,
        String  faculty
    ) {
        this.id = id;
        this.faculty = faculty;
    }

    public Integer getId() {
        return this.id;
    }

    public String getFaculty() {
        return this.faculty;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Faculties (");

        sb.append(id);
        sb.append(", ").append(faculty);

        sb.append(")");
        return sb.toString();
    }
}
