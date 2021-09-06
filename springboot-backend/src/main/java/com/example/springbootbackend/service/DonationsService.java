package com.example.springbootbackend.service;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Donations;
import com.example.springbootbackend.model.UserData;
import com.example.springbootbackend.repository.DonationsRepository;
import com.example.springbootbackend.repository.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DonationsService {
    @Autowired
    private DonationsRepository donationsRepository;
    @Autowired
    private UserDataRepository userDataRepository;

    public List<Donations> findAll() {
        if (donationsRepository.count()==0){
            throw new BadRequestException("U bazi nema ni jedne role.");
        }
        List<Donations> roles=new ArrayList<>();
        donationsRepository.findAll().forEach(roles::add);
        return roles;
    }

    public Donations FindById(Integer id) {
        Donations donations=donationsRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("donation", id));
        return donations;
    }

    public List<Donations> FindByUser(UserData user) {
        List<Donations> donations=donationsRepository.findByUser(user);
        if (donations==null) {
            throw new BadRequestException("Ne postoji donacija usera "+user.getUsername());
        }
        return donations;
    }

    public List<Donations> FindByReceiver(UserData receiver) {
        List<Donations> donations=donationsRepository.findByReceiver(receiver);
        if (donations==null) {
            throw new BadRequestException("Ne postoji user koji je primio donaciju "+receiver.getUsername());
        }
        return donations;
    }

    public List<Donations> FindByDonationPlace(String donationPlace) {
        List<Donations> donations=donationsRepository.findByDonationPlace(donationPlace);
        if (donations==null) {
            throw new BadRequestException("Ne postoji donacija u "+donationPlace);
        }
        return donations;
    }

    public Donations AddDonation(Donations newDonation){
        Donations createdDonation=donationsRepository.save(newDonation);
        return createdDonation;

    }

    public Donations ModifyDonation(Donations newDonation, Integer id){
        Donations modifiedDonation=donationsRepository.findById(id)
                .map(donations -> {
                    donations.setUser(newDonation.getUser());
                    donations.setReceiver(newDonation.getReceiver());
                    donations.setDonationPlace(newDonation.getDonationPlace());
                    donations.setBloodQuantity(newDonation.getBloodQuantity());
                    donations.setDonationDate(newDonation.getDonationDate());
                    return donationsRepository.save(donations);
                })
                .orElseThrow(()->new ResourceNotFoundException("donation",id));

        return donationsRepository.findById(newDonation.getId()).get();
    }

    public void DeleteDonation(Integer id){
        if(donationsRepository.findById(id)==null) {
            throw new BadRequestException("Donacija koju zelite obrisati ne postoji u bazi.");
        }
        donationsRepository.deleteById(id);
    }
}
