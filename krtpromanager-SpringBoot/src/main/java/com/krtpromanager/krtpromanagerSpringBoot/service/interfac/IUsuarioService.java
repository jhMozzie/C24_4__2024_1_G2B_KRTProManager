package com.krtpromanager.krtpromanagerSpringBoot.service.interfac;

import com.krtpromanager.krtpromanagerSpringBoot.dto.LoginRequest;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Usuario;

public interface IUsuarioService {
    Response register(Usuario register);
    Response login(LoginRequest loginRequest);
    Response getAllUsuarios();
    Response getUsuarioById(String usuarioId);
    Response getMyInfo(String username);

}
