package com.krtpromanager.krtpromanagerSpringBoot.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Competidor;
import com.krtpromanager.krtpromanagerSpringBoot.entity.DetalleCampeonatoCategoriaCompetidor;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Usuario;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private int statusCode;
    private String message;
    private String token;
    private String rol;
    private String expirationTime;
    private UsuarioDTO usuario;
    private DojoDTO dojo;
    private CompetidorDTO competidor;
    private CampeonatoDTO campeonato;
    private DetalleCampeonatoCategoriaDTO detalleCampeonatoCategoria;
    private DetalleCampeonatoCategoriaCompetidorDTO detalleCampeonatoCategoriaCompetidorDTO;
    private List<DetalleCampeonatoCategoriaCompetidorDTO> detalleCampeonatoCategoriaCompetidorDTOList;
    private List<DetalleCampeonatoCategoriaDTO> detalleCampeonatoCategoriaList;
    private List<CompetidorDTO> competidorList;
    private List<UsuarioDTO> usuarioList;
    private List<DojoDTO> dojoList;
    private List<CampeonatoDTO> campeonatoList;
}
