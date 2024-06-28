package com.krtpromanager.krtpromanagerSpringBoot.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="Sancion")
public class Sancion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
