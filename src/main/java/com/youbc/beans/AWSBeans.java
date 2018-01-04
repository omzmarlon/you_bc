package com.youbc.beans;

import com.youbc.utils.EnvProperties;
import com.youbc.utils.aws.S3Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@ComponentScan({"com.youbc"})
@PropertySource("classpath:configurations/aws.properties")
public class AWSBeans {
    private Environment env;

    @Autowired
    public AWSBeans(Environment env) {
        this.env = env;
    }

    @Bean
    public S3Client s3Client() {
        return new S3Client(
                env.getProperty(EnvProperties.S3_ENDPOINT_URL),
                env.getProperty(EnvProperties.S3_ACCESS_KEY),
                env.getProperty(EnvProperties.S3_SECRET_KEY),
                env.getProperty(EnvProperties.S3_BUCKET_NAME)
        );
    }
}
