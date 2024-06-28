package com.krtpromanager.krtpromanagerSpringBoot.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "detallecampeonatocategoria")
public class DetalleCampeonatoCategoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "campeonato_id")
    private Campeonato campeonato;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}