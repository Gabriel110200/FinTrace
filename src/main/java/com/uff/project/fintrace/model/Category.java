package com.uff.project.fintrace.model;

import jakarta.persistence.*;

import java.util.List;

public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy="category",cascade = CascadeType.ALL)
    private List<Transaction> transactions;

}
