package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.InternalServerException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Role;
import com.example.springbootbackend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping()
    public List<Role> getAllRoles () {
        try {
            return roleService.findAll();
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/{id}")
    public Role getRoleById (@PathVariable Integer id) {
        try {
            return roleService.FindById(id);
        }
        catch (ResourceNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @GetMapping("/roleName")
    public Role GetRoleByRoleName (@RequestParam(name = "roleName") String roleName) {
        try {
            return roleService.FindByRoleName(roleName);
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
    Role AddRole (@RequestBody Role newRole) throws URISyntaxException {
        try {
            return roleService.AddRole(newRole);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (ConstraintViolationException e) {
            throw  new BadRequestException(e.getMessage());
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }

    @PutMapping("/{id}")
    Role ModifyRole (@RequestBody Role newRole, @PathVariable Integer id) throws URISyntaxException {
        try {
            return roleService.ModifyRole(newRole, id);
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
    void DeleteRole (@PathVariable Integer id) {
        try {
            roleService.DeleteRole(id);
        } catch (EmptyResultDataAccessException e){
            throw new ResourceNotFoundException("role", id);
        } catch (Exception e) {
            throw new InternalServerException();
        }
    }
}
