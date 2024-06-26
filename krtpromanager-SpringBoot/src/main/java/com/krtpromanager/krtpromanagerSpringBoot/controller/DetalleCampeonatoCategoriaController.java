package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.IDetalleCampeonatoCategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/detallecampeonatocategoria")
public class DetalleCampeonatoCategoriaController {
    private final IDetalleCampeonatoCategoriaService detalleCampeonatoCategoriaService;
    public DetalleCampeonatoCategoriaController(IDetalleCampeonatoCategoriaService detalleCampeonatoCategoriaService) {
        this.detalleCampeonatoCategoriaService = detalleCampeonatoCategoriaService;
    }
    @GetMapping("/campeonato/{campeonatoId}")
    public ResponseEntity<Response> getCategoriasByCampeonatoId(@PathVariable Long campeonatoId){
        Response response = detalleCampeonatoCategoriaService.getCategoriasByCampeonatoId(campeonatoId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/campeonato/nombre/{nombre}")
    public ResponseEntity<Response> getCategoriasByCampeonato(@PathVariable String nombre) {
        Response response = detalleCampeonatoCategoriaService.getCategoriasByCampeonato(nombre);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}