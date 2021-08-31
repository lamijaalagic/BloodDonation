package com.example.springbootbackend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "blood_type")
public class BloodType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Variable bloodType must not be null")
    @Column (name = "blood_type")
    private String bloodType;

    @NotNull(message = "Variable rhFactor must not be null")
    @Column(name = "rh_factor")
    private Boolean rhFactor;

    public BloodType() {
    }

    public BloodType(@NotNull(message = "Variable bloodType must not be null") String bloodType, @NotNull(message = "Variable rhFactor must not be null") Boolean rhFactor) {
        this.bloodType = bloodType;
        this.rhFactor = rhFactor;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    public Boolean getRhFactor() {
        return rhFactor;
    }

    public void setRhFactor(Boolean rhFactor) {
        this.rhFactor = rhFactor;
    }
}
