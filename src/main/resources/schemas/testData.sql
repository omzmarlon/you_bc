# mock data

INSERT INTO user VALUES ('cunjunwang1');
INSERT INTO user VALUES ('cunjunwang2');
INSERT INTO user VALUES ('cunjunwang3');
INSERT INTO user VALUES ('cunjunwang4');
INSERT INTO user VALUES ('cunjunwang5');

INSERT INTO survey VALUES (1, 'survey1');
INSERT INTO survey VALUES (2, 'survey2');
INSERT INTO survey VALUES (3, 'survey3');
INSERT INTO survey VALUES (4, 'survey3');

INSERT INTO question VALUES (1, 'question1');
INSERT INTO question VALUES (2, 'question2');
INSERT INTO question VALUES (3, 'question3');
INSERT INTO question VALUES (4, 'question4');
INSERT INTO question VALUES (5, 'question5');
INSERT INTO question VALUES (6, 'question6');

INSERT INTO offered_answer VALUES (1, 'answer1');
INSERT INTO offered_answer VALUES (2, 'answer2');
INSERT INTO offered_answer VALUES (3, 'answer3');
INSERT INTO offered_answer VALUES (4, 'answer4');
INSERT INTO offered_answer VALUES (5, 'answer5');
INSERT INTO offered_answer VALUES (6, 'answer6');


INSERT INTO survey_question VALUES (1,1);
INSERT INTO survey_question VALUES (1,3);
INSERT INTO survey_question VALUES (1,5);

INSERT INTO survey_question VALUES (2,2);
INSERT INTO survey_question VALUES (2,4);
INSERT INTO survey_question VALUES (2,6);

INSERT INTO survey_question VALUES (3,1);
INSERT INTO survey_question VALUES (3,2);
INSERT INTO survey_question VALUES (3,3);
INSERT INTO survey_question VALUES (3,6);

INSERT INTO survey_question VALUES (4,2);
INSERT INTO survey_question VALUES (4,4);
INSERT INTO survey_question VALUES (4,5);
INSERT INTO survey_question VALUES (4,6);


INSERT INTO survey_question_answer VALUES (1,1,1);
INSERT INTO survey_question_answer VALUES (1,1,2);
INSERT INTO survey_question_answer VALUES (1,1,3);
INSERT INTO survey_question_answer VALUES (1,3,1);
INSERT INTO survey_question_answer VALUES (1,3,2);
INSERT INTO survey_question_answer VALUES (1,3,3);
INSERT INTO survey_question_answer VALUES (1,5,1);
INSERT INTO survey_question_answer VALUES (1,5,2);
INSERT INTO survey_question_answer VALUES (1,5,3);

INSERT INTO survey_question_answer VALUES (2,2,1);
INSERT INTO survey_question_answer VALUES (2,2,3);
INSERT INTO survey_question_answer VALUES (2,2,5);
INSERT INTO survey_question_answer VALUES (2,4,2);
INSERT INTO survey_question_answer VALUES (2,4,4);
INSERT INTO survey_question_answer VALUES (2,4,5);
INSERT INTO survey_question_answer VALUES (2,6,4);
INSERT INTO survey_question_answer VALUES (2,6,5);
INSERT INTO survey_question_answer VALUES (2,6,6);

INSERT INTO survey_question_answer VALUES (3,1,1);
INSERT INTO survey_question_answer VALUES (3,1,2);
INSERT INTO survey_question_answer VALUES (3,1,3);
INSERT INTO survey_question_answer VALUES (3,1,4);
INSERT INTO survey_question_answer VALUES (3,2,1);
INSERT INTO survey_question_answer VALUES (3,2,2);
INSERT INTO survey_question_answer VALUES (3,2,3);
INSERT INTO survey_question_answer VALUES (3,2,4);
INSERT INTO survey_question_answer VALUES (3,2,5);
INSERT INTO survey_question_answer VALUES (3,3,1);
INSERT INTO survey_question_answer VALUES (3,3,2);
INSERT INTO survey_question_answer VALUES (3,6,2);
INSERT INTO survey_question_answer VALUES (3,6,5);

INSERT INTO survey_question_answer VALUES (4,2,1);
INSERT INTO survey_question_answer VALUES (4,2,4);
INSERT INTO survey_question_answer VALUES (4,4,2);
INSERT INTO survey_question_answer VALUES (4,4,3);
INSERT INTO survey_question_answer VALUES (4,5,2);
INSERT INTO survey_question_answer VALUES (4,5,4);
INSERT INTO survey_question_answer VALUES (4,5,6);
INSERT INTO survey_question_answer VALUES (4,6,1);
INSERT INTO survey_question_answer VALUES (4,6,5);
INSERT INTO survey_question_answer VALUES (4,6,6);

SELECT *
FROM survey_question_answer, offered_answer
WHERE survey_question_answer.survey_id = 1
      AND survey_question_answer.question_id = 1
      AND survey_question_answer.offered_answer_id = offered_answer.offered_answer_id;

SELECT question.question_id, question_content
FROM survey_question, question
WHERE survey_id = 1
      AND survey_question.question_ID = question.question_id;

SELECT *
FROM survey_question
WHERE survey_id=1;