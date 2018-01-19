CREATE TABLE survey (
  survey_id          INT PRIMARY KEY,
  survey_description VARCHAR(200)
);

CREATE TABLE question (
  question_id      INT PRIMARY KEY,
  question_content VARCHAR(200)
);

CREATE TABLE survey_question (
  survey_ID   INT,
  question_ID INT,
  PRIMARY KEY (survey_ID, question_ID),
  FOREIGN KEY (survey_ID) REFERENCES survey (survey_id),
  FOREIGN KEY (question_ID) REFERENCES question (question_ID)
);

CREATE TABLE offered_answer (
  offered_answer_id INT PRIMARY KEY,
  answer_content    VARCHAR(200)
);

CREATE TABLE survey_question_answer (
  survey_id         INT,
  question_id       INT,
  offered_answer_id INT,
  PRIMARY KEY (survey_id, question_id, offered_answer_id),
  FOREIGN KEY (survey_id, question_id) REFERENCES survey_question(survey_ID, question_ID),
  FOREIGN KEY (survey_id) REFERENCES survey (survey_id),
  FOREIGN KEY (question_id) REFERENCES question (question_id),
  FOREIGN KEY (offered_answer_id) REFERENCES offered_answer (offered_answer_id)
);

CREATE TABLE user_answer (
  survey_id         INT,
  question_id       INT,
  user_id           VARCHAR(100),
  offered_answer_id INT,
  PRIMARY KEY (survey_id, question_id, user_id, offered_answer_id),

  FOREIGN KEY (survey_id, question_id, offered_answer_id)
  REFERENCES survey_question_answer(survey_id, question_id, offered_answer_id),
  FOREIGN KEY (user_id) REFERENCES user (user_id),
  FOREIGN KEY (survey_id) REFERENCES survey (survey_id),
  FOREIGN KEY (question_id) REFERENCES question (question_id),
  FOREIGN KEY (offered_answer_id) REFERENCES offered_answer (offered_answer_id)
);