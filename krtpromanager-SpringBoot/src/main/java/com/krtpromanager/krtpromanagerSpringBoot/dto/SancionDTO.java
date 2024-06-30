package com.krtpromanager.krtpromanagerSpringBoot.dto;

import lombok.Data;

@Data
public class SancionDTO {
    private Long id;
    private String motivo;
    private Long competidorId;
}