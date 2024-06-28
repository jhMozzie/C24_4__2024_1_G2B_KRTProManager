package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.dto.CompetidorDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.ICompetidorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/competidores")
public class CompetidorController {
    private final ICompetidorService competidorService;

    // Autenticacion de inicio de sesion
    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public CompetidorController(ICompetidorService competidorService) {
        this.competidorService = competidorService;
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getCompetidoresByAuthenticatedUser() {
        String username = getAuthenticatedUsername();
        Response response = competidorService.getCompetidoresByAuthenticatedUser(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<Response> createCompetidor(@RequestBody CompetidorDTO competidorDTO){
        String username = getAuthenticatedUsername();
        Response response = competidorService.createCompetidor(competidorDTO, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getCompetidorById(@PathVariable Long id) {
        String username = getAuthenticatedUsername();
        Response response = competidorService.getCompetidorById(id, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Response> updateCompetidor(@PathVariable Long id, @RequestBody CompetidorDTO competidorDTO){
        String username = getAuthenticatedUsername();
        Response response = competidorService.updateCompetidor(id, competidorDTO, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Response> deleteCompetidor(@PathVariable Long id){
        String username = getAuthenticatedUsername();
        Response response = competidorService.deleteCompetidor(id, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}