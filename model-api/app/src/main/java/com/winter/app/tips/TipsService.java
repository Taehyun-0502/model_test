package com.winter.app.tips;

import java.net.http.HttpClient;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Mono;

@Service
public class TipsService {

    public String model(Map<String, Object> formData) throws Exception {

        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1) // HTTP/1.1 고정
                .build();
        // 2. 해당 HttpClient를 사용하는 RequestFactory 생성
        JdkClientHttpRequestFactory requestFactory = new JdkClientHttpRequestFactory(httpClient);

        String jsonBody = new ObjectMapper().writeValueAsString(formData);
        byte[] bodyBytes = jsonBody.getBytes(StandardCharsets.UTF_8);
        System.out.println(formData);
        RestClient restClient = RestClient.builder().requestFactory(requestFactory)
                .baseUrl("http://container-fastapi:8000/api2/")
                .build();

        String result = restClient.post()
                .uri("tips")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(bodyBytes.length)
                .body(bodyBytes)
                .retrieve()
                .body(String.class);
        return result;
    }

    public String model2(Map<String, Object> formData) throws Exception {
        WebClient w = WebClient.builder()
                .baseUrl("http://container-fastapi:8000/api2/")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        Mono<String> r = w.post()
                .uri("tips")
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(String.class);

        String result = r.block();
        System.out.println(result);
        return result;
    }

}
