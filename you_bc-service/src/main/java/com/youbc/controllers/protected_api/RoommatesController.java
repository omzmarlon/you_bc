package com.youbc.controllers.protected_api;

import com.youbc.database.LikeAndDislikeDao;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.pooling.UserPoolManager;
import com.youbc.pooling.WeightedStrategy;
import com.youbc.pooling.roommates.PoolingByLikesRoommates;
import com.youbc.pooling.roommates.PoolingRandomRoommates;
import com.youbc.securities.services.CookieService;
import com.youbc.utilities.Endpoints;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Set;

@RestController
public class RoommatesController {

    private UserPoolManager userPoolManager;
    private CookieService cookieService;
    private LikeAndDislikeDao likeAndDislikeDao;

    public RoommatesController(
            CookieService cookieService,
            PoolingRandomRoommates poolingRandomRoommates,
            PoolingByLikesRoommates poolingByLikesRoommates,
            LikeAndDislikeDao likeAndDislikeDao
    ) {
        this.cookieService = cookieService;
        this.likeAndDislikeDao = likeAndDislikeDao;
        // init userPoolManager
        ArrayList<WeightedStrategy> strategies = new ArrayList<>();
        strategies.add(new WeightedStrategy(poolingRandomRoommates, 0.7));
        strategies.add(new WeightedStrategy(poolingByLikesRoommates, 0.3));
        userPoolManager = new UserPoolManager(strategies);
    }

    @RequestMapping(path = Endpoints.ROOMMATE_CANDIDATES, method = RequestMethod.GET)
    public Set<BasicCandidate> getRoommateCandidates(HttpServletRequest request) {
        Integer userID = cookieService.getAuthenticatedUserId(request);
        String gender = request.getParameter("gender");
        Integer amount = Integer.parseInt(request.getParameter("amount"));
        if (amount <= 0) throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "missing parameter", "\'amount\' value is missing in the query string"));
        if (gender == null) gender = "mix";
        return userPoolManager.poolUsers(userID, amount, gender);
    }

    @RequestMapping(path = Endpoints.LIKE_ROOMMATES, method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void postLikeRoommates(HttpServletRequest request, @PathVariable("user_id") Integer likee) {
        Integer liker = cookieService.getAuthenticatedUserId(request);
        likeAndDislikeDao.roommatesLike(liker, likee);
    }

    @RequestMapping(path = Endpoints.DISLIKE_ROOMMATES, method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void postDislikeRoommates(HttpServletRequest request, @PathVariable("user_id") Integer dislikee) {
        Integer disliker = cookieService.getAuthenticatedUserId(request);
        likeAndDislikeDao.roommatesDislike(disliker, dislikee);
    }
}
