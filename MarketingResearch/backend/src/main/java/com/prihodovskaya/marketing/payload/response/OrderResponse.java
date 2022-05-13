package com.prihodovskaya.marketing.payload.response;


import com.prihodovskaya.marketing.models.subject.Question;

import java.util.Set;

public class OrderResponse {
    public long orderId;

    public String company;

    public String method;

    public Set<Question> questions;

    public OrderResponse(long orderId, String company, String method, Set<Question> questions) {
        this.orderId = orderId;
        this.company = company;
        this.method = method;
        this.questions = questions;
    }
}
