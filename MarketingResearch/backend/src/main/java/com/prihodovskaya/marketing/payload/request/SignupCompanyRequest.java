package com.prihodovskaya.marketing.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class SignupCompanyRequest extends SignupRequest {
    @NotBlank
    @Size(min = 3, max = 60)
    public String companyName;

    @NotBlank
    @Size(min = 3, max = 120)
    public String companyProblem;

    @NotNull(message = "Please enter id")
    public Integer employeeCount;
}
