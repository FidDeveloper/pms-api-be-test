package com.innov.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.innov.model.PetConstant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IPetConstantRepo extends JpaRepository<PetConstant, Integer>{
    PetConstant findByTypeAndBreed(String type, String breed);
}
