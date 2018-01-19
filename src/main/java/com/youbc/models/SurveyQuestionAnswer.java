package com.youbc.models;

public class SurveyQuestionAnswer {

    private Integer surveyID;
    private Integer questionID;
    private Integer answerID;
    private String answerContent;

    // default constructor
    public SurveyQuestionAnswer(){}

    // constructor
    public SurveyQuestionAnswer(Integer surveyID, Integer questionID, Integer answerID, String answerContent){
        this.surveyID = surveyID;
        this.questionID = questionID;
        this.answerID = answerID;
        this.answerContent = answerContent;
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

    public Integer getAnswerID() {
        return answerID;
    }

    public void setAnswerID(Integer answerID) {
        this.answerID = answerID;
    }

    public String getAnswerContent() {
        return answerContent;
    }

    public void setAnswerContent(String answerContent) {
        this.answerContent = answerContent;
    }
}
