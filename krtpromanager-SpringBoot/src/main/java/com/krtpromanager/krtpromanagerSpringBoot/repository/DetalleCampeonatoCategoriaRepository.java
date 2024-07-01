package com.krtpromanager.krtpromanagerSpringBoot.repository;

import com.krtpromanager.krtpromanagerSpringBoot.entity.DetalleCampeonatoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DetalleCampeonatoCategoriaRepository extends JpaRepository<DetalleCampeonatoCategoria, Long> {
    List<DetalleCampeonatoCategoria> findByCampeonatoId(Long campeonatoId);

    @Query("SELECT d FROM DetalleCampeonatoCategoria d WHERE d.campeonato.nombre = :nombre")
    List<DetalleCampeonatoCategoria> findByCampeonatoNombre(String nombre);
}