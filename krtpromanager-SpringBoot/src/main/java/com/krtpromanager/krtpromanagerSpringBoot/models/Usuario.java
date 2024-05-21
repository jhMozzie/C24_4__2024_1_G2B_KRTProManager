package com.krtpromanager.krtpromanagerSpringBoot.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private Rol rol;
}
