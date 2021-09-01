package com.example.springbootbackend.service;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.BloodType;
import com.example.springbootbackend.repository.BloodTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BloodTypeService {

    @Autowired
    private BloodTypeRepository bloodTypeRepository;

    public List<BloodType> findAll() {
        if (bloodTypeRepository.count()==0){
            throw new BadRequestException("U bazi nema ni jednog tipa krvi.");
        }
        List<BloodType> types=new ArrayList<>();
        bloodTypeRepository.findAll().forEach(types::add);
        return types;
    }

    public BloodType FindById(Integer id) {
        BloodType type=bloodTypeRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("bloodType ", id));
        return type;
    }

    public List<BloodType> FindByType(String type) {
        List<BloodType> bloodTypes=bloodTypeRepository.findByBloodType(type);
        if (bloodTypes==null) {
            throw new BadRequestException("Ne postoji krvna grupa "+type);
        }
        return bloodTypes;
    }

    public BloodType FindByTypeBloodRhFactor (String bloodType, Boolean rhFactor) {
        List<BloodType> types= new ArrayList<>();
        bloodTypeRepository.findByBloodType(bloodType).forEach(types::add);
        if (!types.isEmpty()) {
            for (BloodType one : types) {
                if (one.getRhFactor() == rhFactor)
                    return one;
            }
        }
        return null;
    }

    public BloodType AddBloodType(BloodType newBloodType){
        BloodType oldBloodType=FindByTypeBloodRhFactor(newBloodType.getBloodType(), newBloodType.getRhFactor());
        if (oldBloodType!=null) {
            throw new BadRequestException("Krvna grupa ne postoji.");
        }
        BloodType createdBloodType=bloodTypeRepository.save(newBloodType);
        return createdBloodType;

    }

    public BloodType ModifyBloodType(BloodType newBloodType, Integer id){
        BloodType modifiedBloodType=bloodTypeRepository.findById(id)
                .map(bloodType -> {
                    bloodType.setBloodType(newBloodType.getBloodType());
                    bloodType.setRhFactor(newBloodType.getRhFactor());
                    return bloodTypeRepository.save(bloodType);
                })
                .orElseThrow(()->new ResourceNotFoundException("bloodType ",id));

        return bloodTypeRepository.findById(newBloodType.getId()).get();
    }

    public void DeleteBloodType(Integer id){
        if(bloodTypeRepository.findById(id)==null) {
            throw new BadRequestException("Krvna grupa koju zelite obrisati ne postoji u bazi.");
        }
        bloodTypeRepository.deleteById(id);
    }
}
