package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DetalleCampeonatoCategoriaCompetidorDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.IDetalleCampeonatoCategoriaCompetidorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/detallecampeonatocategoriacompetidor")
public class DetalleCampeonatoCategoriaCompetidorController {
    private final IDetalleCampeonatoCategoriaCompetidorService detalleCampeonatoCategoriaCompetidorService;

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
    public DetalleCampeonatoCategoriaCompetidorController(IDetalleCampeonatoCategoriaCompetidorService detalleCampeonatoCategoriaCompetidorService) {
        this.detalleCampeonatoCategoriaCompetidorService = detalleCampeonatoCategoriaCompetidorService;
    }

    @PostMapping("/create")
    public ResponseEntity<Response> createDetalleCampeonatoCategoriaCompetidor(@RequestBody DetalleCampeonatoCategoriaCompetidorDTO detalleCampeonatoCategoriaCompetidorDTO) {
        String username = getAuthenticatedUsername();
        Response response = detalleCampeonatoCategoriaCompetidorService.createDetalleCampeonatoCategoriaCompetidor(detalleCampeonatoCategoriaCompetidorDTO, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Response> getDetalleCampeonatoCategoriaCompetidorById(@PathVariable Long id) {
        String username = getAuthenticatedUsername();
        Response response = detalleCampeonatoCategoriaCompetidorService.getDetalleCampeonatoCategoriaCompetidorById(id, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllDetalleCampeonatoCategoriaCompetidor() {
        String username = getAuthenticatedUsername();
        Response response = detalleCampeonatoCategoriaCompetidorService.getAllDetalleCampeonatoCategoriaCompetidor(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response> updateDetalleCampeonatoCategoriaCompetidor(@RequestBody DetalleCampeonatoCategoriaCompetidorDTO detalleCampeonatoCategoriaCompetidorDTO, @PathVariable Long id) {
        String username = getAuthenticatedUsername();
        Response response = detalleCampeonatoCategoriaCompetidorService.updateDetalleCampeonatoCategoriaCompetidor(detalleCampeonatoCategoriaCompetidorDTO, id, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteDetalleCampeonatoCategoriaCompetidor(@PathVariable Long id) {
        String username = getAuthenticatedUsername();
        Response response = detalleCampeonatoCategoriaCompetidorService.deleteDetalleCampeonatoCategoriaCompetidor(id, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


}