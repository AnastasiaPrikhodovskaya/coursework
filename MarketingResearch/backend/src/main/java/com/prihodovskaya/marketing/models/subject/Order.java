package com.prihodovskaya.marketing.models.subject;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prihodovskaya.marketing.models.auth.Company;
import com.prihodovskaya.marketing.models.base.BaseEntity;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order extends BaseEntity {

    @NotNull
    @Size(max = 512)
    public String comment;

    @NotNull
    @ColumnDefault("0")
    public int passedPeople;

    @NotNull
    public int personCount;

    @CreationTimestamp
    public Date dateStart;

    @OneToOne()
    @JoinColumn(name = "method_id", referencedColumnName = "id")
    public Method method;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="company_id", nullable=false)
    public Company company;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    public Set<Answer> answers;

    private static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

    public Order() {}
}
