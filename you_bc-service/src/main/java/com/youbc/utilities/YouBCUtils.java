package com.youbc.utilities;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class YouBCUtils {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public static <T> T parseJson(HttpServletRequest request, Class<T> tClass) throws IOException {
        JsonNode jsonNode = objectMapper.readTree(request.getInputStream());
        return objectMapper.treeToValue(jsonNode, tClass);
    }

    public static Map<String, String> getHeaders(HttpServletRequest request) {

        Map<String, String> map = new HashMap<String, String>();

        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
        }

        return map;
    }

}
