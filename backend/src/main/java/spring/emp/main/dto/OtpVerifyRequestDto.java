package spring.emp.main.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OtpVerifyRequestDto {

	@Email
	@NotBlank(message = "Email cannot be empty!")
	private String email;
	
	@NotBlank(message = "Otp cannot be empty!")
	private String otpCode;
	
}
