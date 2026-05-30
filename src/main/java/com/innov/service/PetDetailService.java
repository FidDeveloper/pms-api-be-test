package com.innov.service;

import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import java.sql.Date;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.innov.repository.IPetDetailRepo;
import com.innov.repository.IPetConstantRepo;
import com.innov.repository.IPetMedicalRepo;


import com.innov.dto.PetDetailDto;
import com.innov.model.PetDetail;
import com.innov.model.PetConstant;
import com.innov.model.PetMedical;
import com.innov.dto.PetConstantsDto;
import com.innov.service.GeneralService;

import jakarta.transaction.Transactional;

import com.innov.booking.GeneralException;
import com.innov.constant.ErrorCode;

@Service
public class PetDetailService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PetDetailService.class);

	@Autowired
	IPetDetailRepo petDetailRepo;
	
	@Autowired
	IPetConstantRepo petConstant;
	
	@Autowired
	GeneralService generalService;
	
	@Autowired
	IPetMedicalRepo petMedicalRepo;
	
	public PetDetail addPet(PetDetailDto petDetailDto, int ownerId) {
		return savePet(petDetailDto, ownerId);
	}
	
	public PetDetail updatePet(PetDetailDto petDetailDto, int ownerId) {
		PetDetail petDetail = findById(petDetailDto.getId());
		if(petDetail == null) {
			throw new GeneralException(ErrorCode.PET_NOT_FOUND, "Pet Not Found");
		}
		
		if(!(petDetail.getOwnerId() == ownerId)) {
			throw new GeneralException(ErrorCode.USER_NOT_FOUND, "Pet not belong to owner");
		}
		if(petDetailDto.getPetType() != null) {
			LOGGER.info("petDetailDto.getPetType():"+petDetailDto.getPetType());
			petDetail.setPetType(petDetailDto.getPetType());
		}
		if(petDetailDto.getPetTypeDesc() != null) {
			LOGGER.info("petDetailDto.getPetType():"+petDetailDto.getPetTypeDesc());
			petDetail.setPetTypeDesc(petDetailDto.getPetTypeDesc());
		}
		if(petDetailDto.getPetName() != null) {
			petDetail.setPetName(petDetailDto.getPetName());
		}
		if(petDetailDto.getPetBreed() != null) {
			petDetail.setPetBreed(petDetailDto.getPetBreed());
		}
		if(petDetailDto.getPetBreedDesc() != null) {
			petDetail.setPetBreedDesc(petDetailDto.getPetBreedDesc());
		}
		if(petDetailDto.getPetBreedDesc() != null) {
			LOGGER.info("petDetailDto.getPetType():"+petDetailDto.getPetType());
			petDetail.setPetTypeDesc(petDetailDto.getPetTypeDesc());
		}
		if(petDetailDto.getPetGender() != null) {
			petDetail.setPetGender(petDetailDto.getPetGender());
		}
		if(petDetailDto.getDob() != null) {
			LocalDate localDate = generalService.convertStringToLocaldate(petDetailDto.getDob());
			Date sqlDate = generalService.convertLocaldateToSqlDate(localDate);
			petDetail.setDob(sqlDate);
		}
		return savePetDetail(petDetail);
	}
	
	@Transactional
	public PetMedical updatePetMedical(int petMedicalId, PetDetailDto petDetailDto) {
		PetMedical petMedical = petMedicalRepo.findByHistoryId(petMedicalId);
		if(petMedical == null) {
			throw new GeneralException(ErrorCode.PET_MEDICAL_NOT_FOUND, "Failed to update, no history found.");
		}
		
		if(petMedical.getOwnerId() != petDetailDto.getOwnerId()) {
			throw new GeneralException(ErrorCode.INTERNAL_ERROR, "Failed to update, not Tally with User");
		}
		
		if(!(petDetailDto.getHistoryActivities() == null || petDetailDto.getHistoryActivities().equals(""))) {
			petMedical.setHistoryActivities(petDetailDto.getHistoryActivities());
			LOGGER.info("change activities");
		}
		
		if(!(petDetailDto.getHistoryDate() == null || petDetailDto.getHistoryDate().equals(""))) {
			LocalDate localDate = generalService.convertStringToLocaldate(petDetailDto.getHistoryDate());
			Date date = generalService.convertLocaldateToSqlDate(localDate);
			petMedical.setHistoryDate(date);
			LOGGER.info("change date");
		}
		
		if(!(petDetailDto.getHistoryLocation() == null || petDetailDto.getHistoryLocation().equals(""))) {
			petMedical.setHistoryLocation(petDetailDto.getHistoryLocation());
			LOGGER.info("change location");
		}
		
		return petMedicalRepo.save(petMedical);
		
	}
	
	@Transactional
	public void deletePet(int petId) {
		
		PetDetail petDetail = petDetailRepo.findById(petId);
		
		if(petDetail == null) {
			throw new GeneralException(ErrorCode.PET_NOT_FOUND, "Unable to delete, pet not found");
		}
		
		try {
			petDetailRepo.deleteById(petId);
		}catch(Exception e) {
			LOGGER.error(e.getStackTrace().toString());
			throw new GeneralException(ErrorCode.INTERNAL_ERROR, "unable to delete pet");
		}
	}
	
	@Transactional
	public void deletePetMedical(int petMedicalId) {
		
		PetMedical petMedical = petMedicalRepo.findByHistoryId(petMedicalId);
		
		if(petMedical == null) {
			throw new GeneralException(ErrorCode.PET_NOT_FOUND, "Unable to delete, pet medical not found");
		}
		
		try {
			petMedicalRepo.deleteByHistoryId(petMedicalId);
		}catch(Exception e) {
			LOGGER.error(e.getStackTrace().toString());
			throw new GeneralException(ErrorCode.INTERNAL_ERROR, "unable to delete pet medical");
		}
	}
	
	public PetDetail savePet(PetDetailDto petDetailDto, int ownerId) {
		PetDetail petDetail = new PetDetail();
		try {
			
			if(petDetailDto.getPetType() != null) {
				petDetail.setPetType(petDetailDto.getPetType());
			}
			if(petDetailDto.getPetName() != null) {
				petDetail.setPetName(petDetailDto.getPetName());
			}
			if(petDetailDto.getPetBreed() != null) {
				petDetail.setPetBreed(petDetailDto.getPetBreed());
			}
			if(petDetailDto.getPetGender() != null) {
				petDetail.setPetGender(petDetailDto.getPetGender());
				LOGGER.info("enter getPetGender");
			}
			if(petDetailDto.getDob() != null){
				LOGGER.info("enter here");
				LocalDate LocalDob = generalService.convertStringToLocaldate(petDetailDto.getDob());
				Date dob = generalService.convertLocaldateToSqlDate(LocalDob);
				petDetail.setDob(dob);
				LOGGER.info("dob: "+dob);
			}
			if(petDetailDto.getPetType() != null && petDetailDto.getPetBreed() != null){
				LOGGER.info("set petDetails breed and type - 1");
				PetConstant petConstantTemp = petConstant.findByTypeAndBreed(petDetailDto.getPetType(), petDetailDto.getPetBreed());
				LOGGER.info("petConstantTemp" + petConstantTemp + petDetailDto.getPetType() + petDetailDto.getPetBreed());
				LOGGER.info("petConstantTemp" + petConstant.findByTypeAndBreed(petDetailDto.getPetType(), petDetailDto.getPetBreed()));
				if(petConstantTemp != null){
					LOGGER.info("set petDetails breed and type");
					petDetail.setPetTypeDesc(petConstantTemp.getTypeName());
					petDetail.setPetBreedDesc(petConstantTemp.getBreedName());
				}
			}
			petDetail.setOwnerId(ownerId);	
			petDetailRepo.save(petDetail);
		}catch(Exception e) {
			LOGGER.error("error savePet: {}", e.getMessage());
			throw new GeneralException(ErrorCode.UNABLE_SAVE, e.getMessage());
		}
		return petDetail;
	}
	
	public List<PetConstantsDto> getPetListing() {
		List<PetConstantsDto> pet = new ArrayList<>();
		List<PetConstant> petDetails = new ArrayList<>();
		
		petDetails = petConstant.findAll();
		
		for(PetConstant temp:petDetails) {
			PetConstantsDto petDto = new PetConstantsDto();
			petDto.setType(temp.getType());
			petDto.setTypeName(temp.getTypeName());
			petDto.setBreed(temp.getBreed());
			petDto.setBreedName(temp.getBreedName());
			
			pet.addLast(petDto);
		}
		return pet;
	}

	public List<PetConstantsDto> getPetByOwner(int ownerId) {
		List<PetConstantsDto> pets = new ArrayList<>();
		List<PetDetail> petDetails = petDetailRepo.findByOwnerId(ownerId);

		for (PetDetail temp : petDetails) {
			PetConstantsDto petDto = new PetConstantsDto();
			petDto.setType(temp.getPetType());
			petDto.setTypeName(temp.getPetTypeDesc());
			petDto.setBreed(temp.getPetBreed());
			petDto.setBreedName(temp.getPetBreedDesc());
			pets.add(petDto);
		}

		return pets;
	}
	
	public PetMedical addPetMedical(PetDetailDto petDetailDto, int ownerId, int petId) {
		PetMedical petMedical = new PetMedical();
		
		LocalDate localDate = generalService.convertStringToLocaldate(petDetailDto.getHistoryDate());
		Date date = generalService.convertLocaldateToSqlDate(localDate);
		
		petMedical.setHistoryActivities(petDetailDto.getHistoryActivities());
		petMedical.setHistoryDate(date);
		petMedical.setHistoryLocation(petDetailDto.getHistoryLocation());
		petMedical.setOwnerId(ownerId);
		petMedical.setPetId(petId);
		
		return petMedicalRepo.save(petMedical);
	}
	
	public List<PetMedical> getAllPetMedical(int ownerId){
		List<PetMedical> petMedicalList = petMedicalRepo.findByOwnerId(ownerId);
		
		return petMedicalList;
	}

	public List<PetMedical> getPetMedicalByPet(int ownerId, int petId){
		List<PetMedical> petMedicalList = petMedicalRepo.findByOwnerIdAndPetId(ownerId, petId);

		return petMedicalList;
	}
	

    public Page<PetDetail> getAllPetDetail(int page, int size, int ownerId) {
        Pageable pageable = PageRequest.of(page, size);
        return petDetailRepo.findByOwnerId(ownerId, pageable);
    }
	
	public PetDetail findByPetName(String petName) {
		return petDetailRepo.findByPetName(petName);
	}
	
	public PetDetail findById(int petId) {
		return petDetailRepo.findById(petId);
	}
	
	public PetDetail savePetDetail(PetDetail petDetail) {
		return petDetailRepo.save(petDetail);
	}

	public PetConstant test(){
		return petConstant.findByTypeAndBreed("A1000", "B1001");
	}
}
