package com.innov.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthUserDto {

    private int loginId;
    private String username;
    private String fullname;
    private String email;
    private String icnumber;
    private Date dob;
}
