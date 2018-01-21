package com.youbc.controllers.protected_api;

import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.pooling.UserPoolManager;
import com.youbc.pooling.WeightedStrategy;
import com.youbc.pooling.friends.PoolingByLikesFriends;
import com.youbc.pooling.friends.PoolingRandomFriends;
import com.youbc.securities.services.CookieService;
import com.youbc.utilities.Endpoints;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Set;

@RestController
public class FriendsController {

    private UserPoolManager userPoolManager;
    private CookieService cookieService;

    public FriendsController(CookieService cookieService, PoolingRandomFriends poolingRandomFriends, PoolingByLikesFriends poolingByLikesFriends) {
        this.cookieService = cookieService;
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
        String userID = cookieService.getAuthenticatedUserId(request);
        if (amount <= 0) throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "missing parameter", "\'amount\' value is missing in the query string"));
        if (gender == null) gender = "mix";
        return userPoolManager.poolUsers(userID, amount, gender);
    }
}
