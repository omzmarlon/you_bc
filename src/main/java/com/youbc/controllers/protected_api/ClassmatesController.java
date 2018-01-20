package com.youbc.controllers.protected_api;

import com.youbc.models.candidate.BasicCandidate;
import com.youbc.pooling.UserPoolManager;
import com.youbc.pooling.WeightedStrategy;
import com.youbc.pooling.classmates.PoolingByLikesClassmates;
import com.youbc.pooling.classmates.PoolingRandomClassmates;
import com.youbc.securities.services.CookieService;
import com.youbc.utilities.Endpoints;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Set;

@RestController
public class ClassmatesController {

    private UserPoolManager userPoolManager;
    private CookieService cookieService;

    public ClassmatesController(CookieService cookieService, PoolingRandomClassmates poolingRandomClassmates) {
        this.cookieService = cookieService;
        // init userPoolManager
        ArrayList<WeightedStrategy> strategies = new ArrayList<>();
        strategies.add(new WeightedStrategy(poolingRandomClassmates, 1.0));
//        strategies.add(new WeightedStrategy(poolingByLikesClassmates, 0.7));
        userPoolManager = new UserPoolManager(strategies);
    }

    @RequestMapping(path = Endpoints.CLASSMATE_CANDIDATES, params = {"amount", "gender"}, method = RequestMethod.GET)
    public Set<BasicCandidate> getClassmateCandidates(
            @RequestParam(value = "amount") int amount,
            @RequestParam(value = "gender", required = false) String gender
    ) {
        if (gender == null) gender = "mixed";
        return userPoolManager.poolUsers(amount);
    }

}