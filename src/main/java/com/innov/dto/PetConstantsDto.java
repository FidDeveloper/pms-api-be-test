package com.innov.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PetConstantsDto {
	

	@JsonProperty("petType")
	private String type;
		
	@JsonProperty("petTypeName")
	private String typeName;
	
	@JsonProperty("petBreed")
	private String breed;
	
	@JsonProperty("petBreedName")
	private String breedName;

    // ----- Getters -----

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
