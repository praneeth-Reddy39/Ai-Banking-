package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.springframework.http.ResponseEntity;
 
@CrossOrigin("*")
@RestController
@RequestMapping("/api/debug")
public class DebugController {
 
    private final UserRepository userRepository;
 
    public DebugController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
 
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
