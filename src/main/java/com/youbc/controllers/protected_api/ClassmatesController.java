package com.youbc.controllers.protected_api;

import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.pooling.UserPoolManager;
import com.youbc.pooling.WeightedStrategy;
import com.youbc.pooling.classmates.PoolingByLikesClassmates;
import com.youbc.pooling.classmates.PoolingRandomClassmates;
import com.youbc.securities.services.CookieService;
import com.youbc.utilities.Endpoints;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Set;

@RestController
public class ClassmatesController {

    private UserPoolManager userPoolManager;
    private CookieService cookieService;

    public ClassmatesController(CookieService cookieService, PoolingRandomClassmates poolingRandomClassmates, PoolingByLikesClassmates poolingByLikesClassmates) {
        this.cookieService = cookieService;
        // init userPoolManager
        ArrayList<WeightedStrategy> strategies = new ArrayList<>();
        strategies.add(new WeightedStrategy(poolingRandomClassmates, 0.3));
        strategies.add(new WeightedStrategy(poolingByLikesClassmates, 0.7));
        userPoolManager = new UserPoolManager(strategies);
    }

    @RequestMapping(path = Endpoints.CLASSMATE_CANDIDATES, method = RequestMethod.GET)
    public Set<BasicCandidate> getClassmateCandidates(HttpServletRequest request) {
        Integer amount = Integer.parseInt(request.getParameter("amount"));
        String gender = request.getParameter("gender");
        String userID = cookieService.getAuthenticatedUserId(request);
        if (amount <= 0) throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "missing parameter", "\'amount\' value is missing in the query string"));
        if (gender == null) gender = "mixed";
        return userPoolManager.poolUsers(userID, amount, gender);
    }

}