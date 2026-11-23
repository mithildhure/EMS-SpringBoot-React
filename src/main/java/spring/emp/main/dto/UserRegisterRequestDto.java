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
public class UserRegisterRequestDto {

	@NotBlank(message = "Username should not be empty!")
	@Size(min = 5, message = "Username must be between 5-20 characters!")
	private String username;
	
	@NotBlank(message = "Email cannot be empty!")
	@Size(min = 5, message = "Email must be between 5-20 characters!")
	@Email(message = "Invalid email!")
	private String email;
	
	@NotBlank(message = "Password Cannot be empty")
	@Size(min = 5, max = 20, message = "Password must be between 5-20 characters!")
	private String password;
	
}