# user_profile tables
CREATE TABLE user_profile (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE,
  password VARCHAR(100),
  sex INT, # 1 for male, 2 for female
  age INT,
  profile_image_url TEXT,
  wechatId VARCHAR(100), # TODO keep or remove
  horoscope VARCHAR(10) CHARACTER SET utf8mb4,
  matchCount INT, # workaround for new_match_notification: this is to record the number of matchedUsers the user saw last time
  time_created DATETIME NOT NULL
);

# user verification table
# TODO: keep or remove verification
CREATE TABLE student_verification (
  user_id INT PRIMARY KEY,
  approved BOOLEAN NOT NULL,
  email VARCHAR(50) UNIQUE,
  emailVerificationCode VARCHAR(100),
  studentID_image_url TEXT,
  location_lat DECIMAL(11, 8),
  location_lon DECIMAL(11, 8),
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_profile(user_id) ON DELETE CASCADE
);

# Roommates tables
CREATE TABLE roommates_locations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  location VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE
);

CREATE TABLE roommates_hometown (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hometown VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE
);

CREATE TABLE roommates_tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tag VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE
);

CREATE TABLE roommates_profile (
  user_id INT PRIMARY KEY,
  location VARCHAR(50) CHARACTER SET utf8mb4,
  hometown VARCHAR(50) CHARACTER SET utf8mb4,
  motto VARCHAR(100) CHARACTER SET utf8mb4,
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (location) REFERENCES roommates_locations(location) ON DELETE SET NULL,
  FOREIGN KEY (hometown) REFERENCES roommates_hometown(hometown) ON DELETE SET NULL
);

CREATE TABLE roommates_profile_tags (
  user_id INT,
  tag VARCHAR(50) CHARACTER SET utf8mb4,
  PRIMARY KEY (user_id, tag),
  FOREIGN KEY (user_id) REFERENCES roommates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (tag) REFERENCES roommates_tags(tag) ON DELETE CASCADE
);

# Classmates tables
CREATE TABLE classmates_major (
  id INT PRIMARY KEY AUTO_INCREMENT,
  major VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE
);

CREATE TABLE classmates_courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE
);

CREATE TABLE classmates_tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tag VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE
);

CREATE TABLE classmates_profile (
  user_id INT PRIMARY KEY,
  major VARCHAR(50) CHARACTER SET utf8mb4,
  motto VARCHAR(100) CHARACTER SET utf8mb4,
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (major) REFERENCES classmates_major(major) ON DELETE SET NULL
);

CREATE TABLE classmates_profile_courses (
  user_id INT,
  course VARCHAR(50) CHARACTER SET utf8mb4,
  PRIMARY KEY (user_id, course),
  FOREIGN KEY (user_id) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (course) REFERENCES classmates_courses(course) on DELETE CASCADE
);

CREATE TABLE classmates_profile_tags (
  user_id INT,
  tag VARCHAR(50) CHARACTER SET utf8mb4,
  PRIMARY KEY (user_id, tag),
  FOREIGN KEY (user_id) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (tag) REFERENCES classmates_tags(tag) ON DELETE CASCADE
);

# Friends tables
CREATE TABLE faculties (
  id INT PRIMARY KEY AUTO_INCREMENT,
  faculty VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE
);

CREATE TABLE relationship_status (
  id INT PRIMARY KEY AUTO_INCREMENT,
  relationship VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE
);

CREATE TABLE friends_tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tag VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE
);

CREATE TABLE friends_profile (
  user_id INT PRIMARY KEY,
  faculty VARCHAR(50) CHARACTER SET utf8mb4,
  relationship VARCHAR(50) CHARACTER SET utf8mb4,
  motto VARCHAR(100) CHARACTER SET utf8mb4,
  time_created DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (faculty) REFERENCES faculties(faculty) ON DELETE SET NULL,
  FOREIGN KEY (relationship) REFERENCES relationship_status (relationship) ON DELETE SET NULL
);

CREATE TABLE friends_profile_tags (
  user_id INT,
  tag VARCHAR(50) CHARACTER SET utf8mb4,
  PRIMARY KEY (user_id, tag),
  FOREIGN KEY (user_id) REFERENCES friends_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (tag) REFERENCES friends_tags(tag) ON DELETE CASCADE
);


# Likes & Dislikes
CREATE TABLE roommates_likes (
  liker INT,
  likee INT,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES roommates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES roommates_profile(user_id) ON DELETE CASCADE
);
CREATE TABLE roommates_dislikes (
  disliker INT,
  dislikee INT,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES roommates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES roommates_profile(user_id) ON DELETE CASCADE
);

CREATE TABLE classmates_likes(
  liker INT,
  likee INT,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES classmates_profile(user_id) ON DELETE CASCADE
);
CREATE TABLE classmates_dislikes(
  disliker INT,
  dislikee INT,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES classmates_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES classmates_profile(user_id) ON DELETE CASCADE
);

CREATE TABLE friends_likes (
  liker INT,
  likee INT,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (liker, likee),
  FOREIGN KEY (liker) REFERENCES friends_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (likee) REFERENCES friends_profile(user_id) ON DELETE CASCADE
);
CREATE TABLE friends_dislikes(
  disliker INT,
  dislikee INT,
  time_created DATETIME NOT NULL,
  PRIMARY KEY (disliker, dislikee),
  FOREIGN KEY (disliker) REFERENCES friends_profile(user_id) ON DELETE CASCADE,
  FOREIGN KEY (dislikee) REFERENCES friends_profile(user_id) ON DELETE CASCADE
);

