package com.youbc.controllers;

import com.youbc.database.SurveyDAO;
import static com.youbc.generated.schema.tables.Survey.SURVEY;
import static com.youbc.generated.schema.tables.Answer.ANSWER;
import static com.youbc.generated.schema.tables.Question.QUESTION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SurveyController {
    private SurveyDAO surveyDAO;

    @Autowired
    public SurveyController(SurveyDAO surveyDAO) {
        this.surveyDAO = surveyDAO;
    }

    public void fillSurvey(Integer survey_ID, String user_ID){
        if(!surveyDAO.surveyExists(survey_ID, user_ID)) {
            surveyDAO.buildNewSurvey(survey_ID, user_ID);

        }
    }
}