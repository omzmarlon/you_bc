package com.youbc.controllers.protected_api;

import com.youbc.database.UserDAO;
import com.youbc.pooling.UserPoolManager;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassmatesController {

    private UserPoolManager userPoolManager;
    private UserDAO userDAO;

//    public ClassmatesController(UserPoolManager userPoolManager, UserDAO userDAO) {
//        this.userPoolManager = userPoolManager;
//        this.userDAO = userDAO;
//    }


}