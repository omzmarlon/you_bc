package com.youbc.database;

import com.youbc.models.MatchedUser;
import org.jooq.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
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
        Result<Record1<String>> result =  dslContext
                .select(CLASSMATES_LIKES.LIKEE)
                .from(CLASSMATES_LIKES)
                .where(CLASSMATES_LIKES.LIKER.eq(userId))
                .intersect(dslContext
                        .select(CLASSMATES_LIKES.LIKER)
                        .from(CLASSMATES_LIKES)
                        .where(CLASSMATES_LIKES.LIKEE.eq(userId)))
                .union(dslContext
                        .select(FRIENDS_LIKES.LIKEE)
                        .from(FRIENDS_LIKES)
                        .where(FRIENDS_LIKES.LIKER.eq(userId))
                        .intersect(dslContext
                                .select(FRIENDS_LIKES.LIKER)
                                .from(FRIENDS_LIKES)
                                .where(FRIENDS_LIKES.LIKEE.eq(userId))))
                .union(dslContext
                        .select(ROOMMATES_LIKES.LIKEE)
                        .from(ROOMMATES_LIKES)
                        .where(ROOMMATES_LIKES.LIKER.eq(userId))
                        .intersect(dslContext
                                .select(ROOMMATES_LIKES.LIKER)
                                .from(ROOMMATES_LIKES)
                                .where(ROOMMATES_LIKES.LIKEE.eq(userId))))
                .fetch();
        return (Set<String>) result.intoSet(0);
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
