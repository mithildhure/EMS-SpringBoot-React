package spring.emp.main.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import spring.emp.main.dto.OtpSendRequestDto;
import spring.emp.main.dto.PasswordForgotRequestDto;
import spring.emp.main.dto.PasswordResetRequestDto;
import spring.emp.main.dto.UserLoginRequestDto;
import spring.emp.main.dto.UserLoginResponseDto;
import spring.emp.main.dto.UserRegisterRequestDto;
import spring.emp.main.dto.UserRegisterResponseDto;
import spring.emp.main.enums.OtpType;
import spring.emp.main.model.OtpModel;
import spring.emp.main.model.RoleModel;
import spring.emp.main.model.UserModel;
import spring.emp.main.repo.OtpRepo;
import spring.emp.main.repo.RoleRepo;
import spring.emp.main.repo.UserRepo;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepo userRepo;
	private final RoleRepo roleRepo;
	private final OtpRepo otpRepo;
	private final PasswordEncoder encoder;
	private final AuthenticationManager manager;
	private final JwtService jwtService;
	private final OtpService otpService;
	
	public UserRegisterResponseDto registerUser(UserRegisterRequestDto requestDto) {
		UserModel user = new UserModel();
		Optional<UserModel> opt = userRepo.findByUsername(requestDto.getUsername());
		if(opt.isPresent()) {
			throw new RuntimeException("User Already Exists!");
		}
		Optional<UserModel> opt2 = userRepo.findByEmail(requestDto.getEmail());
		if(opt2.isPresent()) {
			throw new RuntimeException("Email Already Exist!");
		}
		user.setUsername(requestDto.getUsername());
		user.setEmail(requestDto.getEmail());
		user.setPassword(encoder.encode(requestDto.getPassword()));
		RoleModel role = roleRepo.findByRoleName("ROLE_USER").orElseThrow(() -> new RuntimeException("NO SUCH ROLE EXISTS!"));
		Set<RoleModel> roles = new HashSet<>();
		roles.add(role);
		user.setUserRoles(roles);
		userRepo.save(user);
		otpService.sendVerificationOtp(new OtpSendRequestDto(user.getEmail()));
		UserRegisterResponseDto responseDto = new UserRegisterResponseDto(user.getUsername(), user.getEmail());
		return responseDto;
	}
	
	@SuppressWarnings("unchecked")  // due to casting
	public UserLoginResponseDto loginUser(UserLoginRequestDto requestDto) {
		UserModel user = userRepo.findByUsernameOrEmail(requestDto.getUsernameOrEmail(), requestDto.getUsernameOrEmail()).orElseThrow(() -> new RuntimeException("User not found!"));
		if(!user.getEmailVerified()) {
			throw new RuntimeException("Please Verify Your Email First!");
		}
		Authentication authRequest = UsernamePasswordAuthenticationToken.unauthenticated(requestDto.getUsernameOrEmail(), requestDto.getPassword());
		Authentication authentication = manager.authenticate(authRequest);
		String token = jwtService.generateToken(authentication);
	    List<RoleModel> roles = (List<RoleModel>) authentication.getAuthorities();
		return new UserLoginResponseDto(authentication.getName(), token, roles);
	}
	
	public String forgotPassword(PasswordForgotRequestDto dto) {
		userRepo.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("Email not found!"));
		otpService.sendPasswordResetOtp(dto);
		return "Otp Sent Succesfully!";
	}
	
	public String resetPassword(PasswordResetRequestDto dto) {
		UserModel user = userRepo.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("Email Not Found!"));
		OtpModel otp = otpRepo.findByEmailAndOtpType(dto.getEmail(), OtpType.PASSWORD_RESET).orElseThrow(() -> new RuntimeException("Verify otp first"));
			if(!otp.getOtpVerified()) {
				throw new RuntimeException("Verify Otp First!");
			}
			user.setPassword(encoder.encode(dto.getNewPassword()));
			userRepo.save(user);
			otpRepo.delete(otp);
			return "Password Updated Succesfully!";
		}
	
	}