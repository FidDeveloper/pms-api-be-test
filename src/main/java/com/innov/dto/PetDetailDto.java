package com.innov.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetDetailDto {

	@JsonProperty("id")
	private int id;
	
	@JsonProperty("petType")
	private String petType;

	@JsonProperty("petTypeDesc")
	private String petTypeDesc;
	
	@JsonProperty("petName")
	private String petName;
	
	@JsonProperty("petBreed")
	private String petBreed;

	@JsonProperty("petBreedDesc")
	private String petBreedDesc;
	
	@JsonProperty("petGender")
	private String petGender;
	
	@JsonProperty("petDob")
	private String petDob;
	
	@JsonProperty("ownerId")
	private int ownerId;
	
	//Pet Medical
	@JsonProperty("historyActivities")
	private String historyActivities;
	
	@JsonProperty("historyDate")
	private String historyDate;
	
	@JsonProperty("historyLocation")
	private String historyLocation;
	
	public int getId() {
	    return id;
	}

	public void setId(int id) {
	    this.id = id;
	}

	public String getPetType() {
	    return petType;
	}

	public void setPetType(String petType) {
	    this.petType = petType;
	}

	public String getPetTypeDesc() {
		return petTypeDesc;
	}

	public void setPetTypeDesc(String petTypeDesc) {
		this.petTypeDesc = petTypeDesc;
	}

	public String getPetName() {
	    return petName;
	}

	public void setPetName(String petName) {
	    this.petName = petName;
	}

	public String getPetBreed() {
	    return petBreed;
	}

	public void setPetBreed(String petBreed) {
	    this.petBreed = petBreed;
	}

	public String getPetBreedDesc() {
		return petBreedDesc;
	}

	public void setPetBreedDesc(String petBreedDesc) {
		this.petBreedDesc = petBreedDesc;
	}

	public String getPetGender() {
	    return petGender;
	}

	public void setPetGender(String petGender) {
	    this.petGender = petGender;
	}

	public String getDob() {
	    return petDob;
	}

	public void setDob(String petDob) {
	    this.petDob = petDob;
	}

	public int getOwnerId() {
	    return ownerId;
	}

	public void setOwnerId(int ownerId) {
	    this.ownerId = ownerId;
	}
	
	public String getHistoryActivities() {
		return historyActivities;
	}
	
	public void setHistoryActivities(String historyActivities) {
		this.historyActivities = historyActivities;
	}
	
	public String getHistoryDate() {
		return historyDate;
	}
	
	public void setHistoryDate(String historyDate) {
		this.historyDate = historyDate;
	}
	
	public String getHistoryLocation() {
		return historyLocation;
	}
	
	public void setHistoryLocation(String historyLocation) {
		this.historyLocation = historyLocation;
	}

}
