CREATE TABLE survey(
  survey_id INT PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  finished BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE question (
  question_id INT,
  question_content VARCHAR(200),
  answered BOOLEAN,
  selected_answer CHAR,
  survey_id INT,
  PRIMARY KEY (question_id,survey_id),
  FOREIGN KEY (survey_id) REFERENCES survey(survey_id)
);

CREATE TABLE answer (
  answer_id INT,
  answer_content VARCHAR(100),
  question_id INT,
  survey_id INT,
  user_id VARCHAR(100),
  PRIMARY KEY (answer_id, question_id, survey_id),
  FOREIGN KEY (question_id) REFERENCES question(question_id),
  FOREIGN KEY (survey_id) REFERENCES survey(survey_id)
);