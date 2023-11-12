package com.ziio.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/")
    private String loginMainTest() {
        return "loginMainTest";
    }

}