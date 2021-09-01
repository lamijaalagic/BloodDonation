package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.InternalServerException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.BloodType;
import com.example.springbootbackend.model.TransfusionTable;
import com.example.springbootbackend.repository.BloodTypeRepository;
import com.example.springbootbackend.service.TransfusionTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/transfusionTable")
public class TransfusionTableController {

    @Autowired
    private TransfusionTableService transfusionTableService;
    @Autowired
    private BloodTypeRepository bloodTypeRepository;

    //get all transfusion
    @GetMapping()
    public List<TransfusionTable> GetAllTransfusions() {
        try {
            return transfusionTableService.findAll();
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/{id}")
    public TransfusionTable GetTransfusionById(@PathVariable Integer id) {
        try {
            return transfusionTableService.findById(id);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/transfusions/blood_type")
    public List<TransfusionTable> GetTransfusionsByBloodType(@RequestParam(name = "bloodType") String bloodType) {
        try {
            List<BloodType> type=bloodTypeRepository.findByBloodType(bloodType);
            return transfusionTableService.findByBloodType(type);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/transfusions/emergency")
    public List<TransfusionTable> GetTransfusionsByEmergency(@RequestParam(name = "emergency") Boolean emergency) {
        try {
            return transfusionTableService.findByEmergency(emergency);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/transfusions/place_of_needed_donation")
    public List<TransfusionTable> GetTransfusionsByPlaceOfNeededDonation(@RequestParam(name = "place_of_needed_donation") String placeOfNeededDonation) {
        try {
            return transfusionTableService.findByPlaceOfNeededDonation(placeOfNeededDonation);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    TransfusionTable AddTransfusion (@RequestBody TransfusionTable newTransfusion) throws URISyntaxException {
        try {
            return transfusionTableService.AddTransfusion(newTransfusion);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (ConstraintViolationException e) {
            throw new BadRequestException(e.getMessage());
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @PutMapping("/{id}")
    TransfusionTable ModifyTransfusion(@RequestBody TransfusionTable newTransfusion, @PathVariable Integer id) throws URISyntaxException {
        try {
            return transfusionTableService.ModifyTransfusion(newTransfusion, id);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (ConstraintViolationException e) {
            throw new BadRequestException(e.getMessage());
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @DeleteMapping("/{id}")
    void DeleteTransfusion(@PathVariable Integer id) {
        try {
            transfusionTableService.DeleteTransfusion(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("transfusion", id);
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }
}
