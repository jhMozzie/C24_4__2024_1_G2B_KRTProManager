package com.krtpromanager.krtpromanagerSpringBoot.service;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DojoDto;
import com.krtpromanager.krtpromanagerSpringBoot.model.Dojo;
import com.krtpromanager.krtpromanagerSpringBoot.repository.DojoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DojoService {

    private DojoRepository dojoRepository;

    public DojoService(DojoRepository dojoRepository) {
        this.dojoRepository = dojoRepository;
    }

    public DojoDto createDojo(Dojo dojo) {
        DojoDto response = new DojoDto();
        try{
            Dojo savedDojo = dojoRepository.save(dojo);
            response.setDojo(savedDojo);
            response.setStatusCode(201);
            response.setMessage("Dojo created succesfully");
        }catch(Exception e){
            response.setStatusCode(500);
            response.setError("Error occurred while creatind dojo: " + e.getMessage());
        }
        return response;
    }

    public DojoDto getAllDojos() {
        DojoDto response = new DojoDto();
        try{
            List<Dojo> dojos = dojoRepository.findAll();
            response.setDojoList(dojos);
            response.setStatusCode(200);
            response.setMessage("Dojo retrieved successfully");
        }catch(Exception e){
            response.setStatusCode(500);
            response.setError("Error occurred while retrievieng dojos: "+e.getMessage());
        }
        return response;
    }

    public DojoDto getDojoById(Long id){
        DojoDto response = new DojoDto();
        try{
            Optional<Dojo> dojoOptional = dojoRepository.findById(id);
            if(dojoOptional.isPresent()){
                response.setDojo(dojoOptional.get());
                response.setStatusCode(200);
                response.setMessage("Dojo found successfully");
            }else{
                response.setStatusCode(404);
                response.setMessage("Dojo not found");
            }
        } catch(Exception e){
            response.setStatusCode(500);
            response.setError("Error occurred while retrieving dojo: "+e.getMessage());
        }
        return response;
    }

    public DojoDto updateDojo(Long id, Dojo updatedDojo) {
      DojoDto response = new DojoDto();
      try{
          Optional<Dojo> dojoOptional = dojoRepository.findById(id);
          if(dojoOptional.isPresent()){
              Dojo existingDojo = dojoOptional.get();
              existingDojo.setNombreDojo(updatedDojo.getNombreDojo());
              existingDojo.setSenseiDojo(updatedDojo.getSenseiDojo());

              Dojo savedDojo = dojoRepository.save(existingDojo);
              response.setDojo(savedDojo);
              response.setStatusCode(200);
              response.setMessage("Dojo updated successfully");

          }else{
              response.setStatusCode(404);
              response.setMessage("Dojo not found for update");
          }
      }catch(Exception e){
        response.setStatusCode(500);
        response.setError("Error occurred while updating dojo: " + e.getMessage());
      }

      return response;
    }

    public DojoDto deleteDojo(Long id) {
        DojoDto response = new DojoDto();
        try{
            Optional<Dojo> dojoOptional = dojoRepository.findById(id);
            if(dojoOptional.isPresent()){
                dojoRepository.deleteById(id);
                response.setStatusCode(200);
                response.setMessage("Dojo deleted Successfully");
            } else{
                response.setStatusCode(404);
                response.setMessage("Dojo not found for deletion");
            }
        }catch(Exception e){
            response.setStatusCode(500);
            response.setError("Error occurred while deleting dojo: " + e.getMessage());
        }
        return response;
    }
}
