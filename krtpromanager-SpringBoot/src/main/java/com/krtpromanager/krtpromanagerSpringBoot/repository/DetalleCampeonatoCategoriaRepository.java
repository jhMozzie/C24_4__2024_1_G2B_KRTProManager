package com.krtpromanager.krtpromanagerSpringBoot.repository;

import com.krtpromanager.krtpromanagerSpringBoot.entity.DetalleCampeonatoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleCampeonatoCategoriaRepository extends JpaRepository<DetalleCampeonatoCategoria, Long> {
    List<DetalleCampeonatoCategoria> findByCampeonatoId(Long campeonatoId);
}