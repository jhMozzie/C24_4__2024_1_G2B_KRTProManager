package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.models.Competidor;
import com.krtpromanager.krtpromanagerSpringBoot.models.Dojo;
import com.krtpromanager.krtpromanagerSpringBoot.services.CompetidorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/competidores")
public class CompetidorController {
    @Autowired
    private CompetidorService competidorService;

    // Obtener todos los competidores
    @GetMapping
    public ResponseEntity<List<Competidor>> getAllDojos(){
        List<Competidor> competidores = competidorService.getAllCompetidores();
        return ResponseEntity.ok(competidores);
    }

    // Obtener competidor por Id
    @GetMapping("/{id}")
    public ResponseEntity<Competidor> getCompetidorById(@PathVariable Long id){
        Optional<Competidor> competidor = competidorService.getCompetidorById(id);
        return competidor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo competidor
    @PostMapping
    public ResponseEntity<Competidor> createCompetidor(@RequestBody Competidor competidor){
        Competidor createdCompetidor = competidorService.createCompetidor(competidor);
        return ResponseEntity.ok(createdCompetidor);
    }

    // Actualizar competidor
    @PutMapping("/{id}")
    public ResponseEntity<Competidor> updateCompetidor(@PathVariable Long id, @RequestBody Competidor competidor){
        Optional<Competidor> updatedCompetidor = competidorService.updateCompetidor(id, competidor);
        return updatedCompetidor.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompetidor(@PathVariable Long id){
        boolean deleted = competidorService.deleteCompetidor(id);
        if(deleted){
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
