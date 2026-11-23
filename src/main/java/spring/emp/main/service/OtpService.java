package spring.emp.main.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import spring.emp.main.dto.OtpSendRequestDto;
import spring.emp.main.dto.OtpVerifyRequestDto;
import spring.emp.main.dto.PasswordForgotRequestDto;
import spring.emp.main.enums.OtpType;
import spring.emp.main.model.OtpModel;
import spring.emp.main.model.UserModel;
import spring.emp.main.repo.OtpRepo;
import spring.emp.main.repo.UserRepo;

@Service
@RequiredArgsConstructor
public class OtpService {

	private final OtpRepo otpRepo;
	private final UserRepo userRepo;
	private final EmailService emailService;
	
	private String generateOtp() {
		return String.format("%06d", new Random().nextInt(999999));
	}
	
	public void sendVerificationOtp(OtpSendRequestDto dto) {
		userRepo.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("Email Not Found!"));
		otpRepo.findByEmailAndOtpType(dto.getEmail(), OtpType.EMAIL_VERIFICATION).ifPresent(otpRepo::delete);
		
		String otp = generateOtp();
		OtpModel otpModel = new OtpModel();
		
		otpModel.setEmail(dto.getEmail());
		otpModel.setOtpCode(otp);
		otpModel.setOtpType(OtpType.EMAIL_VERIFICATION);
		otpModel.setExpiryAt(LocalDateTime.now().plusMinutes(10));
		
		otpRepo.save(otpModel);
		
		emailService.sendEmail(dto.getEmail(), "Email Verification Otp","Your verification OTP is : "+otp+"\nValid for 10 minutes only");
	}
	
	public String verifyEmailOtp(OtpVerifyRequestDto requestDto) {
		
		OtpModel otp = otpRepo.findByEmailAndOtpType(requestDto.getEmail(),OtpType.EMAIL_VERIFICATION).orElseThrow(() -> new RuntimeException("OTP NOT FOUND!"));
		
		if(otp.getExpiryAt().isBefore(LocalDateTime.now())) {
			throw new RuntimeException("OTP Expired!");
		}
		
		if(!otp.getOtpCode().equals(requestDto.getOtpCode())) {
			throw new RuntimeException("Invalid Otp!");
		}
		
			UserModel user = userRepo.findByEmail(requestDto.getEmail()).orElseThrow(() -> new RuntimeException("User Not found!"));
			user.setEmailVerified(true);
			userRepo.save(user);
			otpRepo.delete(otp);
			return "Email Verified Successfully!";
	}
	
	public String verifyPasswordResetOtp(OtpVerifyRequestDto requestDto) {
		
		OtpModel otp = otpRepo.findByEmailAndOtpType(requestDto.getEmail(), OtpType.PASSWORD_RESET).orElseThrow(() -> new RuntimeException("Otp Not Found!"));
		
		if(otp.getExpiryAt().isBefore(LocalDateTime.now())) {
			throw new RuntimeException("Otp Expired!");
		}
		
		if(!otp.getOtpCode().equals(requestDto.getOtpCode())) {
			throw new RuntimeException("Invalid OTp!");
		}
		
		otp.setOtpVerified(true);
		otpRepo.save(otp);
		return "Otp Verified Succesfully";
	}
	
	public String resendOtp(OtpSendRequestDto dto) {
		UserModel user = userRepo.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("User not found!"));
		if(user.getEmailVerified()) {
			throw new RuntimeException("Email Already Verified!");
		}
		sendVerificationOtp(dto);
		return "Otp sent succesfully at "+dto.getEmail();
	}
	
	public void sendPasswordResetOtp(PasswordForgotRequestDto dto) {
		UserModel user = userRepo.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("Email not found!"));
		if(!user.getEmailVerified()) {
			throw new RuntimeException("Verify Your Email First!");
		}
		otpRepo.findByEmailAndOtpType(dto.getEmail(), OtpType.PASSWORD_RESET).ifPresent(otpRepo::delete);
		String otp = generateOtp();
		OtpModel otpModel = new OtpModel();
		otpModel.setEmail(dto.getEmail());
		otpModel.setOtpCode(otp);
		otpModel.setOtpType(OtpType.PASSWORD_RESET);
		otpModel.setExpiryAt(LocalDateTime.now().plusMinutes(10));
		otpRepo.save(otpModel);
		emailService.sendEmail(dto.getEmail(), "Password Reset Otp", "Your Otp is : "+otp+"\nValid for 10 minutes");
	}
	
}
