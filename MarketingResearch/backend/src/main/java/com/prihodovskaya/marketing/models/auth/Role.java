package com.prihodovskaya.marketing.models.auth;

import com.prihodovskaya.marketing.models.base.BaseEntity;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    public ERole name;

    public Role() {}

    public Role(ERole name) {
        this.name = name;
    }
}
