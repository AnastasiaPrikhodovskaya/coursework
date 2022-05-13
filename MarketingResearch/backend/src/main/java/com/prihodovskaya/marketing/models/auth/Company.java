package com.prihodovskaya.marketing.models.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prihodovskaya.marketing.models.base.NamedEntity;
import com.prihodovskaya.marketing.models.subject.Order;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "company")
public class Company extends NamedEntity {

    @NotBlank
    @Size(max = 200)
    public String problem;

    @NotNull
    public int employeeCount;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id")
    public Set<Order> orders;

    public Company() {}

    public Company(String name, String problem, int employeeCount) {
        this.name = name;
        this.problem = problem;
        this.employeeCount = employeeCount;
    }
}
