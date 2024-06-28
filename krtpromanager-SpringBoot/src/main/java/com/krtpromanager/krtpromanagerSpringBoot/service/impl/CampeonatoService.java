package com.krtpromanager.krtpromanagerSpringBoot.service.impl;

import com.krtpromanager.krtpromanagerSpringBoot.dto.CampeonatoDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Campeonato;
import com.krtpromanager.krtpromanagerSpringBoot.exception.OurException;
import com.krtpromanager.krtpromanagerSpringBoot.mappers.CampeonatoMapper;
import com.krtpromanager.krtpromanagerSpringBoot.repository.CampeonatoRepository;
import com.krtpromanager.krtpromanagerSpringBoot.repository.UsuarioRepository;
import com.krtpromanager.krtpromanagerSpringBoot.service.AwsS3Service;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.ICampeonatoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CampeonatoService implements ICampeonatoService {

    private CampeonatoRepository campeonatoRepository;

    public CampeonatoService(CampeonatoRepository campeonatoRepository, UsuarioRepository usuarioRepository, AwsS3Service awsS3Service) {
        this.campeonatoRepository = campeonatoRepository;
    }


    @Override
    public Response getAllCampeonatos() {
        Response response = new Response();
        try{
            List<Campeonato> campeonatoList = campeonatoRepository.findAll();
            List<CampeonatoDTO> campeonatoDTOList = CampeonatoMapper.mapCampeonatoListToCampeonatoListDTO(campeonatoList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setCampeonatoList(campeonatoDTOList);
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error saving a room: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getCampeonatoById(String campeonatoId) {
        Response response = new Response();
        try{
            Campeonato campeonato = campeonatoRepository.findById(Long.valueOf(campeonatoId)).orElseThrow(()-> new OurException("Campeonato Not Found"));
            CampeonatoDTO campeonatoDTO = CampeonatoMapper.mapCampeonatoToCampeonatoDTO(campeonato);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setCampeonato(campeonatoDTO);

        }catch(OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error getting a room "+ e.getMessage());
        }
        return response;
    }
}