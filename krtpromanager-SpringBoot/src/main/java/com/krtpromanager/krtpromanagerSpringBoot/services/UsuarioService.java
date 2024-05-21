package com.krtpromanager.krtpromanagerSpringBoot.services;

import com.krtpromanager.krtpromanagerSpringBoot.models.Usuario;
import com.krtpromanager.krtpromanagerSpringBoot.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id){
        return usuarioRepository.findById(id);
    }

    public Usuario createUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> updateUsuario(Long id,Usuario usuario){
        if(!usuarioRepository.existsById(id)){
            return Optional.empty();
        }

        usuario.setId(id);
        return Optional.of(usuarioRepository.save(usuario));
    }

    public boolean deleteUsuario(Long id){
        if(!usuarioRepository.existsById(id)){
            return false;
        }

        usuarioRepository.deleteById(id);
        return true;
    }
}
