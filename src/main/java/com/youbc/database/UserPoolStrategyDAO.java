package com.youbc.database;

import org.jooq.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.youbc.generated.schema.tables.ClassmatesLikes.CLASSMATES_LIKES;
import static com.youbc.generated.schema.tables.ClassmatesProfile.CLASSMATES_PROFILE;
import static com.youbc.generated.schema.tables.FriendsLikes.FRIENDS_LIKES;
import static com.youbc.generated.schema.tables.FriendsProfile.FRIENDS_PROFILE;
import static com.youbc.generated.schema.tables.RoommatesLikes.ROOMMATES_LIKES;
import static com.youbc.generated.schema.tables.RoommatesProfile.ROOMMATES_PROFILE;
import static com.youbc.generated.schema.tables.UserProfile.USER_PROFILE;

import static com.youbc.generated.schema.tables.ClassmatesDislikes.CLASSMATES_DISLIKES;
import static com.youbc.generated.schema.tables.FriendsDislikes.FRIENDS_DISLIKES;
import static com.youbc.generated.schema.tables.RoommatesDislikes.ROOMMATES_DISLIKES;

@Component
public class UserPoolStrategyDAO {

    private DSLContext dslContext;

    @Autowired
    public UserPoolStrategyDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public List<String> fetchRandomClassmates(String userId, Integer amount, Integer gender, Set<String> except) {
        Set<String> likedUserIds = dslContext.select()
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKER.eq(userId))
                .fetchSet(CLASSMATES_LIKES.LIKEE);
        Set<String> dislikedUserIds = dslContext.select()
                .from(CLASSMATES_DISLIKES)
                .where(CLASSMATES_DISLIKES.DISLIKER.eq(userId))
                .fetchSet(CLASSMATES_DISLIKES.DISLIKEE);
        if (gender == 0) {
            List<String> result = dslContext
                    .select()
                    .from(CLASSMATES_PROFILE.leftJoin(USER_PROFILE).on(CLASSMATES_PROFILE.USER_ID.eq(USER_PROFILE.USER_ID)))
                    .where(CLASSMATES_PROFILE.USER_ID.notEqual(userId))
                    .and(CLASSMATES_PROFILE.USER_ID.notIn(except))
                    .limit(amount)
                    .fetch(CLASSMATES_PROFILE.USER_ID);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        } else {
            List<String> result = dslContext
                    .select()
                    .from(CLASSMATES_PROFILE.leftJoin(USER_PROFILE).on(CLASSMATES_PROFILE.USER_ID.eq(USER_PROFILE.USER_ID)))
                    .where(CLASSMATES_PROFILE.USER_ID.notEqual(userId))
                    .and(USER_PROFILE.SEX.eq(gender))
                    .and(CLASSMATES_PROFILE.USER_ID.notIn(except))
                    .limit(amount)
                    .fetch(CLASSMATES_PROFILE.USER_ID);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        }
    }

    public List<String> fetchRandomfriends(String userId, Integer amount, Integer gender, Set<String> except) {
        Set<String> likedUserIds = dslContext.select()
                .from(FRIENDS_LIKES)
                .where(FRIENDS_LIKES.LIKER.eq(userId))
                .fetchSet(FRIENDS_LIKES.LIKEE);
        Set<String> dislikedUserIds = dslContext.select()
                .from(FRIENDS_DISLIKES)
                .where(FRIENDS_DISLIKES.DISLIKER.eq(userId))
                .fetchSet(FRIENDS_DISLIKES.DISLIKEE);
        if (gender == 0) {
            List<String> result = dslContext
                    .select()
                    .from(FRIENDS_PROFILE.leftOuterJoin(USER_PROFILE).on(FRIENDS_PROFILE.USER_ID.eq(USER_PROFILE.USER_ID)))
                    .where(FRIENDS_PROFILE.USER_ID.notEqual(userId))
                    .and(FRIENDS_PROFILE.USER_ID.notIn(except))
                    .limit(amount)
                    .fetch(FRIENDS_PROFILE.USER_ID);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        } else {
            List<String> result = dslContext
                    .select()
                    .from(FRIENDS_PROFILE.leftOuterJoin(USER_PROFILE).on(FRIENDS_PROFILE.USER_ID.eq(USER_PROFILE.USER_ID)))
                    .where(USER_PROFILE.SEX.eq(gender))
                    .and(FRIENDS_PROFILE.USER_ID.notEqual(userId))
                    .and(FRIENDS_PROFILE.USER_ID.notIn(except))
                    .limit(amount)
                    .fetch(FRIENDS_PROFILE.USER_ID);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        }
    }

    public List<String> fetchRandomRoommates(String userId, Integer amount, Integer gender, Set<String> except) {
        Set<String> likedUserIds = dslContext.select()
                .from(ROOMMATES_LIKES)
                .where(ROOMMATES_LIKES.LIKER.eq(userId))
                .fetchSet(ROOMMATES_LIKES.LIKEE);
        Set<String> dislikedUserIds = dslContext.select()
                .from(ROOMMATES_DISLIKES)
                .where(ROOMMATES_DISLIKES.DISLIKER.eq(userId))
                .fetchSet(ROOMMATES_DISLIKES.DISLIKEE);
        if (gender == 0) {
            List<String> result =  dslContext
                    .select()
                    .from(ROOMMATES_PROFILE.leftOuterJoin(USER_PROFILE).on(ROOMMATES_PROFILE.USER_ID.eq(USER_PROFILE.USER_ID)))
                    .where(ROOMMATES_PROFILE.USER_ID.notEqual(userId))
                    .and(ROOMMATES_PROFILE.USER_ID.notIn(except))
                    .limit(amount)
                    .fetch(ROOMMATES_PROFILE.USER_ID);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        } else {
            List<String> result =  dslContext
                    .select()
                    .from(ROOMMATES_PROFILE.leftOuterJoin(USER_PROFILE).on(ROOMMATES_PROFILE.USER_ID.eq(USER_PROFILE.USER_ID)))
                    .where(USER_PROFILE.SEX.eq(gender))
                    .and(ROOMMATES_PROFILE.USER_ID.notEqual(userId))
                    .and(ROOMMATES_PROFILE.USER_ID.notIn(except))
                    .limit(amount)
                    .fetch(ROOMMATES_PROFILE.USER_ID);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        }
    }

    public List<String> fetchClassmatesByLikes(String userId, Integer amount, Integer gender, Set<String> except) {
        Set<String> likedUserIds = dslContext.select()
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKER.eq(userId))
                .fetchSet(CLASSMATES_LIKES.LIKEE);
        Set<String> dislikedUserIds = dslContext.select()
                .from(CLASSMATES_DISLIKES)
                .where(CLASSMATES_DISLIKES.DISLIKER.eq(userId))
                .fetchSet(CLASSMATES_DISLIKES.DISLIKEE);
        if (gender == 0) {
            List<String> result = dslContext
                    .select()
                    .from(CLASSMATES_LIKES.leftOuterJoin(USER_PROFILE).on(CLASSMATES_LIKES.LIKER.eq(USER_PROFILE.USER_ID)))
                    .where(CLASSMATES_LIKES.LIKEE.eq(userId))
                    .and(CLASSMATES_LIKES.LIKER.notIn(except))
                    .limit(amount)
                    .fetch(CLASSMATES_LIKES.LIKER);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        } else {
            List<String> result = dslContext
                    .select()
                    .from(CLASSMATES_LIKES.leftOuterJoin(USER_PROFILE).on(CLASSMATES_LIKES.LIKER.eq(USER_PROFILE.USER_ID)))
                    .where(USER_PROFILE.SEX.eq(gender))
                    .and(CLASSMATES_LIKES.LIKEE.eq(userId))
                    .and(CLASSMATES_LIKES.LIKER.notIn(except))
                    .limit(amount)
                    .fetch(CLASSMATES_LIKES.LIKER);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        }
    }

    public List<String> fetchFriendsByLikes(String userId, Integer amount, Integer gender, Set<String> except) {
        Set<String> dislikedUserIds = dslContext.select()
                .from(FRIENDS_DISLIKES)
                .where(FRIENDS_DISLIKES.DISLIKER.eq(userId))
                .fetchSet(FRIENDS_DISLIKES.DISLIKEE);
        Set<String> likedUserIds = dslContext.select()
                .from(FRIENDS_LIKES)
                .where(FRIENDS_LIKES.LIKER.eq(userId))
                .fetchSet(FRIENDS_LIKES.LIKEE);
        if (gender == 0) {
            List<String> result =  dslContext
                    .select()
                    .from(FRIENDS_LIKES.leftOuterJoin(USER_PROFILE).on(FRIENDS_LIKES.LIKER.eq(USER_PROFILE.USER_ID)))
                    .where(FRIENDS_LIKES.LIKEE.eq(userId))
                    .and(FRIENDS_LIKES.LIKER.notIn(except))
                    .limit(amount)
                    .fetch(FRIENDS_LIKES.LIKER);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        } else {
            List<String> result =  dslContext
                    .select()
                    .from(FRIENDS_LIKES.leftOuterJoin(USER_PROFILE).on(FRIENDS_LIKES.LIKER.eq(USER_PROFILE.USER_ID)))
                    .where(USER_PROFILE.SEX.eq(gender))
                    .and(FRIENDS_LIKES.LIKEE.eq(userId))
                    .and(FRIENDS_LIKES.LIKER.notIn(except))
                    .limit(amount)
                    .fetch(FRIENDS_LIKES.LIKER);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        }
    }

    public List<String> fetchRoommatesByLikes(String userId, Integer amount, Integer gender, Set<String> except) {
        Set<String> likedUserIds = dslContext.select()
                .from(ROOMMATES_LIKES)
                .where(ROOMMATES_LIKES.LIKER.eq(userId))
                .fetchSet(ROOMMATES_LIKES.LIKEE);
        Set<String> dislikedUserIds = dslContext.select()
                .from(ROOMMATES_DISLIKES)
                .where(ROOMMATES_DISLIKES.DISLIKER.eq(userId))
                .fetchSet(ROOMMATES_DISLIKES.DISLIKEE);
        if (gender == 0) {
            List<String> result = dslContext
                    .select()
                    .from(ROOMMATES_LIKES.leftOuterJoin(USER_PROFILE).on(ROOMMATES_LIKES.LIKER.eq(USER_PROFILE.USER_ID)))
                    .where(ROOMMATES_LIKES.LIKEE.eq(userId))
                    .and(ROOMMATES_LIKES.LIKER.notIn(except))
                    .limit(amount)
                    .fetch(ROOMMATES_LIKES.LIKER);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        } else {
            List<String> result = dslContext
                    .select()
                    .from(ROOMMATES_LIKES.leftOuterJoin(USER_PROFILE).on(ROOMMATES_LIKES.LIKER.eq(USER_PROFILE.USER_ID)))
                    .where(USER_PROFILE.SEX.eq(gender))
                    .and(ROOMMATES_LIKES.LIKEE.eq(userId))
                    .and(ROOMMATES_LIKES.LIKER.notIn(except))
                    .limit(amount)
                    .fetch(ROOMMATES_LIKES.LIKER);
            result.removeAll(likedUserIds);
            result.removeAll(dislikedUserIds);
            return result;
        }
    }
}
