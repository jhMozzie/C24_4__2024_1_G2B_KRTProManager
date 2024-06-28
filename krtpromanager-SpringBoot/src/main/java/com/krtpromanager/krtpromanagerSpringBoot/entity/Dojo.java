package com.krtpromanager.krtpromanagerSpringBoot.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Dojo")
public class Dojo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "nombre dojo is required")
    @Column(name = "nombreDojo")
    private String nombreDojo;

    @NotNull(message = "sensei dojo is required")
    @Column(name = "senseiDojo")
    private String senseiDojo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "dojo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Campeonato> campeonatos = new ArrayList<>();

    @OneToMany(mappedBy = "dojo")
    private List<Competidor> competidores = new ArrayList<>();

    @Override
    public String toString() {
        return "Dojo{" +
                "id=" + id +
                ", nombreDojo='" + nombreDojo + '\'' +
                ", senseiDojo='" + senseiDojo + '\'' +
                ", usuario=" + usuario +
                ", campeonatos=" + campeonatos +
                '}';
    }
}