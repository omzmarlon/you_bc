package com.youbc.services;

import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import org.jooq.ExecuteContext;
import org.jooq.impl.DefaultExecuteListener;
import org.springframework.http.HttpStatus;

public class JooqExecutionListener extends DefaultExecuteListener {
    /*
    * Other things to override during jooq execution
    * */
    @Override
    public void exception(ExecuteContext context) {
        context.exception(
                new YouBCException(new YouBCError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Database Error",
                        context.sqlException().getMessage()
                ))
        );
    }
}
