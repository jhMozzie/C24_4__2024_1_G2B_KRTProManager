package com.krtpromanager.krtpromanagerSpringBoot.service;

import com.krtpromanager.krtpromanagerSpringBoot.model.Dojo;
import com.krtpromanager.krtpromanagerSpringBoot.repository.DojoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DojoService {

    @Autowired
    private DojoRepository dojoRepository;

    public List<Dojo> getAllDojos() {
        return dojoRepository.findAll();
    }

    public Optional<Dojo> getDojoById(Long id) {
        return dojoRepository.findById(id);
    }

    public Dojo createDojo(Dojo dojo) {
        return dojoRepository.save(dojo);
    }

    public Optional<Dojo> updateDojo(Long id, Dojo dojo) {
        if (!dojoRepository.existsById(id)) {
            return Optional.empty();
        }

        dojo.setId(id);
        return Optional.of(dojoRepository.save(dojo));
    }

    public boolean deleteDojo(Long id) {
        if (!dojoRepository.existsById(id)) {
            return false;
        }

        dojoRepository.deleteById(id);
        return true;
    }
}
