package com.krtpromanager.krtpromanagerSpringBoot.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompetidorDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private int edad;
    private String genero;
    private DojoDTO dojo;
}