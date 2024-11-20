package com.uff.project.fintrace.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class RecurrencyTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Type type;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    private Category category;

    @Column(name = "amount")
    private Double amount;

    private LocalDate date;
    private String description;

    @Column(name = "\"day\"")
    private int day;

    public RecurrencyTransaction() {}

    public RecurrencyTransaction(Type type, Category category, Double amount, String description, int day) {
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.description = description;
        this.day = day;
    }

    public Type getType() { return type; }
    public void setType(Type type) { this.type = type; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getDay() { return day; }
    public void setDay(int day) { this.day = day; }

    public enum Type {
        RECEITA, DESPESA
    }
}