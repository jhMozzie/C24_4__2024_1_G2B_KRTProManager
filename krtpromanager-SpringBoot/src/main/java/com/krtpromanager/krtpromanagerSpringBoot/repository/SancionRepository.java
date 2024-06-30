package com.krtpromanager.krtpromanagerSpringBoot.repository;

import com.krtpromanager.krtpromanagerSpringBoot.entity.Sancion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SancionRepository extends JpaRepository<Sancion, Long> {
    List<Sancion> findByDetalleCampeonatoCategoriaCompetidor_Competidor_Id(Long competidorId);
}
