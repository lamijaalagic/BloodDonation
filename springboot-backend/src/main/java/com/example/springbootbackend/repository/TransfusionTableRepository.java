package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.BloodType;
import com.example.springbootbackend.model.TransfusionTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransfusionTableRepository extends JpaRepository<TransfusionTable, Integer> {
    List<TransfusionTable> findAll();
    Optional<TransfusionTable> findById(Integer id);
    void deleteById(Integer id);
    List<TransfusionTable> findByBloodType(BloodType bloodType);
    List<TransfusionTable> findByEmergency(Boolean emergency);
    List<TransfusionTable> findByPlaceOfNeededDonation(String placeOfNeededDonation);
}
