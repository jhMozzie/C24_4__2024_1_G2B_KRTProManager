package com.krtpromanager.krtpromanagerSpringBoot.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@Table(name = "Campeonato")
public class Campeonato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private LocalDateTime fecha;
    private String local;
    private String provincia;
    private String distrito;
    private String url_bases;
    private String imagen;

    @ManyToOne
    @JoinColumn(name = "dojo_id")
    private Dojo dojo;

    @OneToMany(mappedBy = "campeonato")
    private List<DetalleCampeonatoCategoria> detalleCategoriaCompetidorList = new ArrayList<>();

    @Override
    public String toString() {
        return "Campeonato{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", fecha=" + fecha +
                ", local='" + local + '\'' +
                ", provincia='" + provincia + '\'' +
                ", distrito='" + distrito + '\'' +
                ", url_bases='" + url_bases + '\'' +
                ", imagen='" + imagen + '\'' +
                ", dojo=" + dojo +
                '}';
    }
}