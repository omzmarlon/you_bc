package com.pokecabin.utils;

import org.jooq.ExecuteContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DefaultExecuteListener;
import org.springframework.jdbc.support.SQLErrorCodeSQLExceptionTranslator;
import org.springframework.jdbc.support.SQLExceptionTranslator;

public class JooqExecutionListener extends DefaultExecuteListener {
    /*
    * Other things to override during jooq execution
    * */
    @Override
    public void exception(ExecuteContext context) {
        //We SHOULD HAVE this translator because SpringFramework has more detailed/meaningful exceptions
        SQLDialect dialect = context.configuration().dialect();
        SQLExceptionTranslator translator
                = new SQLErrorCodeSQLExceptionTranslator(dialect.name());
        context.exception(
                translator.translate(
                        "Accessing database using jOOQ",
                        context.sql(), context.sqlException()
                )
        );
    }
}
