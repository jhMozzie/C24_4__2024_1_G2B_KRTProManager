package com.krtpromanager.krtpromanagerSpringBoot.mappers;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DojoDTO;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Dojo;

import java.util.stream.Collectors;

public class DojoMapper {
    public static DojoDTO mapDojoToDojoDTO(Dojo dojo) {
        if (dojo == null) {
            return null;
        }
        DojoDTO dojoDTO = new DojoDTO();
        dojoDTO.setId(dojo.getId());
        dojoDTO.setNombreDojo(dojo.getNombreDojo());
        dojoDTO.setSenseiDojo(dojo.getSenseiDojo());
        return dojoDTO;
    }
}