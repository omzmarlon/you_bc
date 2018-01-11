package com.youbc.database;

import org.jooq.*;

import static com.youbc.generated.schema.tables.Survey.SURVEY;
import static com.youbc.generated.schema.tables.Answer.ANSWER;
import static com.youbc.generated.schema.tables.Question.QUESTION;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SurveyDAO {

    private DSLContext dslContext;

    @Autowired
    public SurveyDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public boolean surveyExists(Integer survey_ID, String user_ID) {
        Result<Record2<Integer, String>> result = dslContext
                .select(SURVEY.SURVEY_ID, SURVEY.USER_ID)
                .from(SURVEY)
                .where(SURVEY.SURVEY_ID.eq(survey_ID))
                .and(SURVEY.USER_ID.eq(user_ID))
                .fetch();
        return result.isEmpty();
    }

    public void buildNewSurvey(Integer survey_ID, String user_ID) {
        initAnswer(survey_ID);
        initQuestion(survey_ID);
        initSurvey(survey_ID, user_ID);
    }

    private void initAnswer(Integer survey_ID) {
        dslContext
                .insertInto(ANSWER)
                .set(ANSWER.SURVEY_ID, survey_ID)
                .execute();
    }

    public void buildAnswer(String answer_content){
        dslContext
                .update(ANSWER)
                .set(ANSWER.ANSWER_CONTENT, answer_content)
                .execute();
    }

    private void initQuestion(Integer survey_ID) {
        dslContext.insertInto(QUESTION)
                .set(QUESTION.SURVEY_ID, survey_ID)
                .set(QUESTION.ANSWERED, (byte)0)
                .execute();
    }

    public void buildQuestion(String question_content){
        dslContext
                .update(QUESTION)
                .set(QUESTION.QUESTION_CONTENT, question_content)
                .execute();
    }

    public void selectAnswer(Integer question_ID, String choice){
        dslContext
                .update(QUESTION)
                .set(QUESTION.SELECTED_ANSWER, choice)
                .where(QUESTION.QUESTION_ID.eq(question_ID))
                .execute();
    }

    private void initSurvey(Integer survey_ID, String user_ID) {
        dslContext
                .insertInto(SURVEY)
                .set(SURVEY.SURVEY_ID, survey_ID)
                .set(SURVEY.USER_ID, user_ID)
                .set(SURVEY.FINISHED, (byte)0)
                .execute();
    }

    public Result surveyFinishedByUser(String user_ID) {
        Result<Record1<Integer>> result = dslContext
                .select(SURVEY.SURVEY_ID)
                .from(SURVEY)
                .where(SURVEY.USER_ID.eq(user_ID))
                .and(SURVEY.FINISHED.eq((byte) 1))
                .fetch();
        return result;
    }

    public boolean whetherUserFinishesSurvey(Integer survey_ID, String user_ID){
        return surveyFinishedByUser(user_ID).contains(survey_ID);
    }

    
}
