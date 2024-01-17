package com.example.budgetbuddy.controller;

import com.example.budgetbuddy.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RequestMapping("/api/v1")
public interface UserController {
    @CrossOrigin
    @PostMapping("/auth/register")
    public ResponseEntity<String> signup(@RequestBody Map<String,String> requestMap);
    @PostMapping("/auth/authenticate")
    public ResponseEntity<String> login (@RequestBody Map<String,String> requestMap);

    @CrossOrigin
    @GetMapping("/userDetails")
    public ResponseEntity<List<UserWrapper>> getAllUsers();
}

