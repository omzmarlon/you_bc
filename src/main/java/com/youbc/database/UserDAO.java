package com.youbc.database;

import org.jooq.DSLContext;
import static com.youbc.generated.schema.tables.User.USER;
import static com.youbc.generated.schema.tables.UserProfile.USER_PROFILE;
import static com.youbc.generated.schema.tables.UbcStudentVerification.UBC_STUDENT_VERIFICATION;
import static com.youbc.generated.schema.tables.RoommatesProfile.ROOMMATES_PROFILE;
import static com.youbc.generated.schema.tables.ClassmatesProfile.CLASSMATES_PROFILE;
import static com.youbc.generated.schema.tables.FriendsProfile.FRIENDS_PROFILE;

import org.jooq.Record1;
import org.jooq.Result;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDAO {

    private DSLContext dslContext;

    @Autowired
    public UserDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public boolean userExists(String userID) {
        Result<Record1<String>> result = dslContext
                .select(USER.USER_ID)
                .from(USER)
                .where(USER.USER_ID.eq(userID))
                .fetch();
        return result.isEmpty();
    }

    public void buildNewUser(String userID) {
        initUser(userID);
        initUserProfile(userID);
        initStudentVerification(userID);
        initClassmatesProfile(userID);
        initRoommateProfile(userID);
        initFriendsProfile(userID);
    }

    private void initUser(String userID) {
        dslContext
                .insertInto(USER)
                .set(USER.USER_ID, userID)
                .set(USER.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    private void initUserProfile(String userID) {
        dslContext.insertInto(USER_PROFILE)
                .set(USER_PROFILE.USER_ID, userID)
                .set(USER_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    private void initStudentVerification(String userID) {
        dslContext
                .insertInto(UBC_STUDENT_VERIFICATION)
                .set(UBC_STUDENT_VERIFICATION.USER_ID, userID)
                .set(UBC_STUDENT_VERIFICATION.APPROVED, (byte)0)
                .set(UBC_STUDENT_VERIFICATION.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    private void initRoommateProfile(String userID) {
        dslContext
                .insertInto(ROOMMATES_PROFILE)
                .set(ROOMMATES_PROFILE.USER_ID, userID)
                .set(ROOMMATES_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    private void initClassmatesProfile(String userID) {
        dslContext
                .insertInto(CLASSMATES_PROFILE)
                .set(CLASSMATES_PROFILE.USER_ID, userID)
                .set(CLASSMATES_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    private void initFriendsProfile(String userID) {
        dslContext
                .insertInto(FRIENDS_PROFILE)
                .set(FRIENDS_PROFILE.USER_ID, userID)
                .set(FRIENDS_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

}
