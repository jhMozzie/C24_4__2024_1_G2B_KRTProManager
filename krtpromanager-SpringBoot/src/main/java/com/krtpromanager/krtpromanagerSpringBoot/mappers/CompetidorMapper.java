package com.krtpromanager.krtpromanagerSpringBoot.mappers;

import com.krtpromanager.krtpromanagerSpringBoot.dto.CompetidorDTO;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Competidor;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Dojo;

import java.util.List;
import java.util.stream.Collectors;

public class CompetidorMapper {
    public static CompetidorDTO mapCompetidorToCompetidorDTO(Competidor competidor){
        CompetidorDTO competidorDTO = new CompetidorDTO();
        competidorDTO.setId(competidor.getId());
        competidorDTO.setNombre(competidor.getNombre());
        competidorDTO.setApellido(competidor.getApellido());
        competidorDTO.setEdad(competidor.getEdad());
        competidorDTO.setGenero(competidor.getGenero());
        competidorDTO.setDojo(DojoMapper.mapDojoToDojoDTO(competidor.getDojo()));
        return competidorDTO;
    }

    public static Competidor mapToEntity(CompetidorDTO competidorDTO, Dojo dojo) {
        if (competidorDTO == null) {
            return null;
        }

        Competidor competidor = new Competidor();
        competidor.setId(competidorDTO.getId());
        competidor.setNombre(competidorDTO.getNombre());
        competidor.setApellido(competidorDTO.getApellido());
        competidor.setEdad(competidorDTO.getEdad());
        competidor.setGenero(competidorDTO.getGenero());
        competidor.setDojo(dojo);
        return competidor;
    }

    public static List<CompetidorDTO> mapCompetidorListToCompetidorListDTO(List<Competidor> competidorList){
        return competidorList.stream().map(CompetidorMapper::mapCompetidorToCompetidorDTO).collect(Collectors.toList());
    }
}
