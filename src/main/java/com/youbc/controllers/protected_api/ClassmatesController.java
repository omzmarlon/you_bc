package com.youbc.controllers.protected_api;

import com.youbc.database.UserDAO;
import com.youbc.models.candidate.BasicCandidate;
import com.youbc.models.candidate.ClassmateCandidate;
import com.youbc.pooling.PoolingRandomRoommates;
import com.youbc.pooling.UserPoolManager;
import com.youbc.pooling.WeightedStrategy;
import com.youbc.pooling.classmates.PoolingByLikesClassmates;
import com.youbc.pooling.classmates.PoolingRandomClassmates;
import com.youbc.securities.services.CookieService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
        strategies.add(new WeightedStrategy(poolingRandomClassmates, 1.0));
//        strategies.add(new WeightedStrategy(poolingByLikesClassmates, 0.7));
        userPoolManager = new UserPoolManager(strategies);
    }

    @RequestMapping(path = "/api/classmates", method = RequestMethod.GET)
    public Set<BasicCandidate> getClassmateCandidates(HttpServletRequest request) {
        // todo: finish controller
        return null;
    }

}