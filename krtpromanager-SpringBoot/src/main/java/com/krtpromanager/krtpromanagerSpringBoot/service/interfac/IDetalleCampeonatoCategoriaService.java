package com.krtpromanager.krtpromanagerSpringBoot.service.interfac;

import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;

public interface IDetalleCampeonatoCategoriaService {
    Response getCategoriasByCampeonatoId(Long campeonatoId);
    Response getCategoriasByCampeonato(String username);
}