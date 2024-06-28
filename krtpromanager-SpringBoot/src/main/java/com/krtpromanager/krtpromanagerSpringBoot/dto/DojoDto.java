package com.krtpromanager.krtpromanagerSpringBoot.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DojoDTO {
    private Long id;
    private String nombreDojo;
    private String senseiDojo;
    private UsuarioDTO usuario;
    private List<CampeonatoDTO> campeonatos;
}
