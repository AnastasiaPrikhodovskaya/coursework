package com.prihodovskaya.marketing.payload.response;


import com.prihodovskaya.marketing.models.auth.Company;

public class JwtCompanyResponse {
    public String accessToken;
    public String tokenType = "Bearer";
    public Company company;

    public JwtCompanyResponse(String token, Company company) {
        this.accessToken = token;
        this.company = company;
    }
}
