package com.prihodovskaya.marketing.repository;

import java.util.Optional;

import com.prihodovskaya.marketing.models.auth.ERole;
import com.prihodovskaya.marketing.models.auth.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
