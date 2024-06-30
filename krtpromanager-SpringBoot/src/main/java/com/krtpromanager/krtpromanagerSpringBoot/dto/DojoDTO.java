package com.krtpromanager.krtpromanagerSpringBoot.dto;

import lombok.Data;

import java.util.List;

@Data
public class DojoDTO {
    private Long id;
    private String nombreDojo;
    private String senseiDojo;
    private UsuarioDTO usuario;
    private List<CampeonatoDTO> campeonatos;
}
