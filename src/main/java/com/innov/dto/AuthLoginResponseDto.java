package com.innov.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthLoginResponseDto {

    private AuthUserDto user;
    private String token;
    private String refreshToken;
}
