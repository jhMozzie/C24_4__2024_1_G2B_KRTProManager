package com.krtpromanager.krtpromanagerSpringBoot.dto;

import lombok.Data;

@Data
public class DetalleCampeonatoCategoriaCompetidorDTO {
    private Long id;
    private CompetidorDTO competidorDTO;
    private DetalleCampeonatoCategoriaDTO detalleCampeonatoCategoriaDTO;
}