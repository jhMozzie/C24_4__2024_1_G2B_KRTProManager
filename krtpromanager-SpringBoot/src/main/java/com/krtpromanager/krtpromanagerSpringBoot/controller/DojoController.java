package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.models.Dojo;
import com.krtpromanager.krtpromanagerSpringBoot.services.DojoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/dojos")
public class DojoController {
    @Autowired
    private DojoService dojoService;

    // Obtener todos los dojos
    @GetMapping
    public ResponseEntity<List<Dojo>> getAllDojos() {
        List<Dojo> dojos = dojoService.getAllDojos();
        return ResponseEntity.ok(dojos);
    }

    // Obtener un dojo por ID
    @GetMapping("/{id}")
    public ResponseEntity<Dojo> getDojoById(@PathVariable Long id) {
        Optional<Dojo> dojo = dojoService.getDojoById(id);
        return dojo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo dojo
    @PostMapping
    public ResponseEntity<Dojo> createDojo(@RequestBody Dojo dojo) {
        Dojo createdDojo = dojoService.createDojo(dojo);
        return ResponseEntity.ok(createdDojo);
    }

    // Actualizar un dojo existente
    @PutMapping("/{id}")
    public ResponseEntity<Dojo> updateDojo(@PathVariable Long id, @RequestBody Dojo dojo) {
        Optional<Dojo> updatedDojo = dojoService.updateDojo(id, dojo);
        return updatedDojo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar un dojo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDojo(@PathVariable Long id) {
        boolean deleted = dojoService.deleteDojo(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
