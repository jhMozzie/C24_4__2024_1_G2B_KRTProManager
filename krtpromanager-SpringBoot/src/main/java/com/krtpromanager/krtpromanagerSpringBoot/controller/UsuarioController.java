package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.IUsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsuarioController {
    private final IUsuarioService usuarioService;
    public UsuarioController(IUsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/get-by-id/{usuarioId}")
    public ResponseEntity<Response> getUserById(@PathVariable("usuarioId") String usuarioId){
        Response response = usuarioService.getUsuarioById(usuarioId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-logged-in-profile-info")
    public ResponseEntity<Response> getLoggedInUsuarioProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = usuarioService.getMyInfo(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/my-info")
    public ResponseEntity<Response> getMyInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = usuarioService.getMyInfo(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}