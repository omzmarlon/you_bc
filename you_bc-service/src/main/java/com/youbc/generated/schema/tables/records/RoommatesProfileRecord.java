/*
 * This file is generated by jOOQ.
*/
package com.youbc.generated.schema.tables.records;


import com.youbc.generated.schema.tables.RoommatesProfile;

import java.sql.Timestamp;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record5;
import org.jooq.Row5;
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
public class RoommatesProfileRecord extends UpdatableRecordImpl<RoommatesProfileRecord> implements Record5<Integer, String, String, String, Timestamp> {

    private static final long serialVersionUID = 1056736779;

    /**
     * Setter for <code>you_bc.roommates_profile.user_id</code>.
     */
    public RoommatesProfileRecord setUserId(Integer value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>you_bc.roommates_profile.user_id</code>.
     */
    public Integer getUserId() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>you_bc.roommates_profile.location</code>.
     */
    public RoommatesProfileRecord setLocation(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>you_bc.roommates_profile.location</code>.
     */
    public String getLocation() {
        return (String) get(1);
    }

    /**
     * Setter for <code>you_bc.roommates_profile.hometown</code>.
     */
    public RoommatesProfileRecord setHometown(String value) {
        set(2, value);
        return this;
    }

    /**
     * Getter for <code>you_bc.roommates_profile.hometown</code>.
     */
    public String getHometown() {
        return (String) get(2);
    }

    /**
     * Setter for <code>you_bc.roommates_profile.motto</code>.
     */
    public RoommatesProfileRecord setMotto(String value) {
        set(3, value);
        return this;
    }

    /**
     * Getter for <code>you_bc.roommates_profile.motto</code>.
     */
    public String getMotto() {
        return (String) get(3);
    }

    /**
     * Setter for <code>you_bc.roommates_profile.time_created</code>.
     */
    public RoommatesProfileRecord setTimeCreated(Timestamp value) {
        set(4, value);
        return this;
    }

    /**
     * Getter for <code>you_bc.roommates_profile.time_created</code>.
     */
    public Timestamp getTimeCreated() {
        return (Timestamp) get(4);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<Integer> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record5 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row5<Integer, String, String, String, Timestamp> fieldsRow() {
        return (Row5) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row5<Integer, String, String, String, Timestamp> valuesRow() {
        return (Row5) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field1() {
        return RoommatesProfile.ROOMMATES_PROFILE.USER_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return RoommatesProfile.ROOMMATES_PROFILE.LOCATION;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return RoommatesProfile.ROOMMATES_PROFILE.HOMETOWN;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return RoommatesProfile.ROOMMATES_PROFILE.MOTTO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Timestamp> field5() {
        return RoommatesProfile.ROOMMATES_PROFILE.TIME_CREATED;
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
        return getLocation();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getHometown();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getMotto();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp value5() {
        return getTimeCreated();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RoommatesProfileRecord value1(Integer value) {
        setUserId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RoommatesProfileRecord value2(String value) {
        setLocation(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RoommatesProfileRecord value3(String value) {
        setHometown(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RoommatesProfileRecord value4(String value) {
        setMotto(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RoommatesProfileRecord value5(Timestamp value) {
        setTimeCreated(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RoommatesProfileRecord values(Integer value1, String value2, String value3, String value4, Timestamp value5) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached RoommatesProfileRecord
     */
    public RoommatesProfileRecord() {
        super(RoommatesProfile.ROOMMATES_PROFILE);
    }

    /**
     * Create a detached, initialised RoommatesProfileRecord
     */
    public RoommatesProfileRecord(Integer userId, String location, String hometown, String motto, Timestamp timeCreated) {
        super(RoommatesProfile.ROOMMATES_PROFILE);

        set(0, userId);
        set(1, location);
        set(2, hometown);
        set(3, motto);
        set(4, timeCreated);
    }
}