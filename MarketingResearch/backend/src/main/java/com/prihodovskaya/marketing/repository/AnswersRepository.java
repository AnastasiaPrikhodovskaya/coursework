package com.prihodovskaya.marketing.repository;

import com.prihodovskaya.marketing.models.subject.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswersRepository extends JpaRepository<Answer, Long> {
}
