package com.krtpromanager.krtpromanagerSpringBoot.repositories;

import com.krtpromanager.krtpromanagerSpringBoot.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}
