package com.prihodovskaya.marketing.models.subject;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prihodovskaya.marketing.models.base.NamedEntity;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "methods")
public class Method extends NamedEntity {

    @Size(max = 300)
    public String description;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "method_id")
    public Set<Question> questions;

    public Method() { }

    public Method(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
