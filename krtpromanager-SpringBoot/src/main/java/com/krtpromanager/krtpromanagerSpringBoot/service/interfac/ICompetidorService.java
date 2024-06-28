package com.krtpromanager.krtpromanagerSpringBoot.service.interfac;

import com.krtpromanager.krtpromanagerSpringBoot.dto.CompetidorDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;

public interface ICompetidorService {
    Response getCompetidoresByAuthenticatedUser(String username);
    Response createCompetidor(CompetidorDTO competidorDTO, String username);
    Response getCompetidorById(Long id, String username);
    Response updateCompetidor(Long id, CompetidorDTO competidorDTO, String username);
    Response deleteCompetidor(Long id, String username);  // Nuevo método

}
