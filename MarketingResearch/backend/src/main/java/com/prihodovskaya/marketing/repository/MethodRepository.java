package com.prihodovskaya.marketing.repository;

import com.prihodovskaya.marketing.models.subject.Method;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface MethodRepository extends JpaRepository<Method, Long> {
    @Transactional
    Optional<Method> findByName(String name);
}
