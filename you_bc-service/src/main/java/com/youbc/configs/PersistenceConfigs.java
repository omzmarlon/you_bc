package com.youbc.configs;

import com.youbc.services.JooqExecutionListener;
import org.jooq.SQLDialect;
import org.jooq.impl.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@ComponentScan({"com.youbc"})
public class PersistenceConfigs {

    @Value("${youbc.db.driver}")
    private String driverClassName;

    @Value("${youbc.db.username}")
    private String username;

    @Value("${youbc.db.password}")
    private String password;

    @Value("${youbc.db.url}")
    private String url;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setUrl(url);
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
