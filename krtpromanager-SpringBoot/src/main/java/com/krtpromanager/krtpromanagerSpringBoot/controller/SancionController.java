package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.ISancionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sanciones")
public class SancionController {
    private final ISancionService sancionService;

    public SancionController(ISancionService sancionService) {
        this.sancionService = sancionService;
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllSanciones() {
        Response response = sancionService.getAllSanciones();
        if (response == null) {
            response = new Response();
            response.setStatusCode(500);
            response.setMessage("Service returned null response");
        }
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getSancionById(@PathVariable("id") Long id) {
        Response response = sancionService.getSancionById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/competidor/{competidorId}")
    public ResponseEntity<Response> getSancionesByCompetidorId(@PathVariable("competidorId") Long competidorId) {
        Response response = sancionService.getSancionesByCompetidorId(competidorId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
