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

    public void approve(String userId) {
        dslContext.update(STUDENT_VERIFICATION)
                .set(STUDENT_VERIFICATION.APPROVED, (byte)1)
                .where(STUDENT_VERIFICATION.USER_ID.eq(userId))
                .execute();
    }

    public void persistEmailVerification(String userId, String email, String emailCode) {
        dslContext.update(STUDENT_VERIFICATION)
                .set(STUDENT_VERIFICATION.EMAIL, email)
                .set(STUDENT_VERIFICATION.EMAILVERIFICATIONCODE, emailCode)
                .where(STUDENT_VERIFICATION.USER_ID.eq(userId))
                .execute();
    }

    public void persistStudentCardVerification(String userId, String studentCardUrl) {
        dslContext.update(STUDENT_VERIFICATION)
                .set(STUDENT_VERIFICATION.STUDENTID_IMAGE_URL, studentCardUrl)
                .where(STUDENT_VERIFICATION.USER_ID.eq(userId))
                .execute();
    }

    public void storeVerificationLocation(String userId, BigDecimal lat, BigDecimal lon) {
        dslContext.update(STUDENT_VERIFICATION)
                .set(STUDENT_VERIFICATION.LOCATION_LAT, lat)
                .set(STUDENT_VERIFICATION.LOCATION_LON, lon)
                .where(STUDENT_VERIFICATION.USER_ID.eq(userId))
                .execute();
    }

    public Optional<String> fetchEmailVerificationCode(String userId) {
        Record1<String> code = dslContext
                .select(STUDENT_VERIFICATION.EMAILVERIFICATIONCODE)
                .from(STUDENT_VERIFICATION)
                .where(STUDENT_VERIFICATION.USER_ID.eq(userId))
                .fetchOne();
        if (code != null) {
            return Optional.of(code.value1());
        } else {
            return Optional.empty();
        }
    }

    public StudentVerification fetchStudentVerification(String userId) {
        Record4<Byte, String, String, String> verification = dslContext
                .select(STUDENT_VERIFICATION.APPROVED,
                        STUDENT_VERIFICATION.EMAIL,
                        STUDENT_VERIFICATION.EMAILVERIFICATIONCODE,
                        STUDENT_VERIFICATION.STUDENTID_IMAGE_URL
                ).from(STUDENT_VERIFICATION)
                .where(STUDENT_VERIFICATION.USER_ID.eq(userId))
                .fetchOne();
        if (verification != null) {
            Boolean isApproved = false;
            Byte b = verification.get(STUDENT_VERIFICATION.APPROVED);
            if (b.equals(new Byte("1"))) {
                isApproved = true;
            }
            return new StudentVerification(
                    isApproved,
                    verification.get(STUDENT_VERIFICATION.EMAIL),
                    verification.get(STUDENT_VERIFICATION.EMAILVERIFICATIONCODE),
                    verification.get(STUDENT_VERIFICATION.STUDENTID_IMAGE_URL) != null
            );
        } else {
            return new StudentVerification(false, null, null, false);
        }
    }

}
