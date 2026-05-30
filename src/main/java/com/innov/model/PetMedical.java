package com.innov.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pet_medical")
public class PetMedical {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="history_id")
	private int historyId;
	
	@Column(name="history_activities")
	private String historyActivities;
	
	@Column(name="history_date")
	private Date historyDate;
	
	@Column(name="histry_location")
	private String historyLocation;
	
	@Column(name="owner_id")
	private int ownerId;

	@Column(name="pet_id")
	private int petId;
	
	
	public int getHistoryId() {
	    return historyId;
	}

	public void setHistoryId(int historyId) {
	    this.historyId = historyId;
	}

	public String getHistoryActivities() {
	    return historyActivities;
	}

	public void setHistoryActivities(String historyActivities) {
	    this.historyActivities = historyActivities;
	}

	public Date getHistoryDate() {
	    return historyDate;
	}

	public void setHistoryDate(Date historyDate) {
	    this.historyDate = historyDate;
	}

	public String getHistoryLocation() {
	    return historyLocation;
	}

	public void setHistoryLocation(String historyLocation) {
	    this.historyLocation = historyLocation;
	}
	
	public int getOwnerId() {
	    return this.ownerId;
	}

	public void setOwnerId(int ownerId) {
	    this.ownerId = ownerId;
	}

	public int getPetId() {
		return this.petId;
	}

	public void setPetId(int petId) {
		this.petId = petId;
	}
}
