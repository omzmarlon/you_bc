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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SurveyDAO {

    private DSLContext dslContext;

    @Autowired
    public SurveyDAO(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    // check if survey with ID survey_ID exists in database.
    public boolean surveyExists(Integer survey_ID) {
        Result<Record> result = dslContext
                .select()
                .from(SURVEY)
                .where(SURVEY.SURVEY_ID.eq(survey_ID))
                .fetch();
        return result.isNotEmpty();
    }


    // build a new survey
    public void initSurvey(Integer survey_ID){
        dslContext
                .insertInto(SURVEY)
                .set(SURVEY.SURVEY_ID, survey_ID)
                .execute();
    }

    // build a new question with ID question_ID.
    public void initQuestion(Integer question_ID, String content) {
        dslContext
                .insertInto(QUESTION)
                .set(QUESTION.QUESTION_ID, question_ID)
                .set(QUESTION.QUESTION_CONTENT, content)
                .execute();
    }

    // build a new question belongs to survey with ID survey_ID and question ID question_ID
    public void initSurveyQuestion(Integer survey_ID, Integer question_ID) {
        dslContext
                .insertInto(SURVEY_QUESTION)
                .set(SURVEY_QUESTION.SURVEY_ID, survey_ID)
                .set(SURVEY_QUESTION.QUESTION_ID, question_ID)
                .execute();
    }

    // build a new selection to some questions
    public void initOfferedAnswer(Integer offered_answer_ID, String content) {
        dslContext
                .insertInto(OFFERED_ANSWER)
                .set(OFFERED_ANSWER.OFFERED_ANSWER_ID, offered_answer_ID)
                .set(OFFERED_ANSWER.ANSWER_CONTENT, content)
                .execute();
    }

    // build user answer
    public void userAnswer(String user_ID, Integer survey_ID, Integer question_ID, Integer offered_answer_ID) {
        dslContext
                .insertInto(USER_ANSWER)
                .set(USER_ANSWER.USER_ID, user_ID)
                .set(USER_ANSWER.SURVEY_ID, survey_ID)
                .set(USER_ANSWER.QUESTION_ID, question_ID)
                .set(USER_ANSWER.OFFERED_ANSWER_ID, offered_answer_ID)
                .execute();
    }

    public Survey getSurvey(Integer surveyID){
        Result<Record> result = dslContext
                .select()
                .from(SURVEY)
                .where(SURVEY.SURVEY_ID.eq(surveyID))
                .fetch();

        Survey survey = new Survey();

        survey.setSurveyID(surveyID);

        String surveyDescription = result.getValue(1, SURVEY.SURVEY_DESCRIPTION);
        survey.setSurveyDescription(surveyDescription);

        List<SurveyQuestion> loq = getLoq(surveyID);
        survey.setLoq(loq);

        return survey;
    }

    public List<SurveyQuestion> getLoq(Integer surveyID){
        Result<Record2<Integer, String>> result = dslContext
                .select(QUESTION.QUESTION_ID, QUESTION.QUESTION_CONTENT)
                .from(SURVEY_QUESTION, QUESTION)
                .where(SURVEY_QUESTION.SURVEY_ID.eq(surveyID))
                .and(SURVEY_QUESTION.QUESTION_ID.eq(QUESTION.QUESTION_ID))
                .fetch();

        List<SurveyQuestion> loq = new ArrayList<SurveyQuestion>();

        for(Record record : result){
            SurveyQuestion surveyQuestion = new SurveyQuestion();
            surveyQuestion.setSurveyID(surveyID);

            Integer questionID = record.getValue(QUESTION.QUESTION_ID);
            String questionContent = record.getValue(QUESTION.QUESTION_CONTENT);

            surveyQuestion.setQuestionID(questionID);
            surveyQuestion.setContent(questionContent);

            List<SurveyQuestionAnswer> loa = getLoa(surveyID, questionID);
            surveyQuestion.setLoa(loa);
            loq.add(surveyQuestion);
        }

        return loq;
    }

    public List<SurveyQuestionAnswer> getLoa(Integer surveyID, Integer questionID){
        Result<Record2<Integer, String>> result = dslContext
                .select(SURVEY_QUESTION_ANSWER.OFFERED_ANSWER_ID,OFFERED_ANSWER.ANSWER_CONTENT)
                .from(SURVEY_QUESTION_ANSWER, OFFERED_ANSWER)
                .where(SURVEY_QUESTION_ANSWER.SURVEY_ID.eq(surveyID))
                .and(SURVEY_QUESTION_ANSWER.QUESTION_ID.eq(questionID))
                .and(SURVEY_QUESTION_ANSWER.OFFERED_ANSWER_ID.eq(OFFERED_ANSWER.OFFERED_ANSWER_ID))
                .fetch();

        List<SurveyQuestionAnswer> loa = new ArrayList<>();

        for(Record record : result){
            SurveyQuestionAnswer surveyQuestionAnswer = new SurveyQuestionAnswer();
            surveyQuestionAnswer.setSurveyID(surveyID);
            surveyQuestionAnswer.setQuestionID(questionID);

            Integer answerID = record.getValue(SURVEY_QUESTION_ANSWER.OFFERED_ANSWER_ID);
            String answerContent = record.getValue(OFFERED_ANSWER.ANSWER_CONTENT);
            surveyQuestionAnswer.setAnswerID(answerID);
            surveyQuestionAnswer.setAnswerContent(answerContent);
            loa.add(surveyQuestionAnswer);
        }

        return loa;
    }

    public void fillQuestion(){
        
    }
}
