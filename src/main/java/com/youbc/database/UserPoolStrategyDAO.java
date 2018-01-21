package com.youbc.database;

import org.jooq.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

import static com.youbc.generated.schema.tables.ClassmatesLikes.CLASSMATES_LIKES;
import static com.youbc.generated.schema.tables.ClassmatesProfile.CLASSMATES_PROFILE;
import static com.youbc.generated.schema.tables.FriendsLikes.FRIENDS_LIKES;
import static com.youbc.generated.schema.tables.FriendsProfile.FRIENDS_PROFILE;
import static com.youbc.generated.schema.tables.RoommatesLikes.ROOMMATES_LIKES;
import static com.youbc.generated.schema.tables.RoommatesProfile.ROOMMATES_PROFILE;
import static com.youbc.generated.schema.tables.UserProfile.USER_PROFILE;

@Component
public class UserPoolStrategyDAO {

    private DSLContext dslContext;

    @Autowired
    public UserPoolStrategyDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public List<String> fetchRandomClassmates(String userId, Integer amount, Integer gender, Set<String> except) {
        return dslContext
                .select()
                .from(CLASSMATES_PROFILE.leftOuterJoin(USER_PROFILE).on(CLASSMATES_PROFILE.USER_ID.eq(USER_PROFILE.USER_ID)))
                .where(USER_PROFILE.SEX.eq(gender))
                .and(CLASSMATES_PROFILE.USER_ID.notEqual(userId))
                .and(CLASSMATES_PROFILE.USER_ID.notIn(except))
                .limit(amount)
                .fetch(CLASSMATES_PROFILE.USER_ID);
    }

    public List<String> fetchRandomfriends(String userId, Integer amount, Integer gender, Set<String> except) {
        return dslContext
                .select()
                .from(FRIENDS_PROFILE.leftOuterJoin(USER_PROFILE).on(FRIENDS_PROFILE.USER_ID.eq(USER_PROFILE.USER_ID)))
                .where(USER_PROFILE.SEX.eq(gender))
                .and(FRIENDS_PROFILE.USER_ID.notEqual(userId))
                .and(FRIENDS_PROFILE.USER_ID.notIn(except))
                .limit(amount)
                .fetch(FRIENDS_PROFILE.USER_ID);
    }

    public List<String> fetchRandomRoommates(String userId, Integer amount, Integer gender, Set<String> except) {
        return dslContext
                .select()
                .from(ROOMMATES_PROFILE.leftOuterJoin(USER_PROFILE).on(ROOMMATES_PROFILE.USER_ID.eq(USER_PROFILE.USER_ID)))
                .where(USER_PROFILE.SEX.eq(gender))
                .and(ROOMMATES_PROFILE.USER_ID.notEqual(userId))
                .and(ROOMMATES_PROFILE.USER_ID.notIn(except))
                .limit(amount)
                .fetch(ROOMMATES_PROFILE.USER_ID);
    }

    public List<String> fetchClassmatesByLikes(String userId, Integer amount, Integer gender, Set<String> except) {
        return dslContext
                .select()
                .from(CLASSMATES_LIKES.leftOuterJoin(USER_PROFILE).on(CLASSMATES_LIKES.LIKER.eq(USER_PROFILE.USER_ID)))
                .where(USER_PROFILE.SEX.eq(gender))
                .and(CLASSMATES_LIKES.LIKEE.eq(userId))
                .and(CLASSMATES_LIKES.LIKER.notIn(except))
                .limit(amount)
                .fetch(CLASSMATES_LIKES.LIKER);
    }

    public List<String> fetchFriendsByLikes(String userId, Integer amount, Integer gender, Set<String> except) {
        return dslContext
                .select()
                .from(FRIENDS_LIKES.leftOuterJoin(USER_PROFILE).on(FRIENDS_LIKES.LIKER.eq(USER_PROFILE.USER_ID)))
                .where(USER_PROFILE.SEX.eq(gender))
                .and(FRIENDS_LIKES.LIKEE.eq(userId))
                .and(FRIENDS_LIKES.LIKER.notIn(except))
                .limit(amount)
                .fetch(FRIENDS_LIKES.LIKER);
    }

    public List<String> fetchRoommatesByLikes(String userId, Integer amount, Integer gender, Set<String> except) {
        return dslContext
                .select()
                .from(ROOMMATES_LIKES.leftOuterJoin(USER_PROFILE).on(ROOMMATES_LIKES.LIKER.eq(USER_PROFILE.USER_ID)))
                .where(USER_PROFILE.SEX.eq(gender))
                .and(ROOMMATES_LIKES.LIKEE.eq(userId))
                .and(ROOMMATES_LIKES.LIKER.notIn(except))
                .limit(amount)
                .fetch(ROOMMATES_LIKES.LIKER);
    }
}
