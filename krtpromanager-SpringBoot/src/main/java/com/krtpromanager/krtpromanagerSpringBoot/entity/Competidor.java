package com.krtpromanager.krtpromanagerSpringBoot.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="Competidor")
public class Competidor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private int edad;
    private String genero;

    @ManyToOne
    @JoinColumn(name = "dojo_id")
    private Dojo dojo;


}
