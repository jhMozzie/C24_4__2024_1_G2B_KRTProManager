package com.krtpromanager.krtpromanagerSpringBoot.mappers;

import com.krtpromanager.krtpromanagerSpringBoot.dto.UsuarioDTO;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Usuario;

import java.util.List;
import java.util.stream.Collectors;

public class UsuarioMapper {

    public static UsuarioDTO mapUsuarioToUsuarioDTO(Usuario usuario) {
        if (usuario == null) {
            return null;
        }

        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setUsername(usuario.getUsername());
        usuarioDTO.setNombre(usuario.getNombres());
        usuarioDTO.setApellido(usuario.getApellidos());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setRol(usuario.getRol());

        if (usuario.getDojo() != null) {
            usuarioDTO.setDojo(DojoMapper.mapDojoToDojoDTO(usuario.getDojo()));
        }

        return usuarioDTO;
    }
}