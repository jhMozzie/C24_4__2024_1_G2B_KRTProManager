package com.krtpromanager.krtpromanagerSpringBoot.service.interfac;

import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.dto.SancionDTO;

public interface ISancionService {
    Response getAllSanciones();
    Response getSancionById(Long id);
    Response getSancionesByCompetidorId(Long competidorId);
}
