package com.krtpromanager.krtpromanagerSpringBoot.mappers;

import com.krtpromanager.krtpromanagerSpringBoot.dto.CampeonatoDTO;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Campeonato;

import java.util.List;
import java.util.stream.Collectors;

public class CampeonatoMapper {

    public static CampeonatoDTO mapCampeonatoToCampeonatoDTO(Campeonato campeonato) {
        CampeonatoDTO campeonatoDTO = new CampeonatoDTO();
        campeonatoDTO.setId(campeonato.getId());
        campeonatoDTO.setNombre(campeonato.getNombre());
        campeonatoDTO.setFecha(campeonato.getFecha());
        campeonatoDTO.setLocal(campeonato.getLocal());
        campeonatoDTO.setProvincia(campeonato.getProvincia());
        campeonatoDTO.setDistrito(campeonato.getDistrito());
        campeonatoDTO.setUrl_bases(campeonato.getUrl_bases());
        campeonatoDTO.setImagen(campeonato.getImagen());
        campeonatoDTO.setDojo(DojoMapper.mapDojoToDojoDTO(campeonato.getDojo()));
        return campeonatoDTO;
    }

    public static List<CampeonatoDTO> mapCampeonatoListToCampeonatoListDTO(List<Campeonato> campeonatoList){
        return campeonatoList.stream().map(CampeonatoMapper::mapCampeonatoToCampeonatoDTO).collect(Collectors.toList());
    }
}
