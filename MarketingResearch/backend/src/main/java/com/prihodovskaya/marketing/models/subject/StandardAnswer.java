package com.prihodovskaya.marketing.models.subject;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prihodovskaya.marketing.models.base.NamedEntity;

import javax.persistence.*;

@Entity
@Table(name = "standard_answers")
public class StandardAnswer extends NamedEntity {

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="question_id", nullable=false)
    public Question question;

    public StandardAnswer() {}

    public StandardAnswer(String name, Question question) {
        this.name = name;
        this.question = question;
    }
}
