package com.prihodovskaya.marketing.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

public class SignupRequest {
  @NotBlank
  @Size(min = 3, max = 20)
  public String username;

  @NotBlank
  @Size(max = 50)
  @Email
  public String email;

  @NotBlank
  @Size(min = 6, max = 40)
  public String password;

  @NotBlank
  @Size(min = 2, max = 40)
  public String firstName;

  @NotBlank
  @Size(min = 2, max = 40)
  public String lastName;

  public Set<String> role;
}
