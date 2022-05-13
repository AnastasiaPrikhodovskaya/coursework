package com.prihodovskaya.marketing.repository;

import com.prihodovskaya.marketing.models.subject.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
