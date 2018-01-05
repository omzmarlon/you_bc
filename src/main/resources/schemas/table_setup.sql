CREATE TABLE user (
  user_id VARCHAR(100) PRIMARY KEY, # openID given from wechat. Unique inside Official account
  union_id VARCHAR(100), # UnionID from WeChat
  time_created DATETIME NOT NULL
);

# user verification table
CREATE TABLE ubc_student_verification (
  user_id VARCHAR(100) PRIMARY KEY,
  approved TINYINT(1),
  email VARCHAR(50),
  studentID_image_url VARCHAR(100),
  location_lat DECIMAL(11, 8),
  location_lon DECIMAL(11, 8),
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

# user_profile tables
CREATE TABLE user_profile (
  user_id VARCHAR(100) PRIMARY KEY,
  age INT,
  sex INT,
  horoscope VARCHAR(10),
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE profile_image (
  profile_image_id INT PRIMARY KEY AUTO_INCREMENT,
  original_image_url VARCHAR(10),
  thumbnail_image_url VARCHAR(10),
  user_id VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES user_profile(user_id) ON DELETE CASCADE
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
  user_id VARCHAR(100) PRIMARY KEY,
  location_id INT,
  hometown_id INT,
  motto VARCHAR(100),
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (location_id) REFERENCES roommates_locations(location_id) ON DELETE SET NULL,
  FOREIGN KEY (hometown_id) REFERENCES roommates_hometown(hometown_id) ON DELETE SET NULL
);

CREATE TABLE roommates_profile_tags (
  user_id VARCHAR(100),
  tag_id INT,
  PRIMARY KEY (user_id, tag_id),
  FOREIGN KEY (user_id) REFERENCES roommates_profile(user_id) ON DELETE CASCADE,
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
  user_id VARCHAR(100) PRIMARY KEY,
  marjor_id INT,
  motto VARCHAR(100),
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (marjor_id) REFERENCES classmates_major(major_id) ON DELETE SET NULL
);

CREATE TABLE classmates_profile_courses (
  user_id VARCHAR(100),
  course_id INT,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES classmates_courses(course_id) on DELETE CASCADE
);

CREATE TABLE classmates_profile_tags (
  user_id VARCHAR(100),
  tag_id INT,
  PRIMARY KEY (user_id, tag_id),
  FOREIGN KEY (user_id) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
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
  user_id VARCHAR(100) PRIMARY KEY,
  faculty_id INT,
  relationship_id INT,
  motto VARCHAR(100),
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id) ON DELETE SET NULL,
  FOREIGN KEY (relationship_id) REFERENCES relationship_status (relationship_id) ON DELETE SET NULL
);

CREATE TABLE friends_profile_tags (
  user_id VARCHAR(100),
  tag_id INT,
  PRIMARY KEY (user_id, tag_id),
  FOREIGN KEY (user_id) REFERENCES friends_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES friends_tags(tag_id) ON DELETE CASCADE
);


# Likes & Dislikes
CREATE TABLE roommates_likes (
  liker VARCHAR(100),
  likee VARCHAR(100),
  time_created DATETIME NOT NULL,
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES roommates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES roommates_profile(user_id) ON DELETE CASCADE
);
CREATE TABLE roommates_dislikes (
  disliker VARCHAR(100),
  dislikee VARCHAR(100),
  time_created DATETIME NOT NULL,
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES roommates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES roommates_profile(user_id) ON DELETE CASCADE
);

CREATE TABLE classmates_likes(
  liker VARCHAR(100),
  likee VARCHAR(100),
  time_created DATETIME NOT NULL,
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES classmates_profile(user_id) ON DELETE CASCADE
);
CREATE TABLE classmates_dislikes(
  disliker VARCHAR(100),
  dislikee VARCHAR(100),
  time_created DATETIME NOT NULL,
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES classmates_profile(user_id) ON DELETE CASCADE
);

CREATE TABLE friends_likes (
  liker VARCHAR(100),
  likee VARCHAR(100),
  time_created DATETIME NOT NULL,
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES friends_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES friends_profile(user_id) ON DELETE CASCADE
);
CREATE TABLE friends_dislikes(
  disliker VARCHAR(100),
  dislikee VARCHAR(100),
  time_created DATETIME NOT NULL,
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES friends_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES friends_profile(user_id) ON DELETE CASCADE
);
