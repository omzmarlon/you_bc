package com.youbc.database;

import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static com.youbc.generated.schema.tables.RoommatesLikes.ROOMMATES_LIKES;
import static com.youbc.generated.schema.tables.RoommatesDislikes.ROOMMATES_DISLIKES;
import static com.youbc.generated.schema.tables.ClassmatesLikes.CLASSMATES_LIKES;
import static com.youbc.generated.schema.tables.ClassmatesDislikes.CLASSMATES_DISLIKES;
import static com.youbc.generated.schema.tables.FriendsLikes.FRIENDS_LIKES;
import static com.youbc.generated.schema.tables.FriendsDislikes.FRIENDS_DISLIKES;

@Component
public class LikeAndDislikeDao {

    private DSLContext dslContext;
    private UserDAO userDAO;

    @Autowired
    public LikeAndDislikeDao(DSLContext dslContext, UserDAO userDAO) {
        this.dslContext = dslContext;
        this.userDAO = userDAO;
    }

    public void roommatesLike(String likerId, String likeeId) {
        if (validateUsersExistance(likerId, likeeId))
            dslContext
                .insertInto(ROOMMATES_LIKES)
                .set(ROOMMATES_LIKES.LIKER, likerId)
                .set(ROOMMATES_LIKES.LIKEE, likeeId)
                .set(ROOMMATES_LIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void roommatesDislike(String dislikerId, String dislikeeId) {
        if (validateUsersExistance(dislikerId, dislikeeId))
            dslContext
                .insertInto(ROOMMATES_DISLIKES)
                .set(ROOMMATES_DISLIKES.DISLIKER, dislikerId)
                .set(ROOMMATES_DISLIKES.DISLIKEE, dislikeeId)
                .set(ROOMMATES_DISLIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void classmatesLike(String likerId, String likeeId) {
        if (validateUsersExistance(likerId, likeeId))
            dslContext
                .insertInto(CLASSMATES_LIKES)
                .set(CLASSMATES_LIKES.LIKER, likerId)
                .set(CLASSMATES_LIKES.LIKEE, likeeId)
                .set(CLASSMATES_LIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void classmatesDislike(String dislikerId, String dislikeeId) {
        if (validateUsersExistance(dislikerId, dislikeeId))
            dslContext
                .insertInto(CLASSMATES_DISLIKES)
                .set(CLASSMATES_DISLIKES.DISLIKER, dislikerId)
                .set(CLASSMATES_DISLIKES.DISLIKEE, dislikeeId)
                .set(CLASSMATES_DISLIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void friendsLike(String likerId, String likeeId) {
        if (validateUsersExistance(likerId, likeeId))
            dslContext
                .insertInto(FRIENDS_LIKES)
                .set(FRIENDS_LIKES.LIKER, likerId)
                .set(FRIENDS_LIKES.LIKEE, likeeId)
                .set(FRIENDS_LIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void friendsDislike(String dislikerId, String dislikeeId) {
        if (validateUsersExistance(dislikerId, dislikeeId))
            dslContext
                .insertInto(FRIENDS_DISLIKES)
                .set(FRIENDS_DISLIKES.DISLIKER, dislikerId)
                .set(FRIENDS_DISLIKES.DISLIKEE, dislikeeId)
                .set(FRIENDS_DISLIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    private boolean validateUsersExistance(String id_1, String id_2) {
        return userDAO.userExists(id_1) && userDAO.userExists(id_2);
    }
}
