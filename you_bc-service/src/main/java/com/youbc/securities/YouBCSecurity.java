package com.youbc.securities;

import com.youbc.database.UserProfileDAO;
import com.youbc.securities.authProviders.JWTAuthProvider;
import com.youbc.securities.authProviders.LoginAuthProvider;
import com.youbc.securities.filters.JWTAPIFilter;
import com.youbc.securities.filters.UsernamePasswordLoginFilter;
import com.youbc.securities.handlers.LoginSuccessHandler;
import com.youbc.securities.handlers.OAuthFailureHandler;
import com.youbc.securities.handlers.OAuthSuccessHandler;
import com.youbc.securities.services.CookieService;
import com.youbc.utilities.Endpoints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

/**
 * Created by omzmarlon on 2017-09-30.
 */

@EnableWebSecurity
public class YouBCSecurity extends WebSecurityConfigurerAdapter {

    // TODO: don't use field injection
    @Autowired
    private UserProfileDAO userProfileDAO;


    private LoginAuthProvider loginAuthProvider;
    private JWTAuthProvider jwtAuthProvider;
    private LoginSuccessHandler loginSuccessHandler;
    private CookieService cookieService;
    private YouBCAuthEntryPoint entryPoint;

    private AuthorizationCodeResourceDetails authorizationCodeResourceDetails;
    private ResourceServerProperties facebookResourceProperties;
    private OAuth2ClientContext oauth2Context;
    private OAuthSuccessHandler oAuthSuccessHandler;
    private OAuthFailureHandler oAuthFailureHandler;

    @Autowired
    public YouBCSecurity(
            LoginAuthProvider loginAuthProvider,
            YouBCAuthEntryPoint entryPoint,
            JWTAuthProvider jwtAuthProvider,
            LoginSuccessHandler loginSuccessHandler,
            CookieService cookieService,
            OAuth2ClientContext oauth2Context,
            @Qualifier("facebookResource") ResourceServerProperties facebookResourceProperties,
            AuthorizationCodeResourceDetails authorizationCodeResourceDetails,
            OAuthSuccessHandler oAuthSuccessHandler,
            OAuthFailureHandler oAuthFailureHandler
    ) {
        this.loginAuthProvider = loginAuthProvider;
        this.loginSuccessHandler = loginSuccessHandler;
        this.entryPoint = entryPoint;
        this.jwtAuthProvider = jwtAuthProvider;
        this.cookieService = cookieService;
        this.oauth2Context = oauth2Context;
        this.facebookResourceProperties = facebookResourceProperties;
        this.authorizationCodeResourceDetails = authorizationCodeResourceDetails;
        this.oAuthSuccessHandler = oAuthSuccessHandler;
        this.oAuthFailureHandler = oAuthFailureHandler;
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
                .exceptionHandling()
                    .authenticationEntryPoint(entryPoint)
                .and()
                .authorizeRequests()
                    // TODO may be have a frontend login permit all
                    .antMatchers("/", Endpoints.SIGNUP_ENDPOINT, Endpoints.LOGIN_ENDPOINT, Endpoints.HEALTH_ENDPOINT).permitAll()
                    .anyRequest().authenticated()
                .and()
                .addFilterBefore(
                        new UsernamePasswordLoginFilter(Endpoints.LOGIN_ENDPOINT, authenticationManager(), loginSuccessHandler),
                        UsernamePasswordAuthenticationFilter.class
                )
                .addFilterBefore(
                        new JWTAPIFilter(Endpoints.PROTECTED_API_PATTERN, authenticationManager(), cookieService),
                        UsernamePasswordAuthenticationFilter.class
                )
                .addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);
    }


    private AbstractAuthenticationProcessingFilter ssoFilter() {
        OAuth2ClientAuthenticationProcessingFilter facebookFilter = new OAuth2ClientAuthenticationProcessingFilter("/login/facebook");
        OAuth2RestTemplate facebookTemplate = new OAuth2RestTemplate(authorizationCodeResourceDetails, oauth2Context);

        facebookFilter.setRestTemplate(facebookTemplate);
        //facebookFilter.setAuthenticationSuccessHandler(oAuthSuccessHandler);
        facebookFilter.setAuthenticationFailureHandler(oAuthFailureHandler);


        UserInfoTokenServices tokenServices = new FBUserInfoTokenServices(
                facebookResourceProperties.getUserInfoUri(),
                authorizationCodeResourceDetails.getClientId(),
                userProfileDAO
        );

        tokenServices.setRestTemplate(facebookTemplate);



        facebookFilter.setTokenServices(tokenServices);
        return facebookFilter;
    }

}
