package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.InternalServerException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.BloodType;
import com.example.springbootbackend.model.UserData;
import com.example.springbootbackend.service.BloodTypeService;
import com.example.springbootbackend.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserDataController {

    @Autowired
    private UserDataService userService;
    @Autowired
    private BloodTypeService bloodTypeService;

    //get all users
    @GetMapping()
    public List<UserData> GetAllUsers() {
        try {
            return userService.FindAll();
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/{id}")
    public UserData GetUserById (@PathVariable Integer id) {
        try {
            return userService.FindById(id);
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/username")
    public UserData GetUserByUsername (@RequestParam(name = "username") String username) {
        try {
            return userService.FindByUsername(username);
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/bloodType")
    public List<UserData> GetUserByBloodType (@RequestParam(name = "bloodType") String bloodType, @RequestParam(name = "rhFactor") Boolean rhFactor) {
        try {
            //boolean bool = Boolean.parseBoolean(rhFactor);
            BloodType type = bloodTypeService.FindByTypeBloodRhFactor(bloodType,rhFactor);
            if (type != null) {
                return  userService.FindByBloodType(type);
            }
            else return null;
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    UserData AddUser (@RequestBody UserData newUser) throws URISyntaxException {
        try {
            return userService.AddUser(newUser);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (ConstraintViolationException e) {
            throw  new BadRequestException(e.getMessage());
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @PutMapping("/{id}")
    UserData ModifyUser (@RequestBody UserData newUser, @PathVariable Integer id) throws URISyntaxException {
        try {
            return userService.ModifyUser(newUser, id);
        }
        catch (ResourceNotFoundException e) {
            throw e;
        } catch (ConstraintViolationException e) {
            throw  new BadRequestException(e.getMessage());
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @DeleteMapping("/{id}")
    void DeleteUser (@PathVariable Integer id) {
        try {
            userService.DeleteUser(id);
        } catch (EmptyResultDataAccessException e){
            throw new ResourceNotFoundException("user", id);
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }


}
