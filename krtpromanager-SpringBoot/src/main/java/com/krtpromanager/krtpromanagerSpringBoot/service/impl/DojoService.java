package com.krtpromanager.krtpromanagerSpringBoot.service.impl;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DojoDTO;
import com.krtpromanager.krtpromanagerSpringBoot.dto.Response;
import com.krtpromanager.krtpromanagerSpringBoot.entity.Dojo;
import com.krtpromanager.krtpromanagerSpringBoot.exception.OurException;
import com.krtpromanager.krtpromanagerSpringBoot.mappers.DojoMapper;
import com.krtpromanager.krtpromanagerSpringBoot.repository.DojoRepository;
import com.krtpromanager.krtpromanagerSpringBoot.service.interfac.IDojoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DojoService implements IDojoService {
    private final DojoRepository dojoRepository;

    public DojoService(DojoRepository dojoRepository) {
        this.dojoRepository = dojoRepository;
    }

}
