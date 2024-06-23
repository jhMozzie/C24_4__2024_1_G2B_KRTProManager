package com.krtpromanager.krtpromanagerSpringBoot.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.krtpromanager.krtpromanagerSpringBoot.model.Dojo;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DojoDto {
    private int statusCode;
    private String error;
    private String token;
    private String message;
    private Long id;
    private String nombreDojo;
    private String senseiDojo;
    private Dojo dojo;
    private List<Dojo> dojoList;

}
