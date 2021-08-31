package com.example.springbootbackend.service;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.BloodType;
import com.example.springbootbackend.model.TransfusionTable;
import com.example.springbootbackend.repository.TransfusionTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransfusionTableService {
    @Autowired
    private TransfusionTableRepository transfusionTableRepository;

    public List<TransfusionTable> findAll() {
        if (transfusionTableRepository.count()==0){
            throw new BadRequestException("U bazi nema ni jedne transfuzije.");
        }
        List<TransfusionTable> transfusions=new ArrayList<>();
        transfusionTableRepository.findAll().forEach(transfusions::add);
        return transfusions;
    }

    public TransfusionTable findById(Integer id) {
        TransfusionTable transfusion=transfusionTableRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("transfusion", id));
        return transfusion;
    }

    public List<TransfusionTable> findByBloodType(List<BloodType> bloodType) {
        List<TransfusionTable> transfusions= new ArrayList<>();
        for (BloodType type:bloodType) {
            transfusionTableRepository.findByBloodType(type).forEach(transfusions::add);
        }
        if (transfusions==null) {
            throw new BadRequestException("Ne postoji korisnik cija je krvna grupa "+bloodType);
        }
        return transfusions;
    }

    public List<TransfusionTable> findByEmergency(Boolean emergency) {
        List<TransfusionTable> transfusions=new ArrayList<>();
        transfusionTableRepository.findByEmergency(emergency).forEach(transfusions::add);
        if (transfusions==null) {
            throw new BadRequestException("Ne postoji korisnik kojem je hitno potrebna donacija krvi.");
        }
        return transfusions;
    }

    public List<TransfusionTable> findByPlaceOfNeededDonation(String placeOfNeededDonation) {
        List<TransfusionTable> transfusions=new ArrayList<>();
        transfusionTableRepository.findByPlaceOfNeededDonation(placeOfNeededDonation).forEach(transfusions::add);
        if (transfusions==null) {
            throw new BadRequestException("Ne postoji korisnik kojem je hitno potrebna donacija krvi.");
        }
        return transfusions;
    }

    public TransfusionTable AddTransfusion(TransfusionTable newTransfusion){
        TransfusionTable createdTransfusion=transfusionTableRepository.save(newTransfusion);
        return createdTransfusion;
    }

    public TransfusionTable ModifyTransfusion(TransfusionTable newTransfusion, Integer id){
        TransfusionTable modifiedTransfusion=transfusionTableRepository.findById(id)
                .map(transfusion -> {
                    transfusion.setUser(newTransfusion.getUser());
                    transfusion.setBloodType(newTransfusion.getBloodType());
                    transfusion.setBloodQuantityNeeded(newTransfusion.getBloodQuantityNeeded());
                    transfusion.setEmergency(newTransfusion.isEmergency());
                    transfusion.setPlaceOfNeededDonation(newTransfusion.getPlaceOfNeededDonation());
                    transfusion.setPublishingDate(newTransfusion.getPublishingDate());
                    transfusion.setDetails(newTransfusion.getDetails());
                    return transfusionTableRepository.save(transfusion);
                })
                .orElseThrow(()->new ResourceNotFoundException("transfusion",id));

        return transfusionTableRepository.findById(newTransfusion.getId()).get();
    }

    public void DeleteTransfusion(Integer id){
        if(transfusionTableRepository.findById(id)==null) {
            throw new BadRequestException("Transfuzija koju zelite obrisati ne postoji u bazi.");
        }
        transfusionTableRepository.deleteById(id);
    }
}
