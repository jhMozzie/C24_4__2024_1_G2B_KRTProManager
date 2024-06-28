package com.krtpromanager.krtpromanagerSpringBoot.repository;

import com.krtpromanager.krtpromanagerSpringBoot.entity.Campeonato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CampeonatoRepository extends JpaRepository<Campeonato, Long> {
    Optional<Campeonato> findById(Long id);


}
