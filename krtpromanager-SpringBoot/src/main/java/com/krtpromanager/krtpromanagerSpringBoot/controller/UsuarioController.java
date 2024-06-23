package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.dto.UsuarioDto;
import com.krtpromanager.krtpromanagerSpringBoot.model.Usuario;
import com.krtpromanager.krtpromanagerSpringBoot.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping()
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<UsuarioDto> register(@RequestBody UsuarioDto req){
        return ResponseEntity.ok(usuarioService.registerUsuario(req));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UsuarioDto> login(@RequestBody UsuarioDto req){
        return ResponseEntity.ok(usuarioService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<UsuarioDto> refreshToken(@RequestBody UsuarioDto req){
        return ResponseEntity.ok(usuarioService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<UsuarioDto> getAllUsers() { return ResponseEntity.ok(usuarioService.getAllUsers());}

    @GetMapping("/admin/get-users/{id}")
    public ResponseEntity<UsuarioDto> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(usuarioService.getUsersById(id));
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<UsuarioDto> updateUser(@PathVariable Long id, @RequestBody Usuario usuario){
        return ResponseEntity.ok(usuarioService.updateUser(id, usuario));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<UsuarioDto> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UsuarioDto response = usuarioService.getMyInfo(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<UsuarioDto> deleteUser(@PathVariable Long id){
        return ResponseEntity.ok(usuarioService.deleteUser(id));
    }

}
