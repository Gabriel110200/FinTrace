package com.uff.project.fintrace.DTO;

import com.opencsv.bean.CsvBindByName;


public class TransactionCsvDto {

    @CsvBindByName(column = "description")
    private String description;

    @CsvBindByName(column = "amount")
    private Double amount;

    @CsvBindByName(column = "date")
    private String date;

    @CsvBindByName(column = "type")
    private String type;

    @CsvBindByName(column = "isRecurring")
    private String isRecurring;

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    @CsvBindByName(column = "categoryId")
    private String categoryId;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIsRecurring() {
        return isRecurring;
    }

    public void setIsRecurring(String isRecurring) {
        this.isRecurring = isRecurring;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    @Override
    public String toString() {
        return "SimpleTransactionCsvDto{" +
                "description='" + description + '\'' +
                '}';
    }
}