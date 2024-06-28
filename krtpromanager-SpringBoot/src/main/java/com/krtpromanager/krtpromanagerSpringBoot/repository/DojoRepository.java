package com.krtpromanager.krtpromanagerSpringBoot.repository;

import com.krtpromanager.krtpromanagerSpringBoot.entity.Dojo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DojoRepository extends JpaRepository<Dojo, Long> {
    Optional<Dojo> findById(Long id);
}
