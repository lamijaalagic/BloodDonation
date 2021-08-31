package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    List<Role> findAll();
    Optional<Role> findById(Integer id);
    void deleteById(Integer id);
    Role findByRoleName(String roleName);
}
