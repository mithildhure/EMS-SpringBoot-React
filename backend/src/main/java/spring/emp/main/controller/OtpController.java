package spring.emp.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import spring.emp.main.dto.OtpSendRequestDto;
import spring.emp.main.dto.OtpVerifyRequestDto;
import spring.emp.main.service.OtpService;

@RestController
@RequestMapping("/otp")
@RequiredArgsConstructor
public class OtpController {

	private final OtpService otpService;
	
	@PostMapping("/resend")
	public ResponseEntity<String> sendOtp(@Valid @RequestBody OtpSendRequestDto dto){
		return new ResponseEntity<String>(otpService.resendOtp(dto),HttpStatus.OK);
	}
	
	@PostMapping("/verify-email")
	public ResponseEntity<String> verifyEmailOtp(@Valid @RequestBody OtpVerifyRequestDto dto){
		return new ResponseEntity<String>(otpService.verifyEmailOtp(dto), HttpStatus.OK);
	}
	
	@PostMapping("/verify-resetpass")
	public ResponseEntity<String> verifyResetPassOtp(@Valid @RequestBody OtpVerifyRequestDto dto){
		return new ResponseEntity<String>(otpService.verifyPasswordResetOtp(dto), HttpStatus.OK);
	}
	
}
