package com.krtpromanager.krtpromanagerSpringBoot.repository;


import com.krtpromanager.krtpromanagerSpringBoot.entity.Dojo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DojoRepository extends JpaRepository<Dojo, Long> {
}
