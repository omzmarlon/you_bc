package com.youbc.models;

import com.youbc.database.SurveyDAO;

import java.util.List;

public class Survey {

    public SurveyDAO surveyDAO;

    private int surveyID;
    private String surveyDescription;
    private List<SurveyQuestion> loq;

    // default constructor
    public Survey(){}

    // constructor
    public Survey(Integer surveyID, String surveyDescription, List<SurveyQuestion> loq){
        this.surveyID = surveyID;
        this.surveyDescription = surveyDescription;
        this.loq = loq;
    }

    public int getSurveyID() {
        return surveyID;
    }

    public void setSurveyID(int surveyID) {
        this.surveyID = surveyID;
    }

    public String getSurveyDescription() {
        return surveyDescription;
    }

    public void setSurveyDescription(String surveyDescription) {
        this.surveyDescription = surveyDescription;
    }

    public List<SurveyQuestion> getLoq() {
        return loq;
    }

    public void setLoq(List<SurveyQuestion> loq) {
        this.loq = loq;
    }
}
