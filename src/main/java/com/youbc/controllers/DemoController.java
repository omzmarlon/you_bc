package com.youbc.controllers;

import com.youbc.database.UserDAO;
import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    private UserDAO userDAO;

    @Autowired
    public DemoController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @RequestMapping(path = "/demoJooq", method = RequestMethod.GET)
    public String demoJooq() {
        //userDAO.buildNewUser("some_user_id");
        return "demoJooq";
    }

    @RequestMapping(path = "/demoJooq2", method = RequestMethod.GET)
    public boolean demoJooq2() {
        return userDAO.userExists("sdakjf38");
    }

    @RequestMapping(path = "/api/demoJooq", method = RequestMethod.GET)
    public String demoJooqAPI() {
        //userDAO.buildNewUser("some_user_id");
        return "demoJooqAPI";
    }

    @RequestMapping(path = "/exception")
    public String testException() {
        throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "demo exception"));
    }
}
