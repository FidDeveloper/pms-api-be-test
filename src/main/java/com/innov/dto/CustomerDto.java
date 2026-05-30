package com.innov.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {

	@JsonProperty("customerUsername")
    private String customerUsername;
	
	@JsonProperty("customerPassword")
    private String customerPassword;
	
	@JsonProperty("customerFullname")
	private String customerFullname;
	
	@JsonProperty("customerIc")
	private String customerIc;
	
	@JsonProperty("customerEmail")
	private String customerEmail;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@JsonProperty("customerDOB")
	private Date customerDOB;

    /*public CustomerDto() {}

    public CustomerDto(String customerUsername, String customerPassword) {
        this.customerUsername = customerUsername;
        this.customerPassword = customerPassword;
    }*/

    public String getCustomerUsername() {
        return customerUsername;
    }

    public void setCustomerUsername(String customerUsername) {
        this.customerUsername = customerUsername;
    }

    public String getCustomerPassword() {
        return customerPassword;
    }

    public void setCustomerPassword(String customerPassword) {
        this.customerPassword = customerPassword;
    }
    
    public String getCustomerFullname() {
        return customerFullname;
    }

    public void setCustomerFullname(String customerFullname) {
        this.customerFullname = customerFullname;
    }
    
    public String getCustomerIc() {
        return customerIc;
    }

    public void setCustomerIc(String customerIc) {
        this.customerIc = customerIc;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    
    public Date getCustomerDOB() {
        return customerDOB;
    }

    public void setCustomerDOB(Date customerDOB) {
        this.customerDOB = customerDOB;
    }
}