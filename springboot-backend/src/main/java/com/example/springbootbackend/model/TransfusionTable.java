package com.example.springbootbackend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "transfusion_table")
public class TransfusionTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Variable bloodType must not be null")
    @ManyToOne
    @JoinColumn(name = "blood_type_id")
    private BloodType bloodType;

    @NotNull(message = "Variable user must not be null")
    @OneToOne
    @JoinColumn(name = "user_id")
    private UserData user;

    @NotNull(message = "Variable placeOfNeededDonation must not be null")
    @Column(name = "place_of_needed_donation")
    private String placeOfNeededDonation;

    @NotNull(message = "Variable publishingDate must not be null")
    @Column(name = "publishing_date")
    private Date publishingDate;

    @Column(name = "emergency")
    private boolean emergency = false;

    @NotNull(message = "Variable bloodQuantityNeeded must not be null")
    @Column(name = "blood_quantity_needed")
    private int bloodQuantityNeeded;

    @Column(name = "details")
    private String details = "";

    public TransfusionTable() {
    }

    public TransfusionTable(@NotNull(message = "Variable bloodType must not be null") BloodType bloodType, @NotNull(message = "Variable user must not be null") UserData user, @NotNull(message = "Variable placeOfNeededDonation must not be null") String placeOfNeededDonation, @NotNull(message = "Variable placeOfNeededDonation must not be null") Date publishingDate, boolean emergency, @NotNull(message = "Variable bloodQuantityNeeded must not be null") int bloodQuantityNeeded, String details) {
        this.bloodType = bloodType;
        this.user = user;
        this.placeOfNeededDonation = placeOfNeededDonation;
        this.publishingDate = publishingDate;
        this.emergency = emergency;
        this.bloodQuantityNeeded = bloodQuantityNeeded;
        this.details = details;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BloodType getBloodType() {
        return bloodType;
    }

    public void setBloodType(BloodType bloodType) {
        this.bloodType = bloodType;
    }

    public UserData getUser() {
        return user;
    }

    public void setUser(UserData user) {
        this.user = user;
    }

    public String getPlaceOfNeededDonation() {
        return placeOfNeededDonation;
    }

    public void setPlaceOfNeededDonation(String placeOfNeededDonation) {
        this.placeOfNeededDonation = placeOfNeededDonation;
    }

    public Date getPublishingDate() {
        return publishingDate;
    }

    public void setPublishingDate(Date publishingDate) {
        this.publishingDate = publishingDate;
    }

    public boolean isEmergency() {
        return emergency;
    }

    public void setEmergency(boolean emergency) {
        this.emergency = emergency;
    }

    public int getBloodQuantityNeeded() {
        return bloodQuantityNeeded;
    }

    public void setBloodQuantityNeeded(int bloodQuantityNeeded) {
        this.bloodQuantityNeeded = bloodQuantityNeeded;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
