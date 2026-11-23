package spring.emp.main.model;

import java.util.Collection;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.RequiredArgsConstructor;

@SuppressWarnings("serial")
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails{

	private final UserModel model;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return model.getUserRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRoleName())).toList();
	}

	@Override
	public @Nullable String getPassword() {
		// TODO Auto-generated method stub
		return model.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return model.getUsername();
	}
	
	
	
}
