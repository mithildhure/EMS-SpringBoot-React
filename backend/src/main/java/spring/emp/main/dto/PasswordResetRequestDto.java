package spring.emp.main.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetRequestDto {

	@Email
	@NotBlank(message = "Email cannot be blank")
	private String email;
	
	@Size(min = 5, max = 20, message = "Password must be between 5-20 characters!")
	private String newPassword;
	
}
