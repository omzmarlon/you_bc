package com.youbc.database;

import org.jooq.DSLContext;
import static com.youbc.generated.schema.tables.User.USER;
import static com.youbc.generated.schema.tables.UserProfile.USER_PROFILE;
import static com.youbc.generated.schema.tables.ProfileImage.PROFILE_IMAGE;
import static com.youbc.generated.schema.tables.StudentVerification.STUDENT_VERIFICATION;
import static com.youbc.generated.schema.tables.RoommatesProfile.ROOMMATES_PROFILE;
import static com.youbc.generated.schema.tables.ClassmatesProfile.CLASSMATES_PROFILE;
import static com.youbc.generated.schema.tables.FriendsProfile.FRIENDS_PROFILE;
import static com.youbc.generated.schema.tables.UserProfile.USER_PROFILE;

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
        Record1<String> result = dslContext
                .select(USER.USER_ID)
                .from(USER)
                .where(USER.USER_ID.eq(userID))
                .fetchOne();
        return result != null;
    }

    public boolean classmatesProfileExists(String userID) {
        Record1<String> result = dslContext
                .select(CLASSMATES_PROFILE.USER_ID)
                .from(CLASSMATES_PROFILE)
                .where(CLASSMATES_PROFILE.USER_ID.eq(userID))
                .fetchOne();
        return result != null;
    }

    public boolean userProfileExists(String userID) {
        Record1<String> result = dslContext
                .select(USER_PROFILE.USER_ID)
                .from(USER_PROFILE)
                .where(USER_PROFILE.USER_ID.eq(userID))
                .fetchOne();
        return result != null;
    }

    public boolean friendsProfileExists(String userID) {
        Record1<String> result = dslContext
                .select(FRIENDS_PROFILE.USER_ID)
                .from(FRIENDS_PROFILE)
                .where(FRIENDS_PROFILE.USER_ID.eq(userID))
                .fetchOne();
        return result != null;
    }


    public boolean roommatesProfileExists(String userID) {
        Record1<String> result = dslContext
                .select(ROOMMATES_PROFILE.USER_ID)
                .from(ROOMMATES_PROFILE)
                .where(ROOMMATES_PROFILE.USER_ID.eq(userID))
                .fetchOne();
        return result != null;
    }

    public void buildNewUser(String userID, String imageUrl, String username, String sex) {
        initUser(userID);
        initUserProfile(userID, username, sex);
        initUserProfileImage(userID, imageUrl);
        initStudentVerification(userID);
    }

    public void initUser(String userID) {
        dslContext
                .insertInto(USER)
                .set(USER.USER_ID, userID)
                .set(USER.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void initUserProfile(String userID, String username, String sex) {
        Integer sexInt = null;
        if (sex.equals("1")) {
            sexInt = 1;
        } else if (sex.equals("2")) {
            sexInt = 2;
        }
        dslContext.insertInto(USER_PROFILE)
                .set(USER_PROFILE.USER_ID, userID)
                .set(USER_PROFILE.USERNAME, username)
                .set(USER_PROFILE.SEX, sexInt)
                .set(USER_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void initUserProfileImage(String userID, String imageUrl) {
        dslContext.insertInto(PROFILE_IMAGE)
                .set(PROFILE_IMAGE.USER_ID, userID)
                .set(PROFILE_IMAGE.THUMBNAIL_IMAGE_URL, imageUrl)
                .set(PROFILE_IMAGE.ORIGINAL_IMAGE_URL, imageUrl)
                .execute();
    }

    public void initStudentVerification(String userID) {
        dslContext
                .insertInto(STUDENT_VERIFICATION)
                .set(STUDENT_VERIFICATION.USER_ID, userID)
                .set(STUDENT_VERIFICATION.APPROVED, (byte)0)
                .set(STUDENT_VERIFICATION.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void initRoommateProfile(String userID) {
        dslContext
                .insertInto(ROOMMATES_PROFILE)
                .set(ROOMMATES_PROFILE.USER_ID, userID)
                .set(ROOMMATES_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void initClassmatesProfile(String userID) {
        dslContext
                .insertInto(CLASSMATES_PROFILE)
                .set(CLASSMATES_PROFILE.USER_ID, userID)
                .set(CLASSMATES_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void initFriendsProfile(String userID) {
        dslContext
                .insertInto(FRIENDS_PROFILE)
                .set(FRIENDS_PROFILE.USER_ID, userID)
                .set(FRIENDS_PROFILE.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

}
