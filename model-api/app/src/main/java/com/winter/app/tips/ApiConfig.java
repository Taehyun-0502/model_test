package com.winter.app.tips;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class ApiConfig {

    @Bean
    public RestClient api(RestClient.Builder builder, @Value("${api.python}") String baseurl) {

        return builder.baseUrl(baseurl).build();
    }
}
