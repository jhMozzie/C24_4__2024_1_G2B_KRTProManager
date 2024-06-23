package com.krtpromanager.krtpromanagerSpringBoot.controller;

import com.krtpromanager.krtpromanagerSpringBoot.dto.DojoDto;
import com.krtpromanager.krtpromanagerSpringBoot.model.Dojo;
import com.krtpromanager.krtpromanagerSpringBoot.service.DojoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/dojo")
public class DojoController {

    private DojoService dojoService;

    public DojoController(DojoService dojoService) {
        this.dojoService = dojoService;
    }

    @PostMapping("/create-dojo")
    public ResponseEntity<DojoDto> createDojo(@RequestBody Dojo dojo){
        return ResponseEntity.ok(dojoService.createDojo(dojo));
    }

    @GetMapping("/get-all-dojos")
    public ResponseEntity<DojoDto> getAllDojos(){
        return ResponseEntity.ok(dojoService.getAllDojos());
    }

    @GetMapping("/get-dojo/{id}")
    public ResponseEntity<DojoDto> getDojoById(@PathVariable Long id){
        return ResponseEntity.ok(dojoService.getDojoById(id));
    }

    @PutMapping("/update-dojo/{id}")
    public ResponseEntity<DojoDto> updateDojo(@PathVariable Long id, @RequestBody Dojo dojo){
        return ResponseEntity.ok(dojoService.updateDojo(id, dojo));
    }

    @DeleteMapping("/delete-dojo/{id}")
    public ResponseEntity<DojoDto> deleteDojo(@PathVariable Long id){
        return ResponseEntity.ok(dojoService.deleteDojo(id));
    }
}
