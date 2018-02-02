/*
 * This file is generated by jOOQ.
*/
package com.youbc.generated.schema.tables.records;


import com.youbc.generated.schema.tables.Faculties;

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
public class FacultiesRecord extends UpdatableRecordImpl<FacultiesRecord> implements Record2<Integer, String> {

    private static final long serialVersionUID = 1358612415;

    /**
     * Setter for <code>poke_you_bc.faculties.id</code>.
     */
    public FacultiesRecord setId(Integer value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>poke_you_bc.faculties.id</code>.
     */
    public Integer getId() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>poke_you_bc.faculties.faculty</code>.
     */
    public FacultiesRecord setFaculty(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>poke_you_bc.faculties.faculty</code>.
     */
    public String getFaculty() {
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
        return Faculties.FACULTIES.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return Faculties.FACULTIES.FACULTY;
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
        return getFaculty();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public FacultiesRecord value1(Integer value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public FacultiesRecord value2(String value) {
        setFaculty(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public FacultiesRecord values(Integer value1, String value2) {
        value1(value1);
        value2(value2);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached FacultiesRecord
     */
    public FacultiesRecord() {
        super(Faculties.FACULTIES);
    }

    /**
     * Create a detached, initialised FacultiesRecord
     */
    public FacultiesRecord(Integer id, String faculty) {
        super(Faculties.FACULTIES);

        set(0, id);
        set(1, faculty);
    }
}
