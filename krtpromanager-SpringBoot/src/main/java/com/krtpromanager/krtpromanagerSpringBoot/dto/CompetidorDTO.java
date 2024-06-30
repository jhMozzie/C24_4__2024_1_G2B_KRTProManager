package com.krtpromanager.krtpromanagerSpringBoot.dto;

import lombok.Data;

@Data
public class CompetidorDTO {
        private Long id;
        private String nombre;
        private String apellido;
        private int edad;
        private String genero;
        private DojoDTO dojo;
}
