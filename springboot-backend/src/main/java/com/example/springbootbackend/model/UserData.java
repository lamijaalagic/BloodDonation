package com.example.springbootbackend.model;

import javax.validation.constraints.NotNull;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table (name = "user")
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Variable typeOfBlood must not be null")
    @ManyToOne
    @JoinColumn(name = "blood_type_id")
    private BloodType typeOfBlood;

    @NotNull(message = "Variable role must not be null")
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @NotNull(message = "Variable username must not be null")
    @Column(name = "username")
    private String username;

    @NotNull(message = "Variable password must not be null")
    @Column(name = "password")
    private String password;

    @NotNull(message = "Variable first name must not be null")
    @Column(name = "first_name")
    private String firstname;

    @NotNull(message = "Variable last name must not be null")
    @Column(name = "last_name")
    private String lastname;

    @NotNull(message = "Variable email must not be null")
    @Column(name = "email")
    private String email;

    @NotNull(message = "Variable birth date must not be null")
    @Column(name = "birth_date")
    private Date birthDate;

    @NotNull(message = "Variable residence place must not be null")
    @Column(name = "residence_place")
    private String residencePlace;

    @NotNull(message = "Variable address must not be null")
    @Column(name = "address")
    private String address;

    @NotNull(message = "Variable phone number must not be null")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "donation_needed")
    private boolean donationNeeded = false;

    @NotNull(message = "Variable gender must not be null")
    @Column(name = "gender")
    private String gender;

    public UserData() {
    }

    public UserData(@NotNull(message = "Variable typeOfBlood must not be null") BloodType typeOfBlood, @NotNull(message = "Variable role must not be null") Role role, @NotNull(message = "Variable username must not be null") String username, @NotNull(message = "Variable password must not be null") String password, @NotNull(message = "Variable first name must not be null") String firstname, @NotNull(message = "Variable last name must not be null") String lastname, @NotNull(message = "Variable email must not be null") String email, @NotNull(message = "Variable birth date must not be null") Date birthDate, @NotNull(message = "Variable residence place must not be null") String residencePlace, @NotNull(message = "Variable address must not be null") String address, @NotNull(message = "Variable phone number must not be null") String phoneNumber, boolean donationNeeded, String gender) {
        this.typeOfBlood = typeOfBlood;
        this.role = role;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.birthDate = birthDate;
        this.residencePlace = residencePlace;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.donationNeeded = donationNeeded;
        this.gender = gender;
    }

    public int getId() { return id; }

    public void setId(int id) {
        this.id = id;
    }

    public BloodType getTypeOfBlood() {
        return typeOfBlood;
    }

    public void setTypeOfBlood(BloodType typeOfBlood) {
        this.typeOfBlood = typeOfBlood;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getResidencePlace() {
        return residencePlace;
    }

    public void setResidencePlace(String residencePlace) {
        this.residencePlace = residencePlace;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isDonationNeeded() {
        return donationNeeded;
    }

    public void setDonationNeeded(boolean donationNeeded) {
        this.donationNeeded = donationNeeded;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
