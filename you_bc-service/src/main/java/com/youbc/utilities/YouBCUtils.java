package com.youbc.utilities;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class YouBCUtils {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public static <T> T parseJson(HttpServletRequest request, Class<T> tClass) throws IOException {
        JsonNode jsonNode = objectMapper.readTree(request.getInputStream());
        return objectMapper.treeToValue(jsonNode, tClass);
    }

}
