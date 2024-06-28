package com.krtpromanager.krtpromanagerSpringBoot.service.interfac;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DetalleCampeonatoCategoriaCompetidorDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;

public interface IDetalleCampeonatoCategoriaCompetidorService {
    Response createDetalleCampeonatoCategoriaCompetidor(DetalleCampeonatoCategoriaCompetidorDTO detalleCampeonatoCategoriaCompetidorDTO, String username);
    Response getDetalleCampeonatoCategoriaCompetidorById(Long id, String username);
    Response getAllDetalleCampeonatoCategoriaCompetidor(String username);
    Response updateDetalleCampeonatoCategoriaCompetidor(DetalleCampeonatoCategoriaCompetidorDTO detalleCampeonatoCategoriaCompetidorDTO, Long id, String username);
    Response deleteDetalleCampeonatoCategoriaCompetidor(Long id, String username);
}
