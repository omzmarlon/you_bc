package com.youbc.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebAppController {

    @RequestMapping(value={"", "/", "/classmates", "/profiles", "/classmates", "/friends", "/roommates"}, method = RequestMethod.GET)
    public String getClient() {
        return "index.html";
    }
}
