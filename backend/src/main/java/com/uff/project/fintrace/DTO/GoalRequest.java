package com.uff.project.fintrace.DTO;

import com.uff.project.fintrace.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class GoalRequest {


    private String description;

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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    private Double necessaryValue;

    private int userId;


}
