package com.krtpromanager.krtpromanagerSpringBoot.service.interfac;

import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import org.springframework.web.multipart.MultipartFile;

public interface ICampeonatoService {
    
    Response getAllCampeonatos();
    Response getCampeonatoById(String campeonatoId);
}
