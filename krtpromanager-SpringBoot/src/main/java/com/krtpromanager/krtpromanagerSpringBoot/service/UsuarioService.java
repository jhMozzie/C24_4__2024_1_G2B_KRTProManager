package com.krtpromanager.krtpromanagerSpringBoot.service;

import com.krtpromanager.krtpromanagerSpringBoot.config.JwtUtils;
import com.krtpromanager.krtpromanagerSpringBoot.dto.UsuarioDto;
import com.krtpromanager.krtpromanagerSpringBoot.model.Rol;
import com.krtpromanager.krtpromanagerSpringBoot.model.Usuario;
import com.krtpromanager.krtpromanagerSpringBoot.repository.UsuarioRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final JwtUtils jwtUtils;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public UsuarioService(JwtUtils jwtUtils, UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.jwtUtils = jwtUtils;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public UsuarioDto refreshToken(UsuarioDto refreshTokenRequest){
        UsuarioDto response = new UsuarioDto();
        try{
            String username = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow();
            if(jwtUtils.isTokenValid(refreshTokenRequest.getToken(), usuario)){
                var jwt = jwtUtils.generateToken(usuario);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(response.getToken());
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public UsuarioDto registerUsuario(UsuarioDto registrationRequest) {
        UsuarioDto response = new UsuarioDto();
        try {
            Usuario usuario = new Usuario();
            usuario.setNombre(registrationRequest.getNombre());
            usuario.setApellido(registrationRequest.getApellido());
            usuario.setEmail(registrationRequest.getEmail());
            usuario.setUsername(registrationRequest.getUsername());
            usuario.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

            usuario.setRol(Rol.valueOf(registrationRequest.getRol()));

            Usuario usuarioResult = usuarioRepository.save(usuario);
            if (usuarioResult.getId() != null) {
                response.setUsuario(usuarioResult);
                response.setStatusCode(200);
                response.setMessage("Usuario registrado exitosamente");
            }
        } catch (IllegalArgumentException e) {
            response.setStatusCode(400);
            response.setError("Rol inválido: " + e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public UsuarioDto login(UsuarioDto loginRequest) {
        UsuarioDto response = new UsuarioDto();
        try{
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                            loginRequest.getPassword()));

            var usuario = usuarioRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
            var jwt = jwtUtils.generateToken(usuario);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), usuario);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24hrs");
            response.setMessage("Successfully Logged");
        } catch(Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    public UsuarioDto getAllUsers(){
        UsuarioDto response = new UsuarioDto();
        try{
            List<Usuario> result = usuarioRepository.findAll();
            if(!result.isEmpty()){
                response.setUsuarioList(result);
                response.setStatusCode(200);
                response.setMessage("Succesfully");
            }else{
                response.setStatusCode(404);
                response.setMessage("No users found");
            }

            return response;
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
            return response;
        }
    }

    public UsuarioDto getUsersById(Long id){
        UsuarioDto response = new UsuarioDto();
        try{
            Usuario usuarioById = usuarioRepository.findById(id).orElseThrow();
            response.setUsuario(usuarioById);
            response.setStatusCode(200);
            response.setMessage("Usuario with id '"+id+"' found successfully");
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error ocurred: "+e.getMessage());
        }
        return response;
    }

    public UsuarioDto deleteUser(Long id){
        UsuarioDto response = new UsuarioDto();

        try{
            Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
            if(usuarioOptional.isPresent()){
                usuarioRepository.deleteById(id);
                response.setStatusCode(200);
                response.setMessage("User deleted successfully");
            }else{
                response.setStatusCode(404);
                response.setMessage("User not found for deletion");
            }
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred while deleting user: "+e.getMessage());
        }

        return response;
    }

    public UsuarioDto updateUser(Long id, Usuario updatedUsuario){
        UsuarioDto response = new UsuarioDto();
        try{
            Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
            if(usuarioOptional.isPresent()){
                Usuario existingUsuario = usuarioOptional.get();
                existingUsuario.setNombre(updatedUsuario.getNombre());
                existingUsuario.setApellido(updatedUsuario.getApellido());
                existingUsuario.setEmail(updatedUsuario.getEmail());
                existingUsuario.setUsername(updatedUsuario.getUsername());

                if(updatedUsuario.getPassword() != null && !updatedUsuario.getPassword().isEmpty()){
                    existingUsuario.setPassword(passwordEncoder.encode(updatedUsuario.getPassword()));
                }

                Usuario savedUsuario = usuarioRepository.save(existingUsuario);

                response.setUsuario(savedUsuario);
                response.setStatusCode(200);
                response.setMessage("User updated successfully");

            } else {
                response.setStatusCode(404);
                response.setMessage("User not found for update");
            }
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred while updating user: " + e.getMessage());
        }

        return response;
    }

    public UsuarioDto getMyInfo(String username){
        UsuarioDto response = new UsuarioDto();
        try{
            Optional<Usuario> usuarioOptional = usuarioRepository.findByUsername(username);
            if(usuarioOptional.isPresent()){
                response.setUsuario(usuarioOptional.get());
                response.setStatusCode(200);
                response.setMessage("Successful");
            }
            else{
                response.setStatusCode(500);
                response.setMessage("User not found profile");
            }
        } catch(Exception e){
            response.setStatusCode(500);
            response.setMessage("Erro occurred while getting user info: " + e.getMessage());
        }

        return response;
    }
}
