package com.youbc.controllers;

import com.youbc.database.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping(path = "/api/demoJooq", method = RequestMethod.GET)
    public String demoJooqAPI() {
        //userDAO.buildNewUser("some_user_id");
        return "demoJooqAPI";
    }
}
