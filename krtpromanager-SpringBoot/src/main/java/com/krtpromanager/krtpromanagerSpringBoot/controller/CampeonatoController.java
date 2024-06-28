package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.ICampeonatoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/campeonatos")
public class CampeonatoController {
    private final ICampeonatoService campeonatoService;

    public CampeonatoController(ICampeonatoService campeonatoService) {
        this.campeonatoService = campeonatoService;
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllCampeonatos(){
        Response response = campeonatoService.getAllCampeonatos();
        if (response == null) {
            response = new Response();
            response.setStatusCode(500);
            response.setMessage("Service returned null response");
        }
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{campeonatoId}")
    public ResponseEntity<Response> getCampeonatoById(@PathVariable("campeonatoId") String campeonatoId){
        Response response = campeonatoService.getCampeonatoById(campeonatoId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}