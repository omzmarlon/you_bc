/*
 * This file is generated by jOOQ.
*/
package com.youbc.generated.schema.tables.records;


import com.youbc.generated.schema.tables.RoommatesProfileTags;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record2;
import org.jooq.Row2;
import org.jooq.impl.UpdatableRecordImpl;


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
public class RoommatesProfileTagsRecord extends UpdatableRecordImpl<RoommatesProfileTagsRecord> implements Record2<Integer, String> {

    private static final long serialVersionUID = -947996350;

    /**
     * Setter for <code>you_bc.roommates_profile_tags.user_id</code>.
     */
    public RoommatesProfileTagsRecord setUserId(Integer value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>you_bc.roommates_profile_tags.user_id</code>.
     */
    public Integer getUserId() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>you_bc.roommates_profile_tags.tag</code>.
     */
    public RoommatesProfileTagsRecord setTag(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>you_bc.roommates_profile_tags.tag</code>.
     */
    public String getTag() {
        return (String) get(1);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record2<Integer, String> key() {
        return (Record2) super.key();
    }

    // -------------------------------------------------------------------------
    // Record2 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row2<Integer, String> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row2<Integer, String> valuesRow() {
        return (Row2) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field1() {
        return RoommatesProfileTags.ROOMMATES_PROFILE_TAGS.USER_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return RoommatesProfileTags.ROOMMATES_PROFILE_TAGS.TAG;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value1() {
        return getUserId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getTag();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RoommatesProfileTagsRecord value1(Integer value) {
        setUserId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RoommatesProfileTagsRecord value2(String value) {
        setTag(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RoommatesProfileTagsRecord values(Integer value1, String value2) {
        value1(value1);
        value2(value2);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached RoommatesProfileTagsRecord
     */
    public RoommatesProfileTagsRecord() {
        super(RoommatesProfileTags.ROOMMATES_PROFILE_TAGS);
    }

    /**
     * Create a detached, initialised RoommatesProfileTagsRecord
     */
    public RoommatesProfileTagsRecord(Integer userId, String tag) {
        super(RoommatesProfileTags.ROOMMATES_PROFILE_TAGS);

        set(0, userId);
        set(1, tag);
    }
}