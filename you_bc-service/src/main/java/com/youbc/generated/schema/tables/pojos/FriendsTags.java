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
public class FriendsTags implements Serializable {

    private static final long serialVersionUID = 269619722;

    private final Integer id;
    private final String  tag;

    public FriendsTags(FriendsTags value) {
        this.id = value.id;
        this.tag = value.tag;
    }

    public FriendsTags(
        Integer id,
        String  tag
    ) {
        this.id = id;
        this.tag = tag;
    }

    public Integer getId() {
        return this.id;
    }

    public String getTag() {
        return this.tag;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("FriendsTags (");

        sb.append(id);
        sb.append(", ").append(tag);

        sb.append(")");
        return sb.toString();
    }
}
