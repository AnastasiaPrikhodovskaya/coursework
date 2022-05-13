package com.prihodovskaya.marketing.models.subject;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prihodovskaya.marketing.models.base.NamedEntity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "questions")
public class Question extends NamedEntity {

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="method_id", nullable=false)
    public Method method;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id")
    public Set<StandardAnswer> standardAnswers;

    public Question() {}

    public Question(String name, Method method) {
        this.name = name;
        this.method = method;
    }
}
