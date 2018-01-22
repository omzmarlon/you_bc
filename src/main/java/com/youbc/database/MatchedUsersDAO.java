package com.youbc.database;

import org.jooq.DSLContext;
import org.jooq.Record2;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

import static com.youbc.generated.schema.tables.ClassmatesLikes.CLASSMATES_LIKES;
import static com.youbc.generated.schema.tables.FriendsLikes.FRIENDS_LIKES;
import static com.youbc.generated.schema.tables.RoommatesLikes.ROOMMATES_LIKES;

@Component
public class MatchedUsersDAO {

    private DSLContext dslContext;

    @Autowired
    public MatchedUsersDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public Set<String> fetchAllMatchedUsers(String userId) {
        Set<String> classmates = dslContext
                .select()
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKER.eq(userId))
                .fetchSet(CLASSMATES_LIKES.LIKEE);

        Set<String> classmateLikers = dslContext
                .select()
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKEE.eq(userId))
                .fetchSet(CLASSMATES_LIKES.LIKER);
        classmates.retainAll(classmateLikers);

        Set<String> friends = dslContext
                .select()
                .from(FRIENDS_LIKES)
                .where(FRIENDS_LIKES.LIKER.eq(userId))
                .fetchSet(FRIENDS_LIKES.LIKEE);

        Set<String> friendLikers = dslContext
                .select()
                .from(FRIENDS_LIKES)
                .where(FRIENDS_LIKES.LIKEE.eq(userId))
                .fetchSet(FRIENDS_LIKES.LIKER);
        friends.retainAll(friendLikers);

        Set<String> roommates = dslContext
                .select()
                .from(ROOMMATES_LIKES)
                .where(ROOMMATES_LIKES.LIKER.eq(userId))
                .fetchSet(ROOMMATES_LIKES.LIKEE);

        Set<String> roommateLikers = dslContext
                .select()
                .from(ROOMMATES_LIKES)
                .where(ROOMMATES_LIKES.LIKEE.eq(userId))
                .fetchSet(ROOMMATES_LIKES.LIKER);
        roommates.retainAll(roommateLikers);

        classmates.addAll(friends);
        classmates.addAll(roommates);
        return classmates;
    }

    public boolean matchedAtClassmates(String self, String theOther) {
        Result<Record2<String, String>> result = dslContext
                .select(CLASSMATES_LIKES.LIKER, CLASSMATES_LIKES.LIKEE)
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKEE.eq(theOther))
                .and(CLASSMATES_LIKES.LIKER.eq(self))
                .fetch();
        return result.isNotEmpty();
    }

    public boolean matchedAtFriends(String self, String theOther) {
        Result<Record2<String, String>> result = dslContext
                .select(FRIENDS_LIKES.LIKER, FRIENDS_LIKES.LIKEE)
                .from(FRIENDS_LIKES)
                .where(FRIENDS_LIKES.LIKEE.eq(theOther))
                .and(FRIENDS_LIKES.LIKER.eq(self))
                .fetch();
        return result.isNotEmpty();
    }

    public boolean matchedAtRoommates(String self, String theOther) {
        Result<Record2<String, String>> result = dslContext
                .select(ROOMMATES_LIKES.LIKER, ROOMMATES_LIKES.LIKEE)
                .from(ROOMMATES_LIKES)
                .where(ROOMMATES_LIKES.LIKEE.eq(theOther))
                .and(ROOMMATES_LIKES.LIKER.eq(self))
                .fetch();
        return result.isNotEmpty();
    }
}
