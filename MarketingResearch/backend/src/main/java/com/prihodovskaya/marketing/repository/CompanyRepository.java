package com.prihodovskaya.marketing.repository;

import com.prihodovskaya.marketing.models.auth.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
}
