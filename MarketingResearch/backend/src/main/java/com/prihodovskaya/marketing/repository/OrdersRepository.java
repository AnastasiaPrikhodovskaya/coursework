package com.prihodovskaya.marketing.repository;

import com.prihodovskaya.marketing.models.subject.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Order, Long> {
    List<Order> findByCompanyId(long id);
}
