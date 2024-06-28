package com.krtpromanager.krtpromanagerSpringBoot.dto;

import lombok.Data;

@Data
public class DetalleCampeonatoCategoriaDTO {
    private Long id;
    private String descripcionCategoria;
    private String generoCategoria;
    private String gradoCategoria;
    private String modalidadCategoria;
}
