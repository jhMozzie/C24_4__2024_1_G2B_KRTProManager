package com.krtpromanager.krtpromanagerSpringBoot.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsuarioDTO {
    private Long id;
    private String username;
    private String nombre;
    private String apellido;
    private String email;
    private String rol;
    private DojoDTO dojo;
}
