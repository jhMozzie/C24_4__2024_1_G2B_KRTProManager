package com.krtpromanager.krtpromanagerSpringBoot.service.impl;

import com.krtpromanager.krtpromanagerSpringBoot.dto.CompetidorDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Competidor;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Dojo;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Usuario;
import com.krtpromanager.krtpromanagerSpringBoot.exception.OurException;
import com.krtpromanager.krtpromanagerSpringBoot.mappers.CompetidorMapper;
import com.krtpromanager.krtpromanagerSpringBoot.repository.CompetidorRepository;
import com.krtpromanager.krtpromanagerSpringBoot.repository.DojoRepository;
import com.krtpromanager.krtpromanagerSpringBoot.repository.UsuarioRepository;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.ICompetidorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetidorService implements ICompetidorService {

    private final CompetidorRepository competidorRepository;
    private final UsuarioRepository usuarioRepository;
    private final DojoRepository dojoRepository;
    @Autowired

    public CompetidorService(CompetidorRepository competidorRepository, UsuarioRepository usuarioRepository, DojoRepository dojoRepository) {
        this.competidorRepository = competidorRepository;
        this.usuarioRepository = usuarioRepository;
        this.dojoRepository = dojoRepository;
    }


    @Override
    public Response getCompetidoresByAuthenticatedUser(String username) {
        Response response = new Response();
        try{
            Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
            List<Competidor> competidorList = competidorRepository.findAllByUsuarioId(usuario.getId());
            List<CompetidorDTO> competidorDTOList = CompetidorMapper.mapCompetidorListToCompetidorListDTO(competidorList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setCompetidorList(competidorDTOList);

        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred: "+e.getMessage());
        }
        return response;
    }

    @Override
    public Response createCompetidor(CompetidorDTO competidorDTO, String username) {
        Response response = new Response();
        try{

            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(()-> new RuntimeException("Usuario no encontrado"));

            Dojo dojo = dojoRepository.findById(usuario.getId())
                    .orElseThrow(()-> new RuntimeException("Dojo no encontrado"));

            Competidor competidor = CompetidorMapper.mapToEntity(competidorDTO, dojo);
            Competidor savedCompetidor = competidorRepository.save(competidor);

            response.setStatusCode(201);
            response.setMessage("Competidor creado exitosamente");
            response.setCompetidor(CompetidorMapper.mapCompetidorToCompetidorDTO(savedCompetidor));

        }catch(OurException e){
            response.setStatusCode(400);
            response.setMessage("Error occurred: "+e.getMessage());
        }
        catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred: "+e.getMessage());
        }
        return response;
    }

    @Override
    public Response getCompetidorById(Long id, String username) {
        Response response = new Response();
        try{
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(()-> new RuntimeException("Usuario not found"));

            Competidor competidor = competidorRepository.findById(id)
                    .orElseThrow(()-> new RuntimeException("Competidor not found"));

            if(!competidor.getDojo().getUsuario().getId().equals(usuario.getId())){
                response.setStatusCode(403);
                response.setMessage("Access Denied");
                return response;
            }

            CompetidorDTO competidorDTO = CompetidorMapper.mapCompetidorToCompetidorDTO(competidor);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setCompetidor(competidorDTO);

        }catch(OurException e){
            response.setStatusCode(400);
            response.setMessage("Error occurred: "+e.getMessage());
        }
        catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred: "+e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateCompetidor(Long id, CompetidorDTO competidorDTO, String username) {
        Response response = new Response();
        try{
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Usuario not found"));

            Competidor competidor = competidorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Competidor not found"));

            if(!competidor.getDojo().getUsuario().getId().equals(usuario.getId())){
                response.setStatusCode(403);
                response.setMessage("Access Denied");
                return response;
            }

            competidor.setNombre(competidorDTO.getNombre());
            competidor.setApellido(competidorDTO.getApellido());
            competidor.setEdad(competidorDTO.getEdad());
            competidor.setGenero(competidorDTO.getGenero());
            Competidor updatedCompetidor = competidorRepository.save(competidor);
            CompetidorDTO updatedCompetidorDTO = CompetidorMapper.mapCompetidorToCompetidorDTO(updatedCompetidor);

            response.setStatusCode(200);
            response.setMessage("Competidor updated successfully");
            response.setCompetidor(updatedCompetidorDTO);

        }catch(OurException e){
            response.setStatusCode(400);
            response.setMessage("Error occurred: "+e.getMessage());
        }
        catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred: "+e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteCompetidor(Long id, String username) {
        Response response = new Response();
        try{
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Usuario not found"));

            Competidor competidor = competidorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario not found"));

            if(!competidor.getDojo().getUsuario().getId().equals(usuario.getId())){
                response.setStatusCode(403);
                response.setMessage("Access Denied");
                return response;
            }

            competidorRepository.delete(competidor);
            response.setStatusCode(200);
            response.setMessage("Competidor delete successfully");

        }catch(OurException e){
            response.setStatusCode(400);
            response.setMessage("Error occurred: "+e.getMessage());
        }
        catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred: "+e.getMessage());
        }
        return response;
    }


}