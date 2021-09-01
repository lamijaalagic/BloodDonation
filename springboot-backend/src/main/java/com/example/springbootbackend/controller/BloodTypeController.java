package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.InternalServerException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.BloodType;
import com.example.springbootbackend.service.BloodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/bloodType")
public class BloodTypeController {

    @Autowired
    private BloodTypeService bloodTypeService;

    //get all blood types
    @GetMapping()
    public List<BloodType> getAllBloodTypes () {
        try {
            return bloodTypeService.findAll();
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }

    }

    @GetMapping("/{id}")
    public BloodType getBloodTypeById (@PathVariable Integer id) {
        try {
            return bloodTypeService.FindById(id);
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/type")
    public List<BloodType> GetBloodTypeByType (@RequestParam(name = "type") String type) {
        try {
            return bloodTypeService.FindByType(type);
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
    BloodType AddBloodType (@RequestBody BloodType newBloodType) throws URISyntaxException {
        try {
            return bloodTypeService.AddBloodType(newBloodType);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (ConstraintViolationException e) {
            throw  new BadRequestException(e.getMessage());
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @PutMapping("/{id}")
    BloodType ModifyBloodType (@RequestBody BloodType newBloodType, @PathVariable Integer id) throws URISyntaxException {
        try {
            return bloodTypeService.ModifyBloodType(newBloodType, id);
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
    void DeleteBloodType (@PathVariable Integer id) {
        try {
            bloodTypeService.DeleteBloodType(id);
        } catch (EmptyResultDataAccessException e){
            throw new ResourceNotFoundException("bloodType", id);
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }
}
