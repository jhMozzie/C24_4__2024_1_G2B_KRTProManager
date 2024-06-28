package com.krtpromanager.krtpromanagerSpringBoot.mappers;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DetalleCampeonatoCategoriaCompetidorDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.DetalleCampeonatoCategoriaDTO;
import com.krtpromanager.krtpromanagerSpringBoot.entity.DetalleCampeonatoCategoria;
import com.krtpromanager.krtpromanagerSpringBoot.entity.DetalleCampeonatoCategoriaCompetidor;

import java.util.List;
import java.util.stream.Collectors;

public class DetalleCampeonatoCategoriaCompetidorMapper {
    public static DetalleCampeonatoCategoriaCompetidorDTO mapDetalleCampeonatoCategoriaCompetidorToDetalleCampeonatoCategoriaCompetidorDTO(DetalleCampeonatoCategoriaCompetidor detalleCampeonatoCategoriaCompetidor){
        DetalleCampeonatoCategoriaCompetidorDTO detalleCampeonatoCategoriaCompetidorDTO = new DetalleCampeonatoCategoriaCompetidorDTO();
        detalleCampeonatoCategoriaCompetidorDTO.setId(detalleCampeonatoCategoriaCompetidor.getId());
        detalleCampeonatoCategoriaCompetidorDTO.setCompetidorDTO(CompetidorMapper.mapCompetidorToCompetidorDTO(detalleCampeonatoCategoriaCompetidor.getCompetidor()));
        detalleCampeonatoCategoriaCompetidorDTO.setDetalleCampeonatoCategoriaDTO(DetalleCampeonatoCategoriaMapper.mapDetalleCampeonatoCategoriaToDetalleCampeonatoCategoriaDTO(detalleCampeonatoCategoriaCompetidor.getDetalleCampeonatoCategoria()));
        return detalleCampeonatoCategoriaCompetidorDTO;
    }

    public static List<DetalleCampeonatoCategoriaCompetidorDTO> mapDetalleCampeonatoCategoriaCompetidorListToDTOList(List<DetalleCampeonatoCategoriaCompetidor> detalleCampeonatoCategoriaCompetidorList){
        return detalleCampeonatoCategoriaCompetidorList.stream().map(
                DetalleCampeonatoCategoriaCompetidorMapper::mapDetalleCampeonatoCategoriaCompetidorToDetalleCampeonatoCategoriaCompetidorDTO
        ).collect(Collectors.toList());
    }
}
