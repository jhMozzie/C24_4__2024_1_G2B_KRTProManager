package com.krtpromanager.krtpromanagerSpringBoot.service.impl;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DetalleCampeonatoCategoriaCompetidorDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.entity.*;
import com.krtpromanager.krtpromanagerSpringBoot.exception.OurException;
import com.krtpromanager.krtpromanagerSpringBoot.mappers.DetalleCampeonatoCategoriaCompetidorMapper;
import com.krtpromanager.krtpromanagerSpringBoot.repository.*;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.IDetalleCampeonatoCategoriaCompetidorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetalleCampeonatoCategoriaCompetidorService implements IDetalleCampeonatoCategoriaCompetidorService {
    private DetalleCampeonatoCategoriaCompetidorRepository detalleCampeonatoCategoriaCompetidorRepository;

    public DetalleCampeonatoCategoriaCompetidorService(DetalleCampeonatoCategoriaCompetidorRepository detalleCampeonatoCategoriaCompetidorRepository, UsuarioRepository usuarioRepository, DojoRepository dojoRepository, CompetidorRepository competidorRepository, DetalleCampeonatoCategoriaRepository detalleCampeonatoCategoriaRepository) {
        this.detalleCampeonatoCategoriaCompetidorRepository = detalleCampeonatoCategoriaCompetidorRepository;
        this.usuarioRepository = usuarioRepository;
        this.dojoRepository = dojoRepository;
        this.competidorRepository = competidorRepository;
        this.detalleCampeonatoCategoriaRepository = detalleCampeonatoCategoriaRepository;
    }

    private final UsuarioRepository usuarioRepository;
    private final DojoRepository dojoRepository;
    private final CompetidorRepository competidorRepository;
    private final DetalleCampeonatoCategoriaRepository detalleCampeonatoCategoriaRepository;

    @Override
    public Response createDetalleCampeonatoCategoriaCompetidor(DetalleCampeonatoCategoriaCompetidorDTO detalleCampeonatoCategoriaCompetidorDTO, String username) {
        Response response = new Response();
        try{
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new OurException("Usuario no encontrado"));
            Dojo dojo = dojoRepository.findById(usuario.getDojo().getId())
                    .orElseThrow(() -> new OurException("Dojo no encontrado"));
            Competidor competidor = competidorRepository.findById(detalleCampeonatoCategoriaCompetidorDTO.getCompetidorDTO().getId())
                    .orElseThrow(() -> new OurException("Competidor no encontrado en el dojo del usuario"));

            // Verificar que el competidor pertenece al dojo del usuario autenticado
            if (!competidor.getDojo().getId().equals(dojo.getId())) {
                throw new OurException("Competidor no pertenece al dojo del usuario autenticado");
            }

            DetalleCampeonatoCategoria detalleCampeonatoCategoria = detalleCampeonatoCategoriaRepository.findById(detalleCampeonatoCategoriaCompetidorDTO.getDetalleCampeonatoCategoriaDTO().getId())
                    .orElseThrow(() -> new OurException("Detalle de campeonato no encontrado"));

            DetalleCampeonatoCategoriaCompetidor detalleCampeonatoCategoriaCompetidor = new DetalleCampeonatoCategoriaCompetidor();
            detalleCampeonatoCategoriaCompetidor.setCompetidor(competidor);
            detalleCampeonatoCategoriaCompetidor.setDetalleCampeonatoCategoria(detalleCampeonatoCategoria);
            DetalleCampeonatoCategoriaCompetidor savedDetalleCampeonatoCategoriaCompetidor = detalleCampeonatoCategoriaCompetidorRepository.save(detalleCampeonatoCategoriaCompetidor);

            response.setStatusCode(201);
            response.setMessage("Detalle de campeonato categoría competidor creado exitosamente");
            response.setDetalleCampeonatoCategoriaCompetidorDTO(
                    DetalleCampeonatoCategoriaCompetidorMapper.mapDetalleCampeonatoCategoriaCompetidorToDetalleCampeonatoCategoriaCompetidorDTO(savedDetalleCampeonatoCategoriaCompetidor)
            );

        }catch(OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch(Exception e){
            response.setStatusCode(400);
            response.setMessage("Error occurred: "+e.getMessage());
        }

        return response;
    }

    @Override
    public Response getDetalleCampeonatoCategoriaCompetidorById(Long id, String username) {
        Response response = new Response();
        try {
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new OurException("Usuario no encontrado"));
            Dojo dojo = usuario.getDojo();

            DetalleCampeonatoCategoriaCompetidor detalleCampeonatoCategoriaCompetidor = detalleCampeonatoCategoriaCompetidorRepository.findById(id)
                    .orElseThrow(() -> new OurException("Detalle de campeonato categoría competidor no encontrado"));

            if (!detalleCampeonatoCategoriaCompetidor.getCompetidor().getDojo().getId().equals(dojo.getId())) {
                throw new OurException("Acceso denegado");
            }

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setDetalleCampeonatoCategoriaCompetidorDTO(
                    DetalleCampeonatoCategoriaCompetidorMapper.mapDetalleCampeonatoCategoriaCompetidorToDetalleCampeonatoCategoriaCompetidorDTO(detalleCampeonatoCategoriaCompetidor)
            );
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllDetalleCampeonatoCategoriaCompetidor(String username) {
        Response response = new Response();
        try {
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new OurException("Usuario no encontrado"));
            Dojo dojo = usuario.getDojo();

            List<DetalleCampeonatoCategoriaCompetidor> detalleCampeonatoCategoriaCompetidorList = detalleCampeonatoCategoriaCompetidorRepository.findAll().stream()
                    .filter(d -> d.getCompetidor().getDojo().getId().equals(dojo.getId()))
                    .collect(Collectors.toList());

            List<DetalleCampeonatoCategoriaCompetidorDTO> detalleCampeonatoCategoriaCompetidorDTOList = detalleCampeonatoCategoriaCompetidorList.stream()
                    .map(DetalleCampeonatoCategoriaCompetidorMapper::mapDetalleCampeonatoCategoriaCompetidorToDetalleCampeonatoCategoriaCompetidorDTO)
                    .collect(Collectors.toList());
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setDetalleCampeonatoCategoriaCompetidorDTOList(detalleCampeonatoCategoriaCompetidorDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateDetalleCampeonatoCategoriaCompetidor(DetalleCampeonatoCategoriaCompetidorDTO detalleCampeonatoCategoriaCompetidorDTO, Long id, String username) {
        Response response = new Response();
        try {
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new OurException("Usuario no encontrado"));
            Dojo dojo = usuario.getDojo();

            DetalleCampeonatoCategoriaCompetidor detalleCampeonatoCategoriaCompetidor = detalleCampeonatoCategoriaCompetidorRepository.findById(id)
                    .orElseThrow(() -> new OurException("Detalle de campeonato categoría competidor no encontrado"));

            if (!detalleCampeonatoCategoriaCompetidor.getCompetidor().getDojo().getId().equals(dojo.getId())) {
                throw new OurException("Acceso denegado");
            }

            Competidor competidor = competidorRepository.findById(detalleCampeonatoCategoriaCompetidorDTO.getCompetidorDTO().getId())
                    .orElseThrow(() -> new OurException("Competidor no encontrado"));
            DetalleCampeonatoCategoria detalleCampeonatoCategoria = detalleCampeonatoCategoriaRepository.findById(detalleCampeonatoCategoriaCompetidorDTO.getDetalleCampeonatoCategoriaDTO().getId())
                    .orElseThrow(() -> new OurException("Detalle de campeonato categoría no encontrado"));

            detalleCampeonatoCategoriaCompetidor.setCompetidor(competidor);
            detalleCampeonatoCategoriaCompetidor.setDetalleCampeonatoCategoria(detalleCampeonatoCategoria);

            DetalleCampeonatoCategoriaCompetidor updatedDetalleCampeonatoCategoriaCompetidor = detalleCampeonatoCategoriaCompetidorRepository.save(detalleCampeonatoCategoriaCompetidor);

            response.setStatusCode(200);
            response.setMessage("Detalle de campeonato categoría competidor actualizado exitosamente");
            response.setDetalleCampeonatoCategoriaCompetidorDTO(
                    DetalleCampeonatoCategoriaCompetidorMapper.mapDetalleCampeonatoCategoriaCompetidorToDetalleCampeonatoCategoriaCompetidorDTO(updatedDetalleCampeonatoCategoriaCompetidor)
            );

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteDetalleCampeonatoCategoriaCompetidor(Long id, String username) {
        Response response = new Response();
        try {
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new OurException("Usuario no encontrado"));
            Dojo dojo = usuario.getDojo();

            DetalleCampeonatoCategoriaCompetidor detalleCampeonatoCategoriaCompetidor = detalleCampeonatoCategoriaCompetidorRepository.findById(id)
                    .orElseThrow(() -> new OurException("Detalle de campeonato categoría competidor no encontrado"));

            if (!detalleCampeonatoCategoriaCompetidor.getCompetidor().getDojo().getId().equals(dojo.getId())) {
                throw new OurException("Acceso denegado");
            }

            detalleCampeonatoCategoriaCompetidorRepository.delete(detalleCampeonatoCategoriaCompetidor);

            response.setStatusCode(200);
            response.setMessage("Detalle de campeonato categoría competidor eliminado exitosamente");
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }
}

