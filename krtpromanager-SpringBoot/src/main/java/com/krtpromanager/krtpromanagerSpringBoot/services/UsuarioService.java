package com.krtpromanager.krtpromanagerSpringBoot.services;

import com.krtpromanager.krtpromanagerSpringBoot.models.Dojo;
import com.krtpromanager.krtpromanagerSpringBoot.models.Usuario;
import com.krtpromanager.krtpromanagerSpringBoot.repositories.DojoRepository;
import com.krtpromanager.krtpromanagerSpringBoot.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DojoRepository dojoRepository;

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

    // Dojo Methods
    @Transactional
    public Usuario saveUsuarioWithDojos(Usuario usuario) {
        Usuario savedUsuario = usuarioRepository.save(usuario);

        if (usuario.getDojos() != null) {
            for (Dojo dojo : usuario.getDojos()) {
                dojo.setUsuario(savedUsuario);
                dojoRepository.save(dojo);
            }
        }
        return savedUsuario;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException(("Usuario no encontrado")));
    }
}
