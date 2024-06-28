package com.krtpromanager.krtpromanagerSpringBoot.mappers;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DetalleCampeonatoCategoriaDTO;
import com.krtpromanager.krtpromanagerSpringBoot.entity.DetalleCampeonatoCategoria;

import java.util.List;
import java.util.stream.Collectors;

public class DetalleCampeonatoCategoriaMapper {
    public static DetalleCampeonatoCategoriaDTO mapDetalleCampeonatoCategoriaToDetalleCampeonatoCategoriaDTO(DetalleCampeonatoCategoria detalleCampeonatoCategoria){
        DetalleCampeonatoCategoriaDTO detalleCampeonatoCategoriaDTO = new DetalleCampeonatoCategoriaDTO();
        detalleCampeonatoCategoriaDTO.setId(detalleCampeonatoCategoria.getId());
        detalleCampeonatoCategoriaDTO.setDescripcionCategoria(detalleCampeonatoCategoria.getCategoria().getDescripcion());
        detalleCampeonatoCategoriaDTO.setGeneroCategoria(detalleCampeonatoCategoria.getCategoria().getGenero());
        detalleCampeonatoCategoriaDTO.setModalidadCategoria(detalleCampeonatoCategoria.getCategoria().getModalidad());
        return detalleCampeonatoCategoriaDTO;
    }

    public static List<DetalleCampeonatoCategoriaDTO> mapDetalleCampeonatoCategoriaListToDetalleCampeonatoCategoriaListDTO(List<DetalleCampeonatoCategoria> detalleCampeonatoCategoriaList){
        return detalleCampeonatoCategoriaList.stream().map(DetalleCampeonatoCategoriaMapper::mapDetalleCampeonatoCategoriaToDetalleCampeonatoCategoriaDTO).collect(Collectors.toList());
    }
}
