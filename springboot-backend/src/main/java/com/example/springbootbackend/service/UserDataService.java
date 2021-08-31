package com.example.springbootbackend.service;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.BloodType;
import com.example.springbootbackend.model.UserData;
import com.example.springbootbackend.repository.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDataService {
    @Autowired
    private UserDataRepository userRepository;

    //hashiranje passworda
    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public List<UserData> FindAll() {
        if (userRepository.count()==0){
            throw new BadRequestException("U bazi nema ni jednog korisnika.");
        }
        List<UserData> users=new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public UserData FindById(Integer id) {
        UserData user=userRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("user", id));
        return user;
    }

    public UserData FindByUsername(String username) {
        UserData user=userRepository.findByUsername(username);
        if (user==null) {
            throw new BadRequestException("Ne postoji korisnik ciji je username "+username);
        }
        return user;
    }
    public List<UserData> FindByBloodType(BloodType bloodType) {
        List<UserData> user=userRepository.findByTypeOfBlood(bloodType);
        if (user==null) {
            throw new BadRequestException("Ne postoji korisnik cija je krvna grupa "+bloodType.getBloodType()+bloodType.getRhFactor());
        }
        return user;
    }

    public UserData AddUser(UserData newUser){
        UserData oldUser=userRepository.findByUsername(newUser.getUsername());
        if (oldUser!=null) {
            throw new BadRequestException("Korisnik sa istim username-om postoji. Odaberite neko drugo.");
        }
        newUser.setPassword(hashPassword(newUser.getPassword()));

        UserData createdUser=userRepository.save(newUser);
        return createdUser;

    }

    public UserData ModifyUser(UserData newUser, Integer id){
        UserData modifiedUser=userRepository.findById(id)
                .map(user -> {
                    user.setAddress(newUser.getAddress());
                    user.setEmail(newUser.getEmail());
                    user.setPhoneNumber(newUser.getPhoneNumber());
                    user.setDonationNeeded(newUser.isDonationNeeded());
                    user.setPassword(newUser.getPassword());
                    user.setResidencePlace(newUser.getResidencePlace());
                    user.setFirstname(newUser.getFirstname());
                    user.setLastname(newUser.getLastname());
                    user.setBirthDate(newUser.getBirthDate());
                    user.setRole(newUser.getRole());
                    user.setTypeOfBlood(newUser.getTypeOfBlood());
                    user.setGender(newUser.getGender());
                    return userRepository.save(user);
                })
                .orElseThrow(()->new ResourceNotFoundException("user",id));

        return userRepository.findById(newUser.getId()).get();
    }

    public void DeleteUser(Integer id){
        if(userRepository.findById(id)==null) {
            throw new BadRequestException("Korisnik kojeg zelite obrisati ne postoji u bazi.");
        }
        userRepository.deleteById(id);
    }
}
