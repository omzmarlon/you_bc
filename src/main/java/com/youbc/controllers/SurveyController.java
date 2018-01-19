package com.youbc.controllers;

import com.youbc.database.SurveyDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SurveyController {
    private SurveyDAO surveyDAO;

    @Autowired
    public SurveyController(SurveyDAO surveyDAO) {
        this.surveyDAO = surveyDAO;
    }

}