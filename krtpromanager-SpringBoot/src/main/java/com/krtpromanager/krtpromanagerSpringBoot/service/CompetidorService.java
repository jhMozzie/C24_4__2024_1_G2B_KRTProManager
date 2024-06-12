package com.krtpromanager.krtpromanagerSpringBoot.service;

import com.krtpromanager.krtpromanagerSpringBoot.model.Competidor;
import com.krtpromanager.krtpromanagerSpringBoot.repository.CompetidorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompetidorService {

    @Autowired
    private CompetidorRepository competidorRepository;

    public List<Competidor> getAllCompetidores(){
        return competidorRepository.findAll();
    }

    public Optional<Competidor> getCompetidorById(Long id){
        return competidorRepository.findById(id);
    }

    public Competidor createCompetidor(Competidor competidor){
        return competidorRepository.save(competidor);
    }

    public Optional<Competidor> updateCompetidor(Long id, Competidor competidor){
        if (!competidorRepository.existsById(id)){
            return Optional.empty();
        }

        competidor.setId(id);
        return Optional.of(competidorRepository.save(competidor));
    }

    public boolean deleteCompetidor(Long id){
        if (!competidorRepository.existsById(id)){
            return false;
        }

        competidorRepository.deleteById(id);
        return true;
    }
}
