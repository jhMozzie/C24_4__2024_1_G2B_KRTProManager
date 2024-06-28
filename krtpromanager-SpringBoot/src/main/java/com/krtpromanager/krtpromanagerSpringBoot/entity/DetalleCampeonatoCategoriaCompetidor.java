package com.krtpromanager.krtpromanagerSpringBoot.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "detallecampeonatocategoriacompetidor")
public class DetalleCampeonatoCategoriaCompetidor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "competidor_id")
    private Competidor competidor;

    @ManyToOne
    @JoinColumn(name = "categoria_campeonato_id")
    private DetalleCampeonatoCategoria detalleCampeonatoCategoria;
}
