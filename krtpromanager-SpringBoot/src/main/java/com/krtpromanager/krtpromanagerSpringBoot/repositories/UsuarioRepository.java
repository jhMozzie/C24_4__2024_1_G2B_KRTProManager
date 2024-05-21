package com.krtpromanager.krtpromanagerSpringBoot.repositories;

import com.krtpromanager.krtpromanagerSpringBoot.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
