package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Donations;
import com.example.springbootbackend.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationsRepository extends JpaRepository<Donations, Integer> {
    List<Donations> findAll();
    Optional<Donations> findById(Integer id);
    void deleteById(Integer id);
    List<Donations> findByDonationPlace(String donationPlace);
    List<Donations> findByUser(UserData user);
    List<Donations> findByReceiver (UserData receiver);
}
