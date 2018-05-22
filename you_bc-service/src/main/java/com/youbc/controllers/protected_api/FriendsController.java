package com.youbc.controllers.protected_api;

import com.youbc.database.LikeAndDislikeDao;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.pooling.UserPoolManager;
import com.youbc.pooling.WeightedStrategy;
import com.youbc.pooling.friends.PoolingByLikesFriends;
import com.youbc.pooling.friends.PoolingRandomFriends;
import com.youbc.utilities.Endpoints;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Set;

@RestController
public class FriendsController {

    private UserPoolManager userPoolManager;
    private LikeAndDislikeDao likeAndDislikeDao;

    public FriendsController(
            PoolingRandomFriends poolingRandomFriends,
            PoolingByLikesFriends poolingByLikesFriends,
            LikeAndDislikeDao likeAndDislikeDao
    ) {
        this.likeAndDislikeDao = likeAndDislikeDao;
        // init userPoolManager
        ArrayList<WeightedStrategy> strategies = new ArrayList<>();
        strategies.add(new WeightedStrategy(poolingRandomFriends, 0.7));
        strategies.add(new WeightedStrategy(poolingByLikesFriends, 0.3));
        userPoolManager = new UserPoolManager(strategies);
    }

    @RequestMapping(path = Endpoints.FRIEND_CANDIDATES, method = RequestMethod.GET)
    public Set<BasicCandidate> getFriendCandidates(
            HttpServletRequest request,
            @RequestParam("amount") Integer amount,
            @RequestParam("gender") String gender
    ) {
        Integer userID = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (amount <= 0) throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "missing parameter", "\'amount\' value is missing in the query string"));
        if (gender == null) gender = "mix";
        return userPoolManager.poolUsers(userID, amount, gender);
    }

    @RequestMapping(path = Endpoints.LIKE_FRIENDS, method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void postLikeFriends(HttpServletRequest request, @PathVariable("user_id") Integer likee) {
        Integer liker = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        likeAndDislikeDao.friendsLike(liker, likee);
    }

    @RequestMapping(path = Endpoints.DISLIKE_FRIENDS, method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void postDislikeFriends(HttpServletRequest request, @PathVariable("user_id") Integer dislikee) {
        Integer disliker = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        likeAndDislikeDao.friendsDislike(disliker, dislikee);
    }
}
