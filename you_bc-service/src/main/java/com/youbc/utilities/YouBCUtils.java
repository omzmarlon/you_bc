package com.youbc.utilities;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class YouBCUtils {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public static boolean isEmptyString(String s) {
        return s == null || s.equals("");
    }

    public static JsonNode getJsonFromRequest(HttpServletRequest request) {
        try {
            return objectMapper.readTree(request.getInputStream());
        } catch (IOException e) {
            throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "Invalid JSON", e.getMessage()));
        }
    }

}
