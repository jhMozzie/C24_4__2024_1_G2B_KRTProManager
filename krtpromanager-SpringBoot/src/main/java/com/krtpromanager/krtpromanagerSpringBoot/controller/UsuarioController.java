package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.models.Usuario;
import com.krtpromanager.krtpromanagerSpringBoot.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping()
    public List<Usuario> getAllUsuarios(){
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable("id") Long id){
        Optional<Usuario> usuarioById = usuarioService.getUsuarioById(id);
        return usuarioById.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build()
        );
    }

    @PostMapping
    public ResponseEntity<Usuario> createdUsuario(@RequestBody Usuario usuario){
        Usuario createUsuario = usuarioService.createUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(createUsuario);
    }

    @PutMapping("{id}")
    public ResponseEntity<Usuario> updatedUsuario(@PathVariable("id") Long id, @RequestBody Usuario usuario){
        Optional<Usuario> updateUsuario = usuarioService.updateUsuario(id, usuario);
        return updateUsuario.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.noContent().build()
        );
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletedProductById(@PathVariable("id") Long id){
        boolean deleted = usuarioService.deleteUsuario(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
