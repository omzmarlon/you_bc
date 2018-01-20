package com.youbc.beans;

import com.youbc.pooling.UserPoolManager;
import com.youbc.pooling.WeightedStrategy;
import com.youbc.pooling.classmates.PoolingByLikesClassmates;
import com.youbc.securities.services.CookieService;
import com.youbc.securities.services.JWTTokenService;
import com.youbc.utilities.EnvProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

@Configuration
@ComponentScan({"com.youbc"})
public class PoolingStrategyBeans {
    private CookieService cookieService;

    @Autowired
    public PoolingStrategyBeans() {}

//    @Bean
//    public UserPoolManager userPoolManager() {
//        return new UserPoolManager(initStrategies());
//    }
//
//    public ArrayList<WeightedStrategy> initStrategies() {
////        strategies.add(...);
////        strategies.add(...);
//        return strategies;
//    }

}
