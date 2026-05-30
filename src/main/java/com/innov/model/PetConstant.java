package com.innov.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "constant_pet")
public class PetConstant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "type_name")
	private String typeName;
	
	@Column(name = "breed")
	private String breed;
	
	@Column(name = "breed_name")
	private String breedName;
	
    // ----- Getters -----
    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getTypeName() {
        return typeName;
    }

    public String getBreed() {
        return breed;
    }

    public String getBreedName() {
        return breedName;
    }

    // ----- Setters -----
    public void setId(int id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public void setBreedName(String breedName) {
        this.breedName = breedName;
    }

}
