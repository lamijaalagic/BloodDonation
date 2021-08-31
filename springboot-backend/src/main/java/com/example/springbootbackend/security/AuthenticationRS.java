package com.example.springbootbackend.security;

public class AuthenticationRS {
    private String token;

    public AuthenticationRS() {
    }

    public AuthenticationRS(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
