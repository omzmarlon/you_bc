package com.youbc.securities.filters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Handles all exceptions thrown from filter chain
 */
public class SecurityExceptionHandlerFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityExceptionHandlerFilter.class);
    private ObjectMapper mapper = new ObjectMapper();

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            LOGGER.debug("Starting authentication process, path {}", request.getRequestURL().toString());
            filterChain.doFilter(request, response);
            LOGGER.debug("Passed authentication process");
        } catch (YouBCException ex) {
            LOGGER.debug("Authentication failed with {}, {}", ex.getClass().getSimpleName(), ex);
            sendErrorResponse(response, ex.getYouBCError());
        } catch (AuthenticationException ex) {
            LOGGER.debug("Authentication failed with {}, {}", ex.getClass().getSimpleName(), ex);
            sendErrorResponse(response, new YouBCError(HttpStatus.UNAUTHORIZED, "Unauthorized", ex.getMessage()));
        } catch (RuntimeException ex) {
            // unexpected exception
            LOGGER.debug("Authentication failed with UNEXPECTED {}, {}", ex.getClass().getSimpleName(), ex);
            sendErrorResponse(response, new YouBCError(HttpStatus.INTERNAL_SERVER_ERROR, "Server error", ex.getMessage()));
        }
    }

    private void sendErrorResponse(HttpServletResponse response, YouBCError error) throws IOException {
        response.setContentType("application/json");
        response.setStatus(error.getStatus());
        response.getWriter().write(toJson(error));
    }

    private String toJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        return mapper.writeValueAsString(object);
    }

}
