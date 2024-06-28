package com.krtpromanager.krtpromanagerSpringBoot.repository;

import com.krtpromanager.krtpromanagerSpringBoot.entity.Usuario;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByUsername(String username);
    @EntityGraph(attributePaths = "dojo")
    Optional<Usuario> findByUsername(String username);

    @EntityGraph(attributePaths = "dojo")
    @Query("SELECT u FROM Usuario u WHERE u.username = :username")
    Optional<Usuario> findByUsernameWithDojo(@Param("username") String username);
}
