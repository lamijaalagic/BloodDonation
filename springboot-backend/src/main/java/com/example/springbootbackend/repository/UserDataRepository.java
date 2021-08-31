package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.BloodType;
import com.example.springbootbackend.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserDataRepository extends JpaRepository<UserData, Integer> {
    List<UserData> findAll();
    Optional<UserData> findById(Integer id);
    void deleteById(Integer id);
    UserData findByUsername(String username);
    List<UserData> findByTypeOfBlood(BloodType typeOfBlood);
}
