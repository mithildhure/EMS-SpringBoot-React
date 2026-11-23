package spring.emp.main.service;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

	private final JwtEncoder encoder;
	
	@Value("${jwt.issuer}")
	private String issuer;
	
	@Value("${jwt.expiry}")
	private Long expiry;
	
	public String generateToken(Authentication authentication) {
		Instant now = Instant.now();
		List<String> authorities = authentication.getAuthorities()
								  .stream()
								  .map(GrantedAuthority::getAuthority)
								  .toList();
		JwtClaimsSet claims = JwtClaimsSet.builder()
							 .issuer(issuer)
							 .issuedAt(now)
							 .expiresAt(now.plusSeconds(expiry))
							 .subject(authentication.getName())
							 .claim("authorities", authorities)
							 .build();
		Jwt jwt = encoder.encode(JwtEncoderParameters.from(claims));
		return jwt.getTokenValue();
	}

}
