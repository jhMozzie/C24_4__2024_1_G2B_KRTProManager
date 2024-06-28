package com.krtpromanager.krtpromanagerSpringBoot.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CampeonatoDTO {
    private Long id;
    private String nombre;
    private LocalDateTime fecha;
    private String local;
    private String provincia;
    private String distrito;
    private String url_bases;
    private String imagen;
    private DojoDTO dojo;
}