USE poke_you_bc;

INSERT INTO user(user_id, union_id, time_created)
VALUES ("some_id", "some_union_id", "2018-01-10");

INSERT INTO survey(survey_id, user_id, finished)
VALUES (1, 'some_id', 0);
