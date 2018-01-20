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

@Component
public class UserPoolStrategyDAO {

    private DSLContext dslContext;

    @Autowired
    public UserPoolStrategyDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public List<String> fetchRandomClassmates(int amount, Set<String> except) {
        return dslContext
                .select()
                .from(CLASSMATES_PROFILE)
                .where(CLASSMATES_PROFILE.USER_ID.notIn(except))
                .limit(amount)
                .fetch(CLASSMATES_PROFILE.USER_ID);
    }

    public List<String> fetchRandomfriends(int amount, Set<String> except) {
        return dslContext
                .select()
                .from(FRIENDS_PROFILE)
                .where(FRIENDS_PROFILE.USER_ID.notIn(except))
                .limit(amount)
                .fetch(FRIENDS_PROFILE.USER_ID);
    }

    public List<String> fetchRandomRoommates(int amount, Set<String> except) {
        return dslContext
                .select()
                .from(ROOMMATES_PROFILE)
                .where(ROOMMATES_PROFILE.USER_ID.notIn(except))
                .limit(amount)
                .fetch(ROOMMATES_PROFILE.USER_ID);
    }

    public List<String> fetchClassmatesByLikes(int amount, String userId, Set<String> except) {
        return dslContext
                .select()
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKEE.eq(userId))
                .and(CLASSMATES_LIKES.LIKER.notIn(except))
                .limit(amount)
                .fetch(CLASSMATES_LIKES.LIKER);
    }

    public List<String> fetchFriendsByLikes(int amount, String userId, Set<String> except) {
        return dslContext
                .select()
                .from(FRIENDS_LIKES)
                .where(FRIENDS_LIKES.LIKEE.eq(userId))
                .and(FRIENDS_LIKES.LIKER.notIn(except))
                .limit(amount)
                .fetch(FRIENDS_LIKES.LIKER);
    }

    public List<String> fetchRoommatesByLikes(int amount, String userId, Set<String> except) {
        return dslContext
                .select()
                .from(ROOMMATES_LIKES)
                .where(ROOMMATES_LIKES.LIKEE.eq(userId))
                .and(ROOMMATES_LIKES.LIKER.notIn(except))
                .limit(amount)
                .fetch(ROOMMATES_LIKES.LIKER);
    }
}
