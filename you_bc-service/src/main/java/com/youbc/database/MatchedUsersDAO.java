package com.youbc.database;

import org.jooq.DSLContext;
import org.jooq.Record2;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static com.youbc.generated.schema.tables.ClassmatesLikes.CLASSMATES_LIKES;
import static com.youbc.generated.schema.tables.FriendsLikes.FRIENDS_LIKES;
import static com.youbc.generated.schema.tables.RoommatesLikes.ROOMMATES_LIKES;
import static com.youbc.generated.schema.tables.UserProfile.USER_PROFILE;

@Component
public class MatchedUsersDAO {

    private DSLContext dslContext;
    private UserProfileDAO userDAO;

    @Autowired
    public MatchedUsersDAO(DSLContext dslContext, UserProfileDAO userDAO) {
        this.userDAO = userDAO;
        this.dslContext = dslContext;
    }

    public Set<Integer> fetchAllMatchedUsers(Integer userId) {
        Set<Integer> classmates = dslContext
                .select()
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKER.eq(userId))
                .fetchSet(CLASSMATES_LIKES.LIKEE);

        Set<Integer> classmateLikers = dslContext
                .select()
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKEE.eq(userId))
                .fetchSet(CLASSMATES_LIKES.LIKER);
        classmates.retainAll(classmateLikers);

        Set<Integer> friends = dslContext
                .select()
                .from(FRIENDS_LIKES)
                .where(FRIENDS_LIKES.LIKER.eq(userId))
                .fetchSet(FRIENDS_LIKES.LIKEE);

        Set<Integer> friendLikers = dslContext
                .select()
                .from(FRIENDS_LIKES)
                .where(FRIENDS_LIKES.LIKEE.eq(userId))
                .orderBy(FRIENDS_LIKES.TIME_CREATED.desc())
                .fetchSet(FRIENDS_LIKES.LIKER);
        friends.retainAll(friendLikers);

        Set<Integer> roommates = dslContext
                .select()
                .from(ROOMMATES_LIKES)
                .where(ROOMMATES_LIKES.LIKER.eq(userId))
                .fetchSet(ROOMMATES_LIKES.LIKEE);

        Set<Integer> roommateLikers = dslContext
                .select()
                .from(ROOMMATES_LIKES)
                .where(ROOMMATES_LIKES.LIKEE.eq(userId))
                .fetchSet(ROOMMATES_LIKES.LIKER);
        roommates.retainAll(roommateLikers);

        classmates.addAll(friends);
        classmates.addAll(roommates);
        return classmates;
    }

    public long getLatestLikeTime(Integer self, Integer theOther) {
        List<Timestamp> classmateTimes = dslContext
                .select()
                .from(CLASSMATES_LIKES)
                .where((CLASSMATES_LIKES.LIKEE.eq(self).and(CLASSMATES_LIKES.LIKER.eq(theOther)))
                        .or(CLASSMATES_LIKES.LIKEE.eq(theOther).and(CLASSMATES_LIKES.LIKER.eq(self))))
                .fetch(CLASSMATES_LIKES.TIME_CREATED);
        List<Timestamp> roommateTimes = dslContext
                .select()
                .from(ROOMMATES_LIKES)
                .where((ROOMMATES_LIKES.LIKEE.eq(theOther).and(ROOMMATES_LIKES.LIKER.eq(self)))
                        .or(ROOMMATES_LIKES.LIKEE.eq(self).and(ROOMMATES_LIKES.LIKER.eq(theOther))))
                .fetch(ROOMMATES_LIKES.TIME_CREATED);
        List<Timestamp> friendTimes = dslContext
                .select()
                .from(FRIENDS_LIKES)
                .where((FRIENDS_LIKES.LIKEE.eq(theOther).and(FRIENDS_LIKES.LIKER.eq(self)))
                        .or(FRIENDS_LIKES.LIKEE.eq(self).and(FRIENDS_LIKES.LIKER.eq(theOther))))
                .fetch(FRIENDS_LIKES.TIME_CREATED);

        List<Timestamp> result = new ArrayList<>();
        result.addAll(classmateTimes);
        result.addAll(roommateTimes);
        result.addAll(friendTimes);

        long latestTime = 0;
        for(Timestamp val : result) {
            long time = val.getTime();
            if (time > latestTime) {
                latestTime = time;
            }
        }
        return latestTime;
    }

    public boolean matchedAtClassmates(Integer self, Integer theOther) {
        Result<Record2<Integer, Integer>> result = dslContext
                .select(CLASSMATES_LIKES.LIKER, CLASSMATES_LIKES.LIKEE)
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKEE.eq(theOther))
                .and(CLASSMATES_LIKES.LIKER.eq(self))
                .fetch();
        return result.isNotEmpty();
    }

    public boolean matchedAtFriends(Integer self, Integer theOther) {
        Result<Record2<Integer, Integer>> result = dslContext
                .select(FRIENDS_LIKES.LIKER, FRIENDS_LIKES.LIKEE)
                .from(FRIENDS_LIKES)
                .where(FRIENDS_LIKES.LIKEE.eq(theOther))
                .and(FRIENDS_LIKES.LIKER.eq(self))
                .fetch();
        return result.isNotEmpty();
    }

    public boolean matchedAtRoommates(Integer self, Integer theOther) {
        Result<Record2<Integer, Integer>> result = dslContext
                .select(ROOMMATES_LIKES.LIKER, ROOMMATES_LIKES.LIKEE)
                .from(ROOMMATES_LIKES)
                .where(ROOMMATES_LIKES.LIKEE.eq(theOther))
                .and(ROOMMATES_LIKES.LIKER.eq(self))
                .fetch();
        return result.isNotEmpty();
    }

    // workaround: add fetchMatchCount() and updateMatchCount()
    public Integer fetchMatchCount(Integer userId) {
        Integer matchCount =  dslContext
                .select()
                .from(USER_PROFILE)
                .where(USER_PROFILE.USER_ID.eq(userId))
                .fetchOne(USER_PROFILE.MATCHCOUNT);
        if (matchCount == null) return 0;
        return matchCount;
    }

    public void updateMatchCount(Integer userId, Integer newMatchCount) {
        if (userDAO.userExistsById(userId)) {
            dslContext.update(USER_PROFILE)
                    .set(USER_PROFILE.MATCHCOUNT, newMatchCount)
                    .where(USER_PROFILE.USER_ID.eq(userId))
                    .execute();
        }
    }
}
