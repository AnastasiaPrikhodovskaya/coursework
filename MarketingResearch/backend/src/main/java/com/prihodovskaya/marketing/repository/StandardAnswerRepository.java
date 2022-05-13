package com.prihodovskaya.marketing.repository;

import com.prihodovskaya.marketing.models.subject.StandardAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StandardAnswerRepository extends JpaRepository<StandardAnswer, Long> {
}
