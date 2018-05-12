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
public class FriendsProfileTags implements Serializable {

    private static final long serialVersionUID = -1667639282;

    private final Integer userId;
    private final String  tag;

    public FriendsProfileTags(FriendsProfileTags value) {
        this.userId = value.userId;
        this.tag = value.tag;
    }

    public FriendsProfileTags(
        Integer userId,
        String  tag
    ) {
        this.userId = userId;
        this.tag = tag;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public String getTag() {
        return this.tag;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("FriendsProfileTags (");

        sb.append(userId);
        sb.append(", ").append(tag);

        sb.append(")");
        return sb.toString();
    }
}