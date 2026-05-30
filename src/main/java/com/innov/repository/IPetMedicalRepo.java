package com.innov.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.innov.model.PetMedical;

public interface IPetMedicalRepo extends JpaRepository<PetMedical, Integer>{
	
	public List<PetMedical> findByOwnerId(int ownerId);

	public List<PetMedical> findByOwnerIdAndPetId(int ownerId, int petId);
	
	public PetMedical findByHistoryId(int historyId);
	
	void deleteByHistoryId(int historyId);
	
}
