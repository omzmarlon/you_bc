package com.youbc.database;

import java.util.Optional;

import com.youbc.models.verification.StudentVerification;
import org.jooq.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

import static com.youbc.generated.schema.tables.StudentVerification.STUDENT_VERIFICATION;

@Component
public class VerificationDAO {

    private DSLContext dslContext;

    public VerificationDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public void persistVerificationStatus(Integer userId) {
        dslContext.update(STUDENT_VERIFICATION)
                .set(STUDENT_VERIFICATION.APPROVED, (byte)1)
                .where(STUDENT_VERIFICATION.USER_ID.eq(userId))
                .execute();
    }

    public boolean fetchVerificationStatus(Integer userId) {
        Record1<Byte> approved = dslContext
                .select(STUDENT_VERIFICATION.APPROVED)
                .from(STUDENT_VERIFICATION)
                .where(STUDENT_VERIFICATION.USER_ID.eq(userId))
                .fetchOne();
        return approved != null && approved.value1().equals(new Byte("1"));
    }
}
