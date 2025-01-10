package com.uff.project.fintrace.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double necessaryValue;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @Column(nullable = false)
    private Double currentValue;

    @OneToMany(cascade = CascadeType.DETACH, orphanRemoval = true)
    @JoinColumn(name = "goal_id")
    private List<Transaction> transactions = new ArrayList<>(); // transactionsArray


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getNecessaryValue() {
        return necessaryValue;
    }

    public void setNecessaryValue(Double necessaryValue) {
        this.necessaryValue = necessaryValue;
    }

    public Double getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(Double currentValue) {
        this.currentValue = currentValue;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
