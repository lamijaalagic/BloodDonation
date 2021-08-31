package com.example.springbootbackend.service;

import com.example.springbootbackend.exception.BadRequestException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Role;
import com.example.springbootbackend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public List<Role> findAll() {
        if (roleRepository.count()==0){
            throw new BadRequestException("U bazi nema ni jedne role.");
        }
        List<Role> roles=new ArrayList<>();
        roleRepository.findAll().forEach(roles::add);
        return roles;
    }

    public Role FindById(Integer id) {
        Role role=roleRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("role", id));
        return role;
    }

    public Role FindByRoleName(String roleName) {
        Role role=roleRepository.findByRoleName(roleName);
        if (role==null) {
            throw new BadRequestException("Ne postoji korisnik ciji je username "+roleName);
        }
        return role;
    }

    public Role AddRole(Role newRole){
        Role oldRole=roleRepository.findByRoleName(newRole.getRoleName());
        if (oldRole!=null) {
            throw new BadRequestException("Rola sa istim nayivom postoji. Odaberite neko drugo.");
        }

        Role createdRole=roleRepository.save(newRole);
        return createdRole;

    }

    public Role ModifyRole(Role newRole, Integer id){
        Role modifiedRole=roleRepository.findById(id)
                .map(role -> {
                    role.setRoleName(newRole.getRoleName());
                    return roleRepository.save(role);
                })
                .orElseThrow(()->new ResourceNotFoundException("role",id));

        return roleRepository.findById(newRole.getId()).get();
    }

    public void DeleteRole(Integer id){
        if(roleRepository.findById(id)==null) {
            throw new BadRequestException("Korisnik kojeg zelite obrisati ne postoji u bazi.");
        }
        roleRepository.deleteById(id);
    }
}
