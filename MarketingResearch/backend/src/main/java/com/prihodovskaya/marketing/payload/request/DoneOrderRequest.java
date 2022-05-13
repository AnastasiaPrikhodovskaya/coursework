package com.prihodovskaya.marketing.payload.request;

import java.util.List;

public class DoneOrderRequest {
    public long orderId;

    public List<AnswerRequest> answers;
}
