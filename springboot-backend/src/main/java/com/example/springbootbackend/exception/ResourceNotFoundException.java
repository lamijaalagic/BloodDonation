package com.example.springbootbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    private static final int serialVersionUID= 1;

    public ResourceNotFoundException (String message, Integer serialVersionUID) {

        super("Model "+message+ " with ID "+serialVersionUID+" is not found.");
    }
}
