package com.youbc.securities;

import com.youbc.securities.authProviders.JWTAuthProvider;
import com.youbc.securities.authProviders.LoginAuthProvider;
import com.youbc.securities.filters.JWTAPIFilter;
import com.youbc.securities.filters.UsernamePasswordLoginFilter;
import com.youbc.securities.handlers.LoginSuccessHandler;
import com.youbc.securities.services.CookieService;
import com.youbc.utilities.Endpoints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

/**
 * Created by omzmarlon on 2017-09-30.
 */

@EnableWebSecurity
public class YouBCSecurity extends WebSecurityConfigurerAdapter {

    private LoginAuthProvider loginAuthProvider;
    private JWTAuthProvider jwtAuthProvider;
    private LoginSuccessHandler loginSuccessHandler;
    private CookieService cookieService;

    @Autowired
    public YouBCSecurity(
            LoginAuthProvider loginAuthProvider,
            JWTAuthProvider jwtAuthProvider,
            LoginSuccessHandler loginSuccessHandler,
            CookieService cookieService
    ) {
        this.loginAuthProvider = loginAuthProvider;
        this.loginSuccessHandler = loginSuccessHandler;
        this.jwtAuthProvider = jwtAuthProvider;
        this.cookieService = cookieService;
    }

    @Override
    public void configure(AuthenticationManagerBuilder authBuilder) {
        authBuilder.authenticationProvider(loginAuthProvider);
        authBuilder.authenticationProvider(jwtAuthProvider);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        // enable CORS in Spring Security so that our CORS filter will be picked up
        http.cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                    // TODO may be have a frontend login permit all
                    .antMatchers(
                            "/",
                            "/bundle.js",
                            "/assets/**",
                            "/favicon.ico",
                            "/signin",
                            "/signup",
                            Endpoints.SIGNUP_ENDPOINT,
                            Endpoints.LOGIN_ENDPOINT,
                            Endpoints.HEALTH_ENDPOINT
                    ).permitAll()
                    .anyRequest().authenticated()
                .and()
                .addFilterBefore(new SecurityExceptionHandlerFilter(), CorsFilter.class)
                .addFilterBefore(
                        new UsernamePasswordLoginFilter(Endpoints.LOGIN_ENDPOINT, authenticationManager(), loginSuccessHandler),
                        UsernamePasswordAuthenticationFilter.class
                )
                .addFilterBefore(
                        new JWTAPIFilter(Endpoints.PROTECTED_API_PATTERN, authenticationManager(), cookieService),
                        UsernamePasswordAuthenticationFilter.class
                )
                .formLogin().disable();
    }
}
