package com.krtpromanager.krtpromanagerSpringBoot.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descripcion;
    private String genero;
    private String grado;
    private String modalidad;

    @OneToMany(mappedBy = "categoria")
    private List<DetalleCampeonatoCategoria> detalleCategoriaCompetidorList = new ArrayList<>();

}
