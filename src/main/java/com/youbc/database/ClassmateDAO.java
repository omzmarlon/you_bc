package com.youbc.database;

import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static com.youbc.generated.schema.tables.ClassmatesCourses.CLASSMATES_COURSES;
import static com.youbc.generated.schema.tables.ClassmatesProfile.CLASSMATES_PROFILE;
import static com.youbc.generated.schema.tables.ClassmatesProfileCourses.CLASSMATES_PROFILE_COURSES;

@Component
public class ClassmateDAO {

    private DSLContext dslContext;

    @Autowired
    public ClassmateDAO(DSLContext dslContext) { this.dslContext = dslContext; }

    public void getrandomTenCandidates() {
//        dslContext
//                .select()
//                .from(CLASSMATES_PROFILE
//                        .join(CLASSMATES_PROFILE_COURSES
//                                .join(CLASSMATES_COURSES)
//                                .on(CLASSMATES_PROFILE_COURSES.COURSE_ID.eq(CLASSMATES_COURSES.COURSE_ID)))
//                )
    }
}
