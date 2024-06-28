package com.krtpromanager.krtpromanagerSpringBoot.service.impl;

import com.krtpromanager.krtpromanagerSpringBoot.dto.UsuarioDTO;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Usuario;
import com.krtpromanager.krtpromanagerSpringBoot.exception.OurException;
import com.krtpromanager.krtpromanagerSpringBoot.mappers.UsuarioMapper;
import com.krtpromanager.krtpromanagerSpringBoot.repository.UsuarioRepository;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.IUsuarioService;
import com.krtpromanager.krtpromanagerSpringBoot.utils.JWTUtils;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.dto.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService implements IUsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JWTUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Response register(Usuario usuario) {
        Response response = new Response();
        try {
            if(usuarioRepository.existsByUsername(usuario.getUsername())){
                throw new OurException(usuario.getUsername() + "Already Exists");
            }

            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            Usuario savedUser = usuarioRepository.save(usuario);
            UsuarioDTO usuarioDTO = UsuarioMapper.mapUsuarioToUsuarioDTO(savedUser);
            response.setStatusCode(200);
            response.setUsuario(usuarioDTO);

        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Ocurred During User" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response =  new Response();
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            var usuario = usuarioRepository.findByUsername(loginRequest.getUsername()).orElseThrow(()->new OurException("Usuario no encontrado"));
            var token = jwtUtils.generateToken(usuario);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRol(usuario.getRol());
            response.setExpirationTime("7 Days");
            response.setMessage("Successful");
        }catch (OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Ocurred During User" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllUsuarios() {
        Response response = new Response();
        try{
            List<Usuario> usuarioList = usuarioRepository.findAll();
            List<UsuarioDTO> usuarioDTOList = usuarioList.stream().map(UsuarioMapper::mapUsuarioToUsuarioDTO).collect(Collectors.toList());
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUsuarioList(usuarioDTOList);
        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Ocurred During User" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUsuarioById(String usuarioId) {
        Response response = new Response();
        try{
            Usuario usuario = usuarioRepository.findById(Long.valueOf(usuarioId)).orElseThrow(()->new OurException("Usuario no encontrado"));
            UsuarioDTO usuarioDTO = UsuarioMapper.mapUsuarioToUsuarioDTO(usuario);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUsuario(usuarioDTO);

        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Ocurred During User" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String username) {
        Response response = new Response();
        try {
            Optional<Usuario> usuarioOptional = usuarioRepository.findByUsernameWithDojo(username);
            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();
                UsuarioDTO usuarioDTO = UsuarioMapper.mapUsuarioToUsuarioDTO(usuario);
                response.setStatusCode(200);
                response.setMessage("User found");
                response.setUsuario(usuarioDTO);
            } else {
                response.setStatusCode(404);
                response.setMessage("User not found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during user retrieval: " + e.getMessage());
        }
        return response;
    }
}