package com.youbc.database;

import com.youbc.generated.schema.tables.records.UserProfileRecord;
import org.jooq.DSLContext;
import static com.youbc.generated.schema.tables.UserProfile.USER_PROFILE;
import static com.youbc.generated.schema.tables.StudentVerification.STUDENT_VERIFICATION;
import static com.youbc.generated.schema.tables.RoommatesProfile.ROOMMATES_PROFILE;
import static com.youbc.generated.schema.tables.ClassmatesProfile.CLASSMATES_PROFILE;
import static com.youbc.generated.schema.tables.FriendsProfile.FRIENDS_PROFILE;

import org.jooq.Record1;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileDAO {

    private DSLContext dslContext;

    @Autowired
    public UserProfileDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public boolean userExistsById(Integer id) {
        Record1<Integer> result = dslContext
                .select(USER_PROFILE.USER_ID)
                .from(USER_PROFILE)
                .where(USER_PROFILE.USER_ID.eq(id))
                .fetchOne();
        return result != null;
    }

    public Optional<String> getUsernameById(Integer id) {
        Record1<String> result = dslContext
                .select(USER_PROFILE.USERNAME)
                .from(USER_PROFILE)
                .where(USER_PROFILE.USER_ID.eq(id))
                .fetchOne();
        return result != null? Optional.of(result.get(USER_PROFILE.USERNAME)): Optional.empty();
    }

    public boolean userExistsByUsername(String username) {
        Record1<String> result = dslContext
                .select(USER_PROFILE.USERNAME)
                .from(USER_PROFILE)
                .where(USER_PROFILE.USERNAME.eq(username))
                .fetchOne();
        return result != null;
    }

    public Optional<String> getPasswordCredentialByUsername(String username) {
        Record1<String> passwordCredential = dslContext.select(USER_PROFILE.PASSWORD)
                .from(USER_PROFILE)
                .where(USER_PROFILE.USERNAME.eq(username))
                .fetchOne(); // username is unique
        return passwordCredential == null? Optional.empty(): Optional.of(passwordCredential.get(USER_PROFILE.PASSWORD));
    }

    public boolean classmatesProfileExists(Integer userID) {
        Record1<Integer> result = dslContext
                .select(CLASSMATES_PROFILE.USER_ID)
                .from(CLASSMATES_PROFILE)
                .where(CLASSMATES_PROFILE.USER_ID.eq(userID))
                .fetchOne();
        return result != null;
    }

    public boolean friendsProfileExists(Integer userID) {
        Record1<Integer> result = dslContext
                .select(FRIENDS_PROFILE.USER_ID)
                .from(FRIENDS_PROFILE)
                .where(FRIENDS_PROFILE.USER_ID.eq(userID))
                .fetchOne();
        return result != null;
    }


    public boolean roommatesProfileExists(Integer userID) {
        Record1<Integer> result = dslContext
                .select(ROOMMATES_PROFILE.USER_ID)
                .from(ROOMMATES_PROFILE)
                .where(ROOMMATES_PROFILE.USER_ID.eq(userID))
                .fetchOne();
        return result != null;
    }

    public void createNewFormLoginUser(String username, String password, String sex) {
        // TODO request validation for sex
        Integer sexInt = Integer.parseInt(sex);
        UserProfileRecord record1 = dslContext.insertInto(USER_PROFILE)
                .set(USER_PROFILE.USERNAME, username)
                .set(USER_PROFILE.PASSWORD, password)
                .set(USER_PROFILE.SEX, sexInt)
                .set(USER_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .returning(USER_PROFILE.USER_ID)
                .fetchOne();
        initStudentVerification(record1.getUserId());
    }

    // TODO: keep or remove student verification
    private void initStudentVerification(Integer userID) {
        dslContext
                .insertInto(STUDENT_VERIFICATION)
                .set(STUDENT_VERIFICATION.USER_ID, userID)
                .set(STUDENT_VERIFICATION.APPROVED, (byte)0)
                .set(STUDENT_VERIFICATION.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void initRoommateProfile(Integer userID) {
        dslContext
                .insertInto(ROOMMATES_PROFILE)
                .set(ROOMMATES_PROFILE.USER_ID, userID)
                .set(ROOMMATES_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void initClassmatesProfile(Integer userID) {
        dslContext
                .insertInto(CLASSMATES_PROFILE)
                .set(CLASSMATES_PROFILE.USER_ID, userID)
                .set(CLASSMATES_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void initFriendsProfile(Integer userID) {
        dslContext
                .insertInto(FRIENDS_PROFILE)
                .set(FRIENDS_PROFILE.USER_ID, userID)
                .set(FRIENDS_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

}
