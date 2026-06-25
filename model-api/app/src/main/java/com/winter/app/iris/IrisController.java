package com.winter.app.iris;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/iris/*")
public class IrisController {

    @Autowired
    private IrisService irisService;

    @PostMapping("form")
    public String iris(@RequestBody Map<String, Object> data) throws Exception {

        return irisService.iris(data);

    }

}
