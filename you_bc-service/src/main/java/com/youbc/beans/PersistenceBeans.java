package com.youbc.beans;

import com.youbc.utilities.EnvProperties;
import com.youbc.services.JooqExecutionListener;
import org.jooq.SQLDialect;
import org.jooq.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@ComponentScan({"com.youbc"})
@PropertySource("classpath:configurations/database.properties")
public class PersistenceBeans {
    private Environment env;

    @Autowired
    public PersistenceBeans(Environment env) {
        this.env = env;
    }

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(env.getProperty(EnvProperties.DATASOURCE_DRIVER));
        dataSource.setUsername(env.getProperty(EnvProperties.DATASOURCE_USERNAME));
        dataSource.setPassword(env.getProperty(EnvProperties.DATASOURCE_PASSWORD));
        dataSource.setUrl(env.getProperty(EnvProperties.DATASOURCE_URL));
        return dataSource;
    }

    @Bean
    public DataSourceConnectionProvider  dataSourceConnectionProvider() {
        return new DataSourceConnectionProvider(dataSource());
    }

    @Bean
    public JooqExecutionListener executionListener() {
        return new JooqExecutionListener();
    }

    @Bean
    public DefaultConfiguration configuration() {
        DefaultConfiguration configuration = new DefaultConfiguration();

        configuration.set(SQLDialect.MYSQL);
        configuration.set(new DefaultExecuteListenerProvider(executionListener()));
        configuration.set(dataSourceConnectionProvider());

        return configuration;
    }

    @Bean
    public DefaultDSLContext dslContext() {
        return new DefaultDSLContext(configuration());
    }
}
