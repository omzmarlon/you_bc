package com.youbc.database;

import com.youbc.models.Survey;
import com.youbc.models.SurveyQuestion;
import com.youbc.models.SurveyQuestionAnswer;
import org.jooq.*;

import static com.youbc.generated.schema.Tables.SURVEY_QUESTION_ANSWER;
import static com.youbc.generated.schema.tables.Survey.SURVEY;
import static com.youbc.generated.schema.tables.Question.QUESTION;
import static com.youbc.generated.schema.tables.SurveyQuestion.SURVEY_QUESTION;
import static com.youbc.generated.schema.tables.OfferedAnswer.OFFERED_ANSWER;
import static com.youbc.generated.schema.tables.UserAnswer.USER_ANSWER;

import org.jooq.tools.json.JSONArray;
import org.jooq.tools.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.*;

@Component
public class SurveyDAO {

    private DSLContext dslContext;

    @Autowired
    public SurveyDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    // check if survey with ID survey_ID exists in database.
    public boolean surveyExists(int survey_ID) {
        Result<Record> result = dslContext
                .select()
                .from(SURVEY)
                .where(SURVEY.SURVEY_ID.eq(survey_ID))
                .fetch();
        return result.isNotEmpty();
    }

    public Survey getSurvey(int surveyID) {
        Result<Record> result = dslContext
                .select()
                .from(SURVEY)
                .where(SURVEY.SURVEY_ID.eq(surveyID))
                .fetch();

        Survey survey = new Survey();
        // set survey description
        for (Record record : result) {
            String surveyDescription = record.getValue(SURVEY.SURVEY_DESCRIPTION);
            survey.setSurveyDescription(surveyDescription);
        }
        // set questions for this survey
        List<SurveyQuestion> loq = getLoq(surveyID);
        survey.setLoq(loq);
        return survey;
    }

    public List<SurveyQuestion> getLoq(int surveyID) {
        Result<Record2<Integer, String>> result = dslContext
                .select(QUESTION.QUESTION_ID, QUESTION.QUESTION_CONTENT)
                .from(SURVEY_QUESTION, QUESTION)
                .where(SURVEY_QUESTION.SURVEY_ID.eq(surveyID))
                .and(SURVEY_QUESTION.QUESTION_ID.eq(QUESTION.QUESTION_ID))
                .fetch();

        List<SurveyQuestion> loq = new ArrayList<SurveyQuestion>();

        for (Record record : result) {
            SurveyQuestion surveyQuestion = new SurveyQuestion();
            surveyQuestion.setSurveyID(surveyID);

            int questionID = record.getValue(QUESTION.QUESTION_ID);
            String questionContent = record.getValue(QUESTION.QUESTION_CONTENT);

            surveyQuestion.setQuestionID(questionID);
            surveyQuestion.setContent(questionContent);

            List<SurveyQuestionAnswer> loa = getLoa(surveyID, questionID);
            surveyQuestion.setLoa(loa);
            loq.add(surveyQuestion);
        }

        return loq;
    }

    public List<SurveyQuestionAnswer> getLoa(int surveyID, int questionID) {
        Result<Record2<Integer, String>> result = dslContext
                .select(SURVEY_QUESTION_ANSWER.OFFERED_ANSWER_ID, OFFERED_ANSWER.ANSWER_CONTENT)
                .from(SURVEY_QUESTION_ANSWER, OFFERED_ANSWER)
                .where(SURVEY_QUESTION_ANSWER.SURVEY_ID.eq(surveyID))
                .and(SURVEY_QUESTION_ANSWER.QUESTION_ID.eq(questionID))
                .and(SURVEY_QUESTION_ANSWER.OFFERED_ANSWER_ID.eq(OFFERED_ANSWER.OFFERED_ANSWER_ID))
                .fetch();

        List<SurveyQuestionAnswer> loa = new ArrayList<>();

        for (Record record : result) {
            SurveyQuestionAnswer surveyQuestionAnswer = new SurveyQuestionAnswer();
            surveyQuestionAnswer.setSurveyID(surveyID);
            surveyQuestionAnswer.setQuestionID(questionID);

            int answerID = record.getValue(SURVEY_QUESTION_ANSWER.OFFERED_ANSWER_ID);
            String answerContent = record.getValue(OFFERED_ANSWER.ANSWER_CONTENT);
            surveyQuestionAnswer.setAnswerID(answerID);
            surveyQuestionAnswer.setAnswerContent(answerContent);
            loa.add(surveyQuestionAnswer);
        }

        return loa;
    }

    public void getUserAnswersIDForSurvey(String userID, int surveyID) {

//        SELECT *
//        FROM user_answer, offered_answer
//        WHERE user_id = 'cunjunwang1'
//        AND survey_id = 1
//        AND offered_answer.offered_answer_id = user_answer.offered_answer_id;

        Result<Record> result = dslContext
                .select()
                .from(USER_ANSWER, OFFERED_ANSWER)
                .where(USER_ANSWER.USER_ID.eq(userID))
                .and(USER_ANSWER.SURVEY_ID.eq(surveyID))
                .fetch();

        JSONObject surveyAnswersObj = new JSONObject();

        for (Record record : result) {
            String questionID = record.get(USER_ANSWER.QUESTION_ID).toString();
            int answerID = record.get(USER_ANSWER.OFFERED_ANSWER_ID);
            if (!surveyAnswersObj.containsKey(questionID)) {
                surveyAnswersObj.put(questionID, answerID);
            } else {
                if (!(surveyAnswersObj.get(questionID) instanceof JSONArray)) {
                    JSONArray array = new JSONArray();
                    array.add(surveyAnswersObj.get(questionID));
                    array.add(answerID);
                }
                else{
                    ((JSONArray) surveyAnswersObj.get(questionID)).add(answerID);
                }
            }
        }
    }

    public void fillQuestion(String userID, Survey survey, SurveyQuestion surveyQuestion,
                             SurveyQuestionAnswer surveyQuestionAnswer) {
        int surveyID = survey.getSurveyID();
        int questionID = surveyQuestion.getQuestionID();
        int answerID = surveyQuestionAnswer.getAnswerID();
        dslContext
                .insertInto(USER_ANSWER)
                .set(USER_ANSWER.USER_ID, userID)
                .set(USER_ANSWER.SURVEY_ID, surveyID)
                .set(USER_ANSWER.QUESTION_ID, questionID)
                .set(USER_ANSWER.OFFERED_ANSWER_ID, answerID)
                .execute();
    }

    public void fillSurvey(String userID, Survey survey, SurveyQuestionAnswer selectedAnswer) {
        int surveyID = survey.getSurveyID();
        if (surveyExists(surveyID)) {
            List<SurveyQuestion> loq = survey.getLoq();
            for (SurveyQuestion surveyQuestion : loq) {
                fillQuestion(userID, survey, surveyQuestion, selectedAnswer);
            }
        }
    }
}
