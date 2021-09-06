package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.InternalServerException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Donations;
import com.example.springbootbackend.model.UserData;
import com.example.springbootbackend.service.DonationsService;
import com.example.springbootbackend.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/donations")
public class DonationsController {

    @Autowired
    private DonationsService donationsService;
    @Autowired
    private UserDataService userDataService;

    @GetMapping()
    public List<Donations> getAllDonations () {
        try {
            return donationsService.findAll();
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }

    }

    @GetMapping("/{id}")
    public Donations getDonationById (@PathVariable Integer id) {
        try {
            return donationsService.FindById(id);
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/user")
    public List<Donations> GetDonationsByUser (@RequestParam(name = "username") String username) {
        try {
            UserData user=userDataService.FindByUsername(username);
            if (user!=null) {
                return donationsService.FindByUser(user);
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

    @GetMapping("/receiver")
    public List<Donations> GetDonationsByReceiver (@RequestParam(name = "username") String username) {
        try {
            UserData receiver=userDataService.FindByUsername(username);
            if (receiver!=null) {
                return donationsService.FindByReceiver(receiver);
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

    @GetMapping("/donationPlace")
    public List<Donations> GetDonationByDonationPlace (@RequestParam(name = "donationPlace") String donationPlace) {
        try {
            return donationsService.FindByDonationPlace(donationPlace);
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
    Donations AddDonation (@RequestBody Donations newDonation) throws URISyntaxException {
        try {
            return donationsService.AddDonation(newDonation);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (ConstraintViolationException e) {
            throw  new BadRequestException(e.getMessage());
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @PutMapping("/{id}")
    Donations ModifyDonation (@RequestBody Donations newDonation, @PathVariable Integer id) throws URISyntaxException {
        try {
            return donationsService.ModifyDonation(newDonation, id);
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
    void DeleteDonation (@PathVariable Integer id) {
        try {
            donationsService.DeleteDonation(id);
        } catch (EmptyResultDataAccessException e){
            throw new ResourceNotFoundException("donation", id);
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }
}
