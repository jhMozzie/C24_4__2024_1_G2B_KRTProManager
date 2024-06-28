package com.krtpromanager.krtpromanagerSpringBoot.repository;

import com.krtpromanager.krtpromanagerSpringBoot.entity.Competidor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompetidorRepository extends JpaRepository<Competidor, Long> {
    @Query("SELECT c FROM Competidor c WHERE c.dojo.usuario.id = :usuarioId")
    List<Competidor> findAllByUsuarioId(@Param("usuarioId") Long usuarioId);
}