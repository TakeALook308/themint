package com.takealook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ThemintApplication {

    public static void main(String[] args) {
        SpringApplication.run(ThemintApplication.class, args);
    }

}
