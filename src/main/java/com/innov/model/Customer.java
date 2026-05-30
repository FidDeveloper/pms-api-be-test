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

/* @Entity - used to mark as database entity
 * @Table - used together with entity, mark as database table
 * @Id - mark as primary key of the entity
 * @GeneratedValue(strategy = GenerationType.IDENTITY) - let database autogeneraten primary key 
 * @Column(name = "login_id") - map java filed to actual column in database
 * dependencies
 * groupId = org.springframework.boot
 * artifactId = spring-boot-starter-data-jpa
 * 
 * 
 * */
@Entity
@Table(name="login")
@Data
@NoArgsConstructor  // generates no-arg constructor
@AllArgsConstructor // generates all-args constructor
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "login_id")
	private int loginId;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "password_key")
	private String passwordKey;
	
	@Column(name = "ic_number")
	private String icnumber;
	
	@Column(name = "fullname")
	private String fullname;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "DOB")
	private Date dob;
	
	public static final int CUSTOMER_EXIST = 1;
	
	public static final int CUSTOMER_NOT_EXIST = 3;
	
	public static final int ERROR_OCCUR = 9;
	
	public int getLoginId() {
		return loginId;
	}
	
	public void setLoginId(int loginId) {
		this.loginId = loginId;
	}
	
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPasswordKey() {
		return passwordKey;
	}
	
	public void setPasswordKey(String passwordKey) {
		this.passwordKey = passwordKey;
	}
	
	public String getIcnumber() {
		return icnumber;
	}
	
	public void setIcnumber(String icnumber) {
		this.icnumber = icnumber;
	}
	
	public String getFullname() {
		return fullname;
	}
	
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public Date getDob() {
		return dob;
	}
	
	public void setDob(Date dob) {
		this.dob = dob;
	}
	
	public void setAll(String fullname, String icnumber, String email, Date dob) {
		this.icnumber = icnumber;
		this.fullname = fullname;
		this.email = email;
		this.dob = dob;
	}


}
