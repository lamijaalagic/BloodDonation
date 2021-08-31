package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.BloodType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BloodTypeRepository extends JpaRepository<BloodType, Integer> {
    List<BloodType> findAll();
    Optional<BloodType> findById(Integer id);
    void deleteById(Integer id);
    List<BloodType> findByBloodType(String bloodType);
}
