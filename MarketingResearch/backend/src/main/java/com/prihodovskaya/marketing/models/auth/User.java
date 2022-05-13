package com.prihodovskaya.marketing.models.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prihodovskaya.marketing.models.base.BaseEntity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User extends BaseEntity {
    @NotBlank
    @Size(max = 20)
    public String username;

    @NotBlank
    @Size(max = 50)
    @Email
    public String email;

    @JsonIgnore
    @NotBlank
    @Size(max = 120)
    public String password;

    @NotBlank
    @Size(max = 120)
    public String firstName;

    @NotBlank
    @Size(max = 120)
    public String lastName;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    public Company company;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    public Set<Role> roles = new HashSet<>();

    public User() {}

    public User(String username, String email, String password, String firstName, String lastName) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(String username, String email, String password, String firstName, String lastName, Set<Role> roles) {
        this(username, email, password, firstName, lastName);
        this.roles = roles;
    }
}
