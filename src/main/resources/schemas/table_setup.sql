CREATE TABLE user (
  wechat_token VARCHAR(100) PRIMARY KEY # hashed wechat id from WeChat
);

# user verification table
CREATE TABLE ubc_student_verification (
  wechat_token VARCHAR(100) PRIMARY KEY,
  approved TINYINT(1),
  email VARCHAR(50),
  studentID_image_url VARCHAR(100),
  location_lat DECIMAL(11, 8),
  location_lon DECIMAL(11, 8),
  FOREIGN KEY (wechat_token) REFERENCES user(wechat_token) ON DELETE CASCADE
);

# user_profile tables
CREATE TABLE user_profile (
  wechat_token VARCHAR(100) PRIMARY KEY,
  age INT,
  sex INT,
  horoscope VARCHAR(10),
  profile_image_url VARCHAR(100),
  FOREIGN KEY (wechat_token) REFERENCES user(wechat_token) ON DELETE CASCADE
);

# Roommates tables
CREATE TABLE roommates_locations (
  location_id INT PRIMARY KEY AUTO_INCREMENT,
  location VARCHAR(50)
);

CREATE TABLE roommates_hometown (
  hometown_id INT PRIMARY KEY  AUTO_INCREMENT,
  hometwon VARCHAR(50)
);

CREATE TABLE roommates_tags (
  tag_id INT PRIMARY KEY AUTO_INCREMENT,
  tag VARCHAR(50)
);

CREATE TABLE roommates_profile (
  wechat_token VARCHAR(100) PRIMARY KEY,
  location_id INT,
  hometown_id INT,
  motto VARCHAR(100),
  FOREIGN KEY (wechat_token) REFERENCES user(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (location_id) REFERENCES roommates_locations(location_id) ON DELETE SET NULL,
  FOREIGN KEY (hometown_id) REFERENCES roommates_hometown(hometown_id) ON DELETE SET NULL
);

CREATE TABLE roommates_profile_tags (
  wechat_token VARCHAR(100),
  tag_id INT,
  PRIMARY KEY (wechat_token, tag_id),
  FOREIGN KEY (wechat_token) REFERENCES roommates_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES roommates_tags(tag_id) ON DELETE CASCADE
);

# Classmates tables
CREATE TABLE classmates_major (
  major_id INT PRIMARY KEY AUTO_INCREMENT,
  major VARCHAR(50)
);

CREATE TABLE classmates_courses (
  course_id INT PRIMARY KEY AUTO_INCREMENT,
  course_name VARCHAR(50)
);

CREATE TABLE classmates_tags (
  tag_id INT PRIMARY KEY AUTO_INCREMENT,
  tag VARCHAR(50)
);

CREATE TABLE classmates_profile (
  wechat_token VARCHAR(100) PRIMARY KEY,
  marjor_id INT,
  motto VARCHAR(100),
  FOREIGN KEY (wechat_token) REFERENCES user(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (marjor_id) REFERENCES classmates_major(major_id) ON DELETE SET NULL
);

CREATE TABLE classmates_profile_courses (
  wechat_token VARCHAR(100),
  course_id INT,
  PRIMARY KEY (wechat_token, course_id),
  FOREIGN KEY (wechat_token) REFERENCES classmates_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES classmates_courses(course_id) on DELETE CASCADE
);

CREATE TABLE classmates_profile_tags (
  wechat_token VARCHAR(100),
  tag_id INT,
  PRIMARY KEY (wechat_token, tag_id),
  FOREIGN KEY (wechat_token) REFERENCES classmates_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES classmates_tags(tag_id) ON DELETE CASCADE
);

# Friends tables
CREATE TABLE faculties (
  faculty_id INT PRIMARY KEY AUTO_INCREMENT,
  faculty VARCHAR(50)
);

CREATE TABLE relationship_status (
  relationship_id INT PRIMARY KEY AUTO_INCREMENT,
  relationship VARCHAR(50)
);

CREATE TABLE friends_tags (
  tag_id INT PRIMARY KEY AUTO_INCREMENT,
  tag VARCHAR(50)
);

CREATE TABLE friends_profile (
  wechat_token VARCHAR(100) PRIMARY KEY,
  faculty_id INT,
  relationship_id INT,
  motto VARCHAR(100),
  FOREIGN KEY (wechat_token) REFERENCES classmates_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id) ON DELETE SET NULL,
  FOREIGN KEY (relationship_id) REFERENCES relationship_status (relationship_id) ON DELETE SET NULL
);

CREATE TABLE friends_profile_tags (
  wechat_token VARCHAR(100),
  tag_id INT,
  PRIMARY KEY (wechat_token, tag_id),
  FOREIGN KEY (wechat_token) REFERENCES friends_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES friends_tags(tag_id) ON DELETE CASCADE
);


# Likes & Dislikes
CREATE TABLE roommates_likes (
  liker VARCHAR(100),
  likee VARCHAR(100),
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES roommates_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES roommates_profile(wechat_token) ON DELETE CASCADE
);
CREATE TABLE roommates_dislikes (
  disliker VARCHAR(100),
  dislikee VARCHAR(100),
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES roommates_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES roommates_profile(wechat_token) ON DELETE CASCADE
);

CREATE TABLE classmates_likes(
  liker VARCHAR(100),
  likee VARCHAR(100),
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES classmates_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES classmates_profile(wechat_token) ON DELETE CASCADE
);
CREATE TABLE classmates_dislikes(
  disliker VARCHAR(100),
  dislikee VARCHAR(100),
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES classmates_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES classmates_profile(wechat_token) ON DELETE CASCADE
);

CREATE TABLE friends_likes (
  liker VARCHAR(100),
  likee VARCHAR(100),
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES friends_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES friends_profile(wechat_token) ON DELETE CASCADE
);
CREATE TABLE friends_dislikes(
  disliker VARCHAR(100),
  dislikee VARCHAR(100),
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES friends_profile(wechat_token) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES friends_profile(wechat_token) ON DELETE CASCADE
);
