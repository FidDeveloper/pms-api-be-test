package com.innov.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.innov.model.PetConstant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.innov.constant.AppConstant;
import com.innov.dto.PetConstantsDto;
import com.innov.model.Customer;
import com.innov.model.PetDetail;
import com.innov.model.PetMedical;
import com.innov.service.PetDetailService;
import com.innov.dto.PetDetailDto;
import com.innov.dto.PageDto;
import com.innov.dto.GeneralResponse;
import com.innov.utility.JwtService;

import com.innov.model.PetConstant;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(AppConstant.PET)
public class PetController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PetController.class);
	

	@Autowired
	PetDetailService petDetailService;
	
	@Autowired
	private JwtService jwtService;
	
	@GetMapping( value = "/getAllPet", produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> getAllPet (){
		
		List<PetConstantsDto> petConstantsDto = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		
		petConstantsDto = petDetailService.getPetListing();
		
		return ResponseEntity.status(HttpStatus.OK).body(new GeneralResponse(true, "Pet Listing succesfully obtained", petConstantsDto));
	}

	// Get All pet by owner id
	@GetMapping( value = "/getPets/{id}", produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> getAllPetByOwner (@PathVariable("id") int id){
		Map<String, Object> response = new HashMap<>();
		
		List<PetConstantsDto> petConstantsDto = petDetailService.getPetByOwner(id);
		
		return ResponseEntity.status(HttpStatus.OK).body(new GeneralResponse(true, "Pet Listing successfully obtained", petConstantsDto));
	}
	
	// Get All pet by current user (JWT token)
	@GetMapping(value = "/getMyPets", produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> getMyPets(HttpServletRequest request) {
		try {
			// Get userId (loginId) from JWT token
			int userId = jwtService.getUserId(request);
			
			// Get customer's pets using their loginId
			List<PetConstantsDto> petConstantsDto = petDetailService.getPetByOwner(userId);
			
			return ResponseEntity.status(HttpStatus.OK)
				.body(new GeneralResponse(true, "Pet listing successfully obtained", petConstantsDto));
		} catch (IllegalArgumentException e) {
			LOGGER.error("Authorization error: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new GeneralResponse(false, e.getMessage(), null));
		} catch (NullPointerException e) {
			LOGGER.error("User not found: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new GeneralResponse(false, "User not found", null));
		} catch (Exception e) {
			LOGGER.error("Error retrieving user pets: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new GeneralResponse(false, "Invalid token or authentication error", null));
		}
	}
	
	@PostMapping(value = "/addPet/{id}", consumes=AppConstant.APPLICATION_JSON, produces=AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> addPet(@PathVariable("id") int id, @RequestBody PetDetailDto petDetailDto){
		Map<String, Object> response = new HashMap<>();
		
		PetDetail result = petDetailService.addPet(petDetailDto, id);
		
		return ResponseEntity.status(HttpStatus.OK).body(new GeneralResponse(true, "Pet successfully add", result));
	}
	
	@PostMapping(value = "/getAllPetDetails/{id}", consumes = AppConstant.APPLICATION_JSON, produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> getAllPetDetails(@PathVariable("id") int id, @RequestBody PageDto pageDto){
		Map<String, Object> response = new HashMap<>();
		LOGGER.info("Page: {}", pageDto.getPage());
		LOGGER.info("Rows: {}", pageDto.getRows());
		
		Page<PetDetail> petDetails = petDetailService.getAllPetDetail(pageDto.getPage(), pageDto.getRows(), id);
		
		response.put("content", petDetails.getContent());
		response.put("totalElements", petDetails.getTotalElements());
		
		return ResponseEntity.ok(new GeneralResponse(true, "Pet Listing successfully obtained", response));
	}
	
	
	@PostMapping(value = "/addPetMedical/{ownerId}/{petId}", consumes = AppConstant.APPLICATION_JSON, produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> addPetMedical(@PathVariable("ownerId") int ownerId, @PathVariable("petId") int petId,  @RequestBody PetDetailDto petDetailDto){
		Map<String, Object> response = new HashMap<>();
		
		PetMedical petMedical = petDetailService.addPetMedical(petDetailDto, ownerId, petId);
		
		return ResponseEntity.ok(new GeneralResponse(true, "Pet medical added successfully", petMedical));
	}
	
	@GetMapping(value = "/getAllPetMedical/{ownerId}", produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> getAllPetMedical(@PathVariable("ownerId") int ownerId){
		Map<String, Object> response = new HashMap<>();
		
		List<PetMedical> petMedicalList = petDetailService.getAllPetMedical(ownerId);
		
		return ResponseEntity.ok(new GeneralResponse(true, "Pet medical list obtained successfully", petMedicalList));
	}

	@GetMapping(value = "/getPetMedical/{ownerId}/{petId}", produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> getPetMedical(@PathVariable("ownerId") int ownerId, @PathVariable("petId") int petId){
		Map<String, Object> response = new HashMap<>();

		List<PetMedical> petMedicalList = petDetailService.getPetMedicalByPet(ownerId, petId);

		return ResponseEntity.ok(new GeneralResponse(true, "Pet medical list obtained successfully", petMedicalList));
	}
	
	@PostMapping(value = "/updatePet/{ownerId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<GeneralResponse> updatePetDetail(@PathVariable("ownerId") int ownerId, @RequestBody PetDetailDto petDetailDto){
		LOGGER.info("petId:"+ petDetailDto.getId());
		PetDetail petDetail = petDetailService.updatePet(petDetailDto, ownerId);
		return ResponseEntity.ok(new GeneralResponse(true, "Pet updated successfully", petDetail));
	}
	
	@DeleteMapping(value = "/deletePet/{petId}")
	public ResponseEntity<GeneralResponse> deletePetDetail(@PathVariable("petId") int petId){
		petDetailService.deletePet(petId);
		return ResponseEntity.ok(new GeneralResponse(true, "Pet deleted successfully", petId));
	}
	
	@PatchMapping(value = "/updatePetMedical/{petMedicalId}")
	public ResponseEntity<GeneralResponse> updatePetMedical(@PathVariable("petMedicalId") int petMedicalId, @RequestBody PetDetailDto petDetailDto){
		PetMedical petMedical = petDetailService.updatePetMedical(petMedicalId, petDetailDto);
		return ResponseEntity.ok(new GeneralResponse(true, "Pet Medical History Updated Successfully", petMedical));
	}
	
	@DeleteMapping(value = "/deletePetMedical/{petMedicalId}")
	public ResponseEntity<GeneralResponse> deletePetMedical(@PathVariable("petMedicalId") int petId){
		petDetailService.deletePetMedical(petId);
		return ResponseEntity.ok(new GeneralResponse(true, "Pet deleted successfully", petId));
	}

	@GetMapping(value = "/getTest", produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> getTest(){
		Map<String, Object> response = new HashMap<>();

		 PetConstant petConstant = petDetailService.test();

		return ResponseEntity.ok(new GeneralResponse(true, "Pet medical list obtained successfully", petConstant));
	}
}
