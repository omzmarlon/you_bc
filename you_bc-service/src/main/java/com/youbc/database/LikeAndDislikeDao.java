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
    private UserProfileDAO userDAO;

    @Autowired
    public LikeAndDislikeDao(DSLContext dslContext, UserProfileDAO userDAO) {
        this.dslContext = dslContext;
        this.userDAO = userDAO;
    }

    public void roommatesLike(Integer likerId, Integer likeeId) {
        if (validateUsersExistence(likerId, likeeId))
            dslContext
                .insertInto(ROOMMATES_LIKES)
                .set(ROOMMATES_LIKES.LIKER, likerId)
                .set(ROOMMATES_LIKES.LIKEE, likeeId)
                .set(ROOMMATES_LIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void roommatesDislike(Integer dislikerId, Integer dislikeeId) {
        if (validateUsersExistence(dislikerId, dislikeeId))
            dslContext
                .insertInto(ROOMMATES_DISLIKES)
                .set(ROOMMATES_DISLIKES.DISLIKER, dislikerId)
                .set(ROOMMATES_DISLIKES.DISLIKEE, dislikeeId)
                .set(ROOMMATES_DISLIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void classmatesLike(Integer likerId, Integer likeeId) {
        if (validateUsersExistence(likerId, likeeId))
            dslContext
                .insertInto(CLASSMATES_LIKES)
                .set(CLASSMATES_LIKES.LIKER, likerId)
                .set(CLASSMATES_LIKES.LIKEE, likeeId)
                .set(CLASSMATES_LIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void classmatesDislike(Integer dislikerId, Integer dislikeeId) {
        if (validateUsersExistence(dislikerId, dislikeeId))
            dslContext
                .insertInto(CLASSMATES_DISLIKES)
                .set(CLASSMATES_DISLIKES.DISLIKER, dislikerId)
                .set(CLASSMATES_DISLIKES.DISLIKEE, dislikeeId)
                .set(CLASSMATES_DISLIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void friendsLike(Integer likerId, Integer likeeId) {
        if (validateUsersExistence(likerId, likeeId))
            dslContext
                .insertInto(FRIENDS_LIKES)
                .set(FRIENDS_LIKES.LIKER, likerId)
                .set(FRIENDS_LIKES.LIKEE, likeeId)
                .set(FRIENDS_LIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    public void friendsDislike(Integer dislikerId, Integer dislikeeId) {
        if (validateUsersExistence(dislikerId, dislikeeId))
            dslContext
                .insertInto(FRIENDS_DISLIKES)
                .set(FRIENDS_DISLIKES.DISLIKER, dislikerId)
                .set(FRIENDS_DISLIKES.DISLIKEE, dislikeeId)
                .set(FRIENDS_DISLIKES.TIME_CREATED, DSL.currentTimestamp())
                .execute();
    }

    private boolean validateUsersExistence(Integer id_1, Integer id_2) {
        return userDAO.userExistsById(id_1) && userDAO.userExistsById(id_2);
    }
}
