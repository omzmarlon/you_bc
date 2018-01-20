CREATE TABLE user (
  user_id VARCHAR(100) CHARACTER SET utf8 PRIMARY KEY, # openID given from wechat. Unique inside Official account
  union_id VARCHAR(100) CHARACTER SET utf8, # UnionID from WeChat
  time_created DATETIME NOT NULL
);

# user verification table
CREATE TABLE student_verification (
  user_id VARCHAR(100) CHARACTER SET utf8 PRIMARY KEY,
  approved BOOLEAN NOT NULL,
  email VARCHAR(50) CHARACTER SET utf8,
  emailVerificationCode VARCHAR(100) CHARACTER SET utf8,
  studentID_image_url TEXT,
  location_lat DECIMAL(11, 8),
  location_lon DECIMAL(11, 8),
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

# user_profile tables
CREATE TABLE user_profile (
  user_id VARCHAR(100) CHARACTER SET utf8 PRIMARY KEY,
  age INT,
  sex INT, # 用户的性别，值为1时是男性，值为2时是女性
  wechatId VARCHAR(100) CHARACTER SET utf8,
  username VARCHAR(50) CHARACTER SET utf8,
  horoscope VARCHAR(10),
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE profile_image (
  profile_image_id INT PRIMARY KEY AUTO_INCREMENT,
  original_image_url TEXT,
  thumbnail_image_url TEXT,
  user_id VARCHAR(100) CHARACTER SET utf8,
  FOREIGN KEY (user_id) REFERENCES user_profile(user_id) ON DELETE CASCADE
);

# Roommates tables
CREATE TABLE roommates_locations (
  location VARCHAR(50) CHARACTER SET utf8 PRIMARY KEY
);

CREATE TABLE roommates_hometown (
  hometown VARCHAR(50) CHARACTER SET utf8 PRIMARY KEY
);

CREATE TABLE roommates_tags (
  tag VARCHAR(50) CHARACTER SET utf8 PRIMARY KEY
);

CREATE TABLE roommates_profile (
  user_id VARCHAR(100) CHARACTER SET utf8 PRIMARY KEY,
  location VARCHAR(50) CHARACTER SET utf8,
  hometown VARCHAR(50) CHARACTER SET utf8,
  motto VARCHAR(100) CHARACTER SET utf8,
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (location) REFERENCES roommates_locations(location) ON DELETE SET NULL,
  FOREIGN KEY (hometown) REFERENCES roommates_hometown(hometown) ON DELETE SET NULL
);

CREATE TABLE roommates_profile_tags (
  user_id VARCHAR(100) CHARACTER SET utf8,
  tag VARCHAR(50) CHARACTER SET utf8,
  PRIMARY KEY (user_id, tag),
  FOREIGN KEY (user_id) REFERENCES roommates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (tag) REFERENCES roommates_tags(tag) ON DELETE CASCADE
);

# Classmates tables
CREATE TABLE classmates_major (
  major VARCHAR(50) CHARACTER SET utf8 PRIMARY KEY
);

CREATE TABLE classmates_courses (
  course VARCHAR(50) CHARACTER SET utf8 PRIMARY KEY
);

CREATE TABLE classmates_tags (
  tag VARCHAR(50) CHARACTER SET utf8 PRIMARY KEY
);

CREATE TABLE classmates_profile (
  user_id VARCHAR(100) CHARACTER SET utf8 PRIMARY KEY,
  major VARCHAR(50) CHARACTER SET utf8,
  motto VARCHAR(100) CHARACTER SET utf8,
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (major) REFERENCES classmates_major(major) ON DELETE SET NULL
);

CREATE TABLE classmates_profile_courses (
  user_id VARCHAR(100) CHARACTER SET utf8,
  course VARCHAR(50) CHARACTER SET utf8,
  PRIMARY KEY (user_id, course),
  FOREIGN KEY (user_id) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (course) REFERENCES classmates_courses(course) on DELETE CASCADE
);

CREATE TABLE classmates_profile_tags (
  user_id VARCHAR(100) CHARACTER SET utf8,
  tag VARCHAR(50) CHARACTER SET utf8,
  PRIMARY KEY (user_id, tag),
  FOREIGN KEY (user_id) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (tag) REFERENCES classmates_tags(tag) ON DELETE CASCADE
);

# Friends tables
CREATE TABLE faculties (
  faculty VARCHAR(50) CHARACTER SET utf8 PRIMARY KEY
);

CREATE TABLE relationship_status (
  relationship VARCHAR(50) CHARACTER SET utf8 PRIMARY KEY
);

CREATE TABLE friends_tags (
  tag VARCHAR(50) CHARACTER SET utf8 PRIMARY KEY
);

CREATE TABLE friends_profile (
  user_id VARCHAR(100) CHARACTER SET utf8 PRIMARY KEY,
  faculty VARCHAR(50) CHARACTER SET utf8,
  relationship VARCHAR(50) CHARACTER SET utf8,
  motto VARCHAR(100) CHARACTER SET utf8,
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (faculty) REFERENCES faculties(faculty) ON DELETE SET NULL,
  FOREIGN KEY (relationship) REFERENCES relationship_status (relationship) ON DELETE SET NULL
);

CREATE TABLE friends_profile_tags (
  user_id VARCHAR(100) CHARACTER SET utf8,
  tag VARCHAR(50) CHARACTER SET utf8,
  PRIMARY KEY (user_id, tag),
  FOREIGN KEY (user_id) REFERENCES friends_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (tag) REFERENCES friends_tags(tag) ON DELETE CASCADE
);


# Likes & Dislikes
CREATE TABLE roommates_likes (
  liker VARCHAR(100) CHARACTER SET utf8,
  likee VARCHAR(100) CHARACTER SET utf8,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES roommates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES roommates_profile(user_id) ON DELETE CASCADE
);
CREATE TABLE roommates_dislikes (
  disliker VARCHAR(100) CHARACTER SET utf8,
  dislikee VARCHAR(100) CHARACTER SET utf8,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES roommates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES roommates_profile(user_id) ON DELETE CASCADE
);

CREATE TABLE classmates_likes(
  liker VARCHAR(100) CHARACTER SET utf8,
  likee VARCHAR(100) CHARACTER SET utf8,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES classmates_profile(user_id) ON DELETE CASCADE
);
CREATE TABLE classmates_dislikes(
  disliker VARCHAR(100) CHARACTER SET utf8,
  dislikee VARCHAR(100) CHARACTER SET utf8,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES classmates_profile(user_id) ON DELETE CASCADE
);

CREATE TABLE friends_likes (
  liker VARCHAR(100) CHARACTER SET utf8,
  likee VARCHAR(100) CHARACTER SET utf8,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES friends_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES friends_profile(user_id) ON DELETE CASCADE
);
CREATE TABLE friends_dislikes(
  disliker VARCHAR(100) CHARACTER SET utf8,
  dislikee VARCHAR(100) CHARACTER SET utf8,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES friends_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES friends_profile(user_id) ON DELETE CASCADE
);
