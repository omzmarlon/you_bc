package com.pokecabin.securities;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by omzmarlon on 2017-09-30.
 */

@EnableWebSecurity
@Configuration
public class PokeCabinSecurity extends WebSecurityConfigurerAdapter {
    @Override
    public void configure(AuthenticationManagerBuilder authBuilder) {

    }
}
