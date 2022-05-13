package com.prihodovskaya.marketing.payload.response;

import com.prihodovskaya.marketing.models.auth.User;

public class JwtLoginResponse {
    public String accessToken;

    public String tokenType = "Bearer";

    public User user;

    public JwtLoginResponse(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
