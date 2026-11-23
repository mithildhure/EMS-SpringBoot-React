package spring.emp.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import spring.emp.main.dto.PasswordForgotRequestDto;
import spring.emp.main.dto.PasswordResetRequestDto;
import spring.emp.main.dto.UserLoginRequestDto;
import spring.emp.main.dto.UserLoginResponseDto;
import spring.emp.main.dto.UserRegisterRequestDto;
import spring.emp.main.dto.UserRegisterResponseDto;
import spring.emp.main.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService service;
	
	@PostMapping("/login")
	public ResponseEntity<UserLoginResponseDto> login(@Valid @RequestBody UserLoginRequestDto requestDto){
		return new ResponseEntity<UserLoginResponseDto>(service.loginUser(requestDto), HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<UserRegisterResponseDto> register(@Valid @RequestBody UserRegisterRequestDto requstDto){
		return new ResponseEntity<UserRegisterResponseDto>(service.registerUser(requstDto), HttpStatus.CREATED);
	}
	
	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@Valid @RequestBody PasswordForgotRequestDto dto){
		return new ResponseEntity<String>(service.forgotPassword(dto), HttpStatus.OK);
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@Valid @RequestBody PasswordResetRequestDto dto){
		return new ResponseEntity<String>(service.resetPassword(dto), HttpStatus.OK);
	}
	
}
