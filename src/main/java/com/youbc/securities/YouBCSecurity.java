package com.youbc.securities;

import com.youbc.securities.filters.JWTAPIFilter;
import com.youbc.securities.filters.JWTLoginFilter;
import com.youbc.securities.handlers.LoginSuccessHandler;
import com.youbc.securities.providers.JWTAuthenticationProvider;
import com.youbc.securities.requestmatchers.LoginRequestMatcher;
import com.youbc.securities.requestmatchers.ProtectedAPIMatcher;
import com.youbc.securities.services.CookieService;
import com.youbc.utilities.Endpoints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

/**
 * Created by omzmarlon on 2017-09-30.
 */

@EnableWebSecurity
@Component
@Configuration
public class YouBCSecurity extends WebSecurityConfigurerAdapter {

    private JWTAuthenticationProvider jwtAuthenticationProvider;
    private LoginRequestMatcher loginRequestMatcher;
    private ProtectedAPIMatcher protectedAPIMatcher;
    private LoginSuccessHandler successHandler;
    private CookieService cookieService;

    @Autowired
    public YouBCSecurity(
            JWTAuthenticationProvider jwtAuthenticationProvider,
            LoginRequestMatcher loginRequestMatcher,
            ProtectedAPIMatcher protectedAPIMatcher,
            LoginSuccessHandler successHandler,
            CookieService cookieService
    ) {
        this.jwtAuthenticationProvider = jwtAuthenticationProvider;
        this.loginRequestMatcher = loginRequestMatcher;
        this.protectedAPIMatcher = protectedAPIMatcher;
        this.successHandler = successHandler;
        this.cookieService = cookieService;
    }

    @Override
    public void configure(AuthenticationManagerBuilder authBuilder) throws Exception {
        authBuilder.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        // enable CORS in Spring Security so that our CORS filter will be picked up
        http.cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers(Endpoints.PROTECTED_API_PATTERN)
                .authenticated()
                .and()
                .addFilterBefore(
                        new JWTLoginFilter(loginRequestMatcher, authenticationManager(), successHandler),
                        UsernamePasswordAuthenticationFilter.class
                )
                .addFilterBefore(
                        new JWTAPIFilter(protectedAPIMatcher, authenticationManager(), cookieService),
                        UsernamePasswordAuthenticationFilter.class
                );
    }
}
