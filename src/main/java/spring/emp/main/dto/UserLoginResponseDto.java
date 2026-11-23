package spring.emp.main.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import spring.emp.main.model.RoleModel;

@Getter
@Setter
@AllArgsConstructor
public class UserLoginResponseDto {

	private String usernameOrEmail;
	private String jwtToken;
	private List<RoleModel> roles;
}
