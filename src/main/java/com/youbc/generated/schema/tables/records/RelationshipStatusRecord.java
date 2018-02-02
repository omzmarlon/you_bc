/*
 * This file is generated by jOOQ.
*/
package com.youbc.generated.schema.tables.records;


import com.youbc.generated.schema.tables.RelationshipStatus;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record2;
import org.jooq.Row2;
import org.jooq.impl.UpdatableRecordImpl;


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
public class RelationshipStatusRecord extends UpdatableRecordImpl<RelationshipStatusRecord> implements Record2<Integer, String> {

    private static final long serialVersionUID = -1357646401;

    /**
     * Setter for <code>poke_you_bc.relationship_status.id</code>.
     */
    public RelationshipStatusRecord setId(Integer value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>poke_you_bc.relationship_status.id</code>.
     */
    public Integer getId() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>poke_you_bc.relationship_status.relationship</code>.
     */
    public RelationshipStatusRecord setRelationship(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>poke_you_bc.relationship_status.relationship</code>.
     */
    public String getRelationship() {
        return (String) get(1);
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
        return RelationshipStatus.RELATIONSHIP_STATUS.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return RelationshipStatus.RELATIONSHIP_STATUS.RELATIONSHIP;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getRelationship();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RelationshipStatusRecord value1(Integer value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RelationshipStatusRecord value2(String value) {
        setRelationship(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RelationshipStatusRecord values(Integer value1, String value2) {
        value1(value1);
        value2(value2);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached RelationshipStatusRecord
     */
    public RelationshipStatusRecord() {
        super(RelationshipStatus.RELATIONSHIP_STATUS);
    }

    /**
     * Create a detached, initialised RelationshipStatusRecord
     */
    public RelationshipStatusRecord(Integer id, String relationship) {
        super(RelationshipStatus.RELATIONSHIP_STATUS);

        set(0, id);
        set(1, relationship);
    }
}
