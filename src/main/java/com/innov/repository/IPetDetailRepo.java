package com.innov.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.innov.model.PetDetail;

public interface IPetDetailRepo extends JpaRepository<PetDetail, Integer>{
	public PetDetail findByPetName(String petName);
	
	public PetDetail findById(int id);

	List<PetDetail> findByOwnerId(int ownerId);
	
	Page<PetDetail> findByOwnerId(int ownerId, Pageable pageable);
	
	public void deleteById(int id);
}

