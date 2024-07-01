package com.krtpromanager.krtpromanagerSpringBoot.service.impl;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DetalleCampeonatoCategoriaDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.entity.DetalleCampeonatoCategoria;
import com.krtpromanager.krtpromanagerSpringBoot.mappers.DetalleCampeonatoCategoriaMapper;
import com.krtpromanager.krtpromanagerSpringBoot.repository.DetalleCampeonatoCategoriaRepository;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.IDetalleCampeonatoCategoriaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetalleCampeonatoCategoriaService implements IDetalleCampeonatoCategoriaService {

    private final DetalleCampeonatoCategoriaRepository detalleCampeonatoCategoriaRepository;

    public DetalleCampeonatoCategoriaService(DetalleCampeonatoCategoriaRepository detalleCampeonatoCategoriaRepository) {
        this.detalleCampeonatoCategoriaRepository = detalleCampeonatoCategoriaRepository;
    }

    @Override
    public Response getCategoriasByCampeonatoId(Long campeonatoId) {
        Response response = new Response();
        try {
            List<DetalleCampeonatoCategoria> detalleCampeonatoCategoriaList = detalleCampeonatoCategoriaRepository.findByCampeonatoId(campeonatoId);
            List<DetalleCampeonatoCategoriaDTO> detalleCampeonatoCategoriaDTOList = DetalleCampeonatoCategoriaMapper.mapDetalleCampeonatoCategoriaListToDetalleCampeonatoCategoriaListDTO(detalleCampeonatoCategoriaList);
            response.setStatusCode(200);
            response.setMessage("Categorías encontradas exitosamente");
            response.setDetalleCampeonatoCategoriaList(detalleCampeonatoCategoriaDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getCategoriasByCampeonato(String nombre) {
        Response response = new Response();
        try {
            List<DetalleCampeonatoCategoria> detalleCampeonatoCategoriaList = detalleCampeonatoCategoriaRepository.findByCampeonatoNombre(nombre);
            List<DetalleCampeonatoCategoriaDTO> detalleCampeonatoCategoriaDTOList = DetalleCampeonatoCategoriaMapper.mapDetalleCampeonatoCategoriaListToDetalleCampeonatoCategoriaListDTO(detalleCampeonatoCategoriaList);
            response.setStatusCode(200);
            response.setMessage("Categorías encontradas exitosamente");
            response.setDetalleCampeonatoCategoriaList(detalleCampeonatoCategoriaDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }
}