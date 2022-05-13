package com.prihodovskaya.marketing.models.subject;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prihodovskaya.marketing.models.base.NamedEntity;

import javax.persistence.*;

@Entity
@Table(name = "answers")
public class Answer extends NamedEntity {

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="order_id", nullable=false)
    public Order order;

    @OneToOne()
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    public Question question;

    public Answer() {}

    public Answer(String name, Order order, Question question) {
        this.name = name;
        this.order = order;
        this.question = question;
    }
}
