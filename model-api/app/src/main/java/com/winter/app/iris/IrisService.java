package com.winter.app.iris;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class IrisService {

    public String iris(Map<String, Object> data) throws Exception {
        System.err.println(data);
        WebClient w = WebClient.builder()
                .baseUrl("http://container-fastapi:8000/api2/")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        Mono<String> r = w.post()
                .uri("iris")
                .bodyValue(data)
                .retrieve()
                .bodyToMono(String.class);

        String result = r.block();
        return result;

    }
}
