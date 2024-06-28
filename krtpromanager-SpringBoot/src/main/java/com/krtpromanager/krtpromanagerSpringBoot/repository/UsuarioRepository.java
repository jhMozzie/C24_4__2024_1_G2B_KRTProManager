package com.krtpromanager.krtpromanagerSpringBoot.repository;


import com.krtpromanager.krtpromanagerSpringBoot.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}
