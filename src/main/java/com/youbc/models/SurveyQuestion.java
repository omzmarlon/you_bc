package com.youbc.models;

import java.util.List;

public class SurveyQuestion {

    private Integer surveyID;
    private Integer questionID;
    private String content;
    private List<SurveyQuestionAnswer> loa;

    // default constructor
    public SurveyQuestion(){}

    // constructor
    public SurveyQuestion(Integer surveyID, Integer questionID, String content){
        this.surveyID = surveyID;
        this.questionID = questionID;
        this.content = content;
    }

    public Integer getSurveyID() {
        return surveyID;
    }

    public void setSurveyID(Integer surveyID) {
        this.surveyID = surveyID;
    }

    public Integer getQuestionID() {
        return questionID;
    }

    public void setQuestionID(Integer questionID) {
        this.questionID = questionID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<SurveyQuestionAnswer> getLoa() {
        return loa;
    }

    public void setLoa(List<SurveyQuestionAnswer> loa) {
        this.loa = loa;
    }
}
