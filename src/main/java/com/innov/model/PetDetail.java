package com.innov.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="pet_details")
public class PetDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="pet_type")
	private String petType;
	
	@Column(name="pet_name")
	private String petName;
	
	@Column(name="pet_breed")
	private String petBreed;
	
	@Column(name="pet_gender")
	private String petGender;
	
	@Column(name="pet_dob")
	private Date dob;
	
	@Column(name="pet_owner_id")
	private int ownerId;

	@Column(name="pet_type_desc")
	private String petTypeDesc;

	@Column(name="pet_breed_desc")
	private String petBreedDesc;
	
	public static final int PET_EXIST = 1;
	public static final int PET_NOT_EXIST = 3;
	public static final int PET_ERROR_OCCUR = 9;
	
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

	public String getPetGender() {
	    return petGender;
	}

	public void setPetGender(String petGender) {
	    this.petGender = petGender;
	}

	public Date getDob() {
	    return dob;
	}

	public void setDob(Date dob) {
	    this.dob = dob;
	}

	public int getOwnerId() {
	    return ownerId;
	}

	public void setOwnerId(int ownerId) {this.ownerId = ownerId;}

	public String getPetTypeDesc() {
		return petTypeDesc;
	}

	public void setPetTypeDesc(String petTypeDesc) {this.petTypeDesc = petTypeDesc;}

	public String getPetBreedDesc() {
		return petBreedDesc;
	}

	public void setPetBreedDesc(String petBreedDesc) {this.petBreedDesc = petBreedDesc;}

}
