package com.example.springbootbackend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "donations")
public class Donations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Variable user must not be null")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserData user;

    @NotNull(message = "Variable user must not be null")
    @ManyToOne
    @JoinColumn(name = "user_username")
    private UserData receiver;

    @NotNull(message = "Variable donationDate must not be null")
    @Column(name = "donation_date")
    private Date donationDate;

    @NotNull(message = "Variable donationPlace must not be null")
    @Column(name = "donation_place")
    private String donationPlace;

    @NotNull(message = "Variable bloodQuantity must not be null")
    @Column(name = "blood_quantity")
    private int bloodQuantity;

    public Donations() {
    }

    public Donations(@NotNull(message = "Variable user must not be null") UserData user, @NotNull(message = "Variable user must not be null") UserData receiver, @NotNull(message = "Variable donationDate must not be null") Date donationDate, @NotNull(message = "Variable donationPlace must not be null") String donationPlace, @NotNull(message = "Variable bloodQuantity must not be null") int bloodQuantity) {
        this.user = user;
        this.receiver = receiver;
        this.donationDate = donationDate;
        this.donationPlace = donationPlace;
        this.bloodQuantity = bloodQuantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserData getUser() {
        return user;
    }

    public void setUser(UserData user) {
        this.user = user;
    }

    public UserData getReceiver() {
        return receiver;
    }

    public void setReceiver(UserData receiver) {
        this.receiver = receiver;
    }

    public Date getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(Date donationDate) {
        this.donationDate = donationDate;
    }

    public String getDonationPlace() {
        return donationPlace;
    }

    public void setDonationPlace(String donationPlace) {
        this.donationPlace = donationPlace;
    }

    public int getBloodQuantity() {
        return bloodQuantity;
    }

    public void setBloodQuantity(int bloodQuantity) {
        this.bloodQuantity = bloodQuantity;
    }
}
