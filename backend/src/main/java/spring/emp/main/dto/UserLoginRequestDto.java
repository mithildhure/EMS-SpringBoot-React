package spring.emp.main.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginRequestDto {

	@NotBlank(message = "Cannot be blank!")
	private String usernameOrEmail;
	
	@NotBlank(message = "Password cannot be blank!")
	private String password;
	
}