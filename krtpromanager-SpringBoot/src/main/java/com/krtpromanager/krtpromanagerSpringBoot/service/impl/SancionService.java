package com.krtpromanager.krtpromanagerSpringBoot.service.impl;

import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.dto.SancionDTO;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Sancion;
import com.krtpromanager.krtpromanagerSpringBoot.mappers.SancionMapper;
import com.krtpromanager.krtpromanagerSpringBoot.repository.SancionRepository;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.ISancionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SancionService implements ISancionService {

    private final SancionRepository sancionRepository;

    public SancionService(SancionRepository sancionRepository) {
        this.sancionRepository = sancionRepository;
    }

    @Override
    public Response getAllSanciones() {
        Response response = new Response();
        try {
            List<Sancion> sancionList = sancionRepository.findAll();
            List<SancionDTO> sancionDTOList = SancionMapper.mapSancionListToSancionListDTO(sancionList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setSancionList(sancionDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getSancionById(Long id) {
        Response response = new Response();
        try {
            Optional<Sancion> sancionOptional = sancionRepository.findById(id);
            if (sancionOptional.isPresent()) {
                SancionDTO sancionDTO = SancionMapper.mapSancionToSancionDTO(sancionOptional.get());
                response.setStatusCode(200);
                response.setMessage("Successful");
                response.setSancion(sancionDTO);
            } else {
                response.setStatusCode(404);
                response.setMessage("Sancion not found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getSancionesByCompetidorId(Long competidorId) {
        Response response = new Response();
        try {
            List<Sancion> sancionList = sancionRepository.findByDetalleCampeonatoCategoriaCompetidor_Competidor_Id(competidorId);
            List<SancionDTO> sancionDTOList = SancionMapper.mapSancionListToSancionListDTO(sancionList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setSancionList(sancionDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }
}
