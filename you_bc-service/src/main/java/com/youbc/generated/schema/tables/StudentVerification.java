/*
 * This file is generated by jOOQ.
*/
package com.youbc.generated.schema.tables;


import com.youbc.generated.schema.Keys;
import com.youbc.generated.schema.YouBc;
import com.youbc.generated.schema.tables.records.StudentVerificationRecord;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.TableImpl;


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
public class StudentVerification extends TableImpl<StudentVerificationRecord> {

    private static final long serialVersionUID = -1272581842;

    /**
     * The reference instance of <code>you_bc.student_verification</code>
     */
    public static final StudentVerification STUDENT_VERIFICATION = new StudentVerification();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<StudentVerificationRecord> getRecordType() {
        return StudentVerificationRecord.class;
    }

    /**
     * The column <code>you_bc.student_verification.user_id</code>.
     */
    public final TableField<StudentVerificationRecord, Integer> USER_ID = createField("user_id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>you_bc.student_verification.approved</code>.
     */
    public final TableField<StudentVerificationRecord, Byte> APPROVED = createField("approved", org.jooq.impl.SQLDataType.TINYINT.nullable(false), this, "");

    /**
     * The column <code>you_bc.student_verification.email</code>.
     */
    public final TableField<StudentVerificationRecord, String> EMAIL = createField("email", org.jooq.impl.SQLDataType.VARCHAR.length(50), this, "");

    /**
     * The column <code>you_bc.student_verification.emailVerificationCode</code>.
     */
    public final TableField<StudentVerificationRecord, String> EMAILVERIFICATIONCODE = createField("emailVerificationCode", org.jooq.impl.SQLDataType.VARCHAR.length(100), this, "");

    /**
     * The column <code>you_bc.student_verification.studentID_image_url</code>.
     */
    public final TableField<StudentVerificationRecord, String> STUDENTID_IMAGE_URL = createField("studentID_image_url", org.jooq.impl.SQLDataType.CLOB, this, "");

    /**
     * The column <code>you_bc.student_verification.location_lat</code>.
     */
    public final TableField<StudentVerificationRecord, BigDecimal> LOCATION_LAT = createField("location_lat", org.jooq.impl.SQLDataType.DECIMAL.precision(11, 8), this, "");

    /**
     * The column <code>you_bc.student_verification.location_lon</code>.
     */
    public final TableField<StudentVerificationRecord, BigDecimal> LOCATION_LON = createField("location_lon", org.jooq.impl.SQLDataType.DECIMAL.precision(11, 8), this, "");

    /**
     * The column <code>you_bc.student_verification.time_created</code>.
     */
    public final TableField<StudentVerificationRecord, Timestamp> TIME_CREATED = createField("time_created", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false), this, "");

    /**
     * Create a <code>you_bc.student_verification</code> table reference
     */
    public StudentVerification() {
        this("student_verification", null);
    }

    /**
     * Create an aliased <code>you_bc.student_verification</code> table reference
     */
    public StudentVerification(String alias) {
        this(alias, STUDENT_VERIFICATION);
    }

    private StudentVerification(String alias, Table<StudentVerificationRecord> aliased) {
        this(alias, aliased, null);
    }

    private StudentVerification(String alias, Table<StudentVerificationRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, "");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Schema getSchema() {
        return YouBc.YOU_BC;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<StudentVerificationRecord> getPrimaryKey() {
        return Keys.KEY_STUDENT_VERIFICATION_PRIMARY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<StudentVerificationRecord>> getKeys() {
        return Arrays.<UniqueKey<StudentVerificationRecord>>asList(Keys.KEY_STUDENT_VERIFICATION_PRIMARY, Keys.KEY_STUDENT_VERIFICATION_EMAIL);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<ForeignKey<StudentVerificationRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<StudentVerificationRecord, ?>>asList(Keys.STUDENT_VERIFICATION_IBFK_1);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public StudentVerification as(String alias) {
        return new StudentVerification(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public StudentVerification rename(String name) {
        return new StudentVerification(name, null);
    }
}