package com.krtpromanager.krtpromanagerSpringBoot.mappers;

import com.krtpromanager.krtpromanagerSpringBoot.dto.SancionDTO;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Sancion;
import java.util.List;
import java.util.stream.Collectors;

public class SancionMapper {
    public static SancionDTO mapSancionToSancionDTO(Sancion sancion) {
        SancionDTO sancionDTO = new SancionDTO();
        sancionDTO.setId(sancion.getId());
        sancionDTO.setMotivo(sancion.getMotivo());
        sancionDTO.setCompetidorId(sancion.getDetalleCampeonatoCategoriaCompetidor().getCompetidor().getId());
        return sancionDTO;
    }

    public static List<SancionDTO> mapSancionListToSancionListDTO(List<Sancion> sancionList) {
        return sancionList.stream().map(SancionMapper::mapSancionToSancionDTO).collect(Collectors.toList());
    }


}
