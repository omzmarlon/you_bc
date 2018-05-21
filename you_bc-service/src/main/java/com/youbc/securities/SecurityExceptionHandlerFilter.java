package com.youbc.securities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
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


    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (YouBCException ex) {
            sendErrorResponse(response, ex.getYouBCError());
        } catch (AuthenticationException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(toJson(new YouBCError(HttpStatus.UNAUTHORIZED, "Unauthorized", e.getMessage())));
        } catch (RuntimeException e) {
            // unexpected exception
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.getWriter().write(toJson(new YouBCError(HttpStatus.INTERNAL_SERVER_ERROR, "Server error", e.getMessage())));
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
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }

}
