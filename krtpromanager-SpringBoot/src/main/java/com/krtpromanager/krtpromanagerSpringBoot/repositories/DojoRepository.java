package com.krtpromanager.krtpromanagerSpringBoot.repositories;

import com.krtpromanager.krtpromanagerSpringBoot.models.Dojo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DojoRepository extends JpaRepository<Dojo, Long> {
}
