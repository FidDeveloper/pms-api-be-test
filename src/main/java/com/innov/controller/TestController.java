package com.innov.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.innov.dto.TestDto;
import com.innov.dto.ApiResponse;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @RequestMapping(value = "/ping", method = RequestMethod.GET)
    public String ping() {
        return "ok";
    }

    @PostMapping(value="/getTestData", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> testController(@RequestBody TestDto testDto){
        Map<String, Object> map = new HashMap<>();
        map.put("success", true);
        map.put("data", testDto);

        return ResponseEntity.ok(map);
    }
}
