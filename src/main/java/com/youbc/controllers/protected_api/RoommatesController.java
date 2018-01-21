package com.youbc.controllers.protected_api;

import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.pooling.UserPoolManager;
import com.youbc.pooling.WeightedStrategy;
import com.youbc.pooling.roommates.PoolingByLikesRoommates;
import com.youbc.pooling.roommates.PoolingRandomRoommates;
import com.youbc.securities.services.CookieService;
import com.youbc.utilities.Endpoints;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Set;

@RestController
public class RoommatesController {

    private UserPoolManager userPoolManager;
    private CookieService cookieService;

    public RoommatesController(CookieService cookieService, PoolingRandomRoommates poolingRandomRoommates, PoolingByLikesRoommates poolingByLikesRoommates) {
        this.cookieService = cookieService;
        // init userPoolManager
        ArrayList<WeightedStrategy> strategies = new ArrayList<>();
        strategies.add(new WeightedStrategy(poolingRandomRoommates, 0.7));
        strategies.add(new WeightedStrategy(poolingByLikesRoommates, 0.3));
        userPoolManager = new UserPoolManager(strategies);
    }

    @RequestMapping(path = Endpoints.ROOMMATE_CANDIDATES, method = RequestMethod.GET)
    public Set<BasicCandidate> getRoommateCandidates(HttpServletRequest request) {
        String userID = cookieService.getAuthenticatedUserId(request);
        String gender = request.getParameter("gender");
        Integer amount = Integer.parseInt(request.getParameter("amount"));
        if (amount <= 0) throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "missing parameter", "\'amount\' value is missing in the query string"));
        if (gender == null) gender = "mix";
        return userPoolManager.poolUsers(userID, amount, gender);
    }
}
