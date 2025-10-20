package com.riavet.patientservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for Patient Service microservice.
 * 
 * This microservice is part of the RIAVET platform and manages
 * patient information following Clean Architecture principles.
 */
@SpringBootApplication
public class PatientServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PatientServiceApplication.class, args);
    }
}
