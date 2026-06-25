package com.winter.app.tips;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/tips/*")
public class TipsController {

    @Autowired
    private TipsService tipsService;

    @PostMapping("form")
    public ResponseEntity<String> tipsForm(@RequestBody Map<String, Object> formData) throws Exception {
        // System.out.println(formData);
        String result = tipsService.model2(formData);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(result);
    }

}
