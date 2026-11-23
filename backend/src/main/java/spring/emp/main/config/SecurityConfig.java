package spring.emp.main.config;

import java.util.Base64;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	DaoAuthenticationProvider authenticationProvider(UserDetailsService service, PasswordEncoder encoder) {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider(service);
		provider.setPasswordEncoder(encoder);
		return provider;
	}
	
	@Bean
	AuthenticationManager manager(DaoAuthenticationProvider provider) {
		return new ProviderManager(provider);
	}
	
//	jwt config
	
	@Bean
	SecretKey secretKey(@Value("${jwt.secret}") String secret) {
		byte[] decoder = Base64.getDecoder().decode(secret);
		String algorithm = "HmacSHA256";
		return new SecretKeySpec(decoder, algorithm);
	}
	
	@Bean
	JwtEncoder jwtEncoder(SecretKey secretKey) {
		return NimbusJwtEncoder.withSecretKey(secretKey)
							  .algorithm(MacAlgorithm.HS256)
							  .build();
	}
	
	@Bean
	JwtDecoder jwtDecoder(SecretKey secretkey, @Value("${jwt.issuer}") String issuer) {
		NimbusJwtDecoder decoder = NimbusJwtDecoder.withSecretKey(secretkey)
												  .macAlgorithm(MacAlgorithm.HS256)
												  .build();
		decoder.setJwtValidator(JwtValidators.createDefaultWithIssuer(issuer));	
		return decoder;
	}
	
	@Bean
	JwtAuthenticationConverter authenticationConverter() {
		JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
		grantedAuthoritiesConverter.setAuthoritiesClaimName("authorities");
		grantedAuthoritiesConverter.setAuthorityPrefix("");
		JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
		jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
		return jwtAuthenticationConverter;
	}
	
//	cors config for react
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfig = new CorsConfiguration();
		corsConfig.setAllowedOrigins(List.of("http://localhost:5173"));
		corsConfig.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
		corsConfig.setAllowedHeaders(List.of("*"));
		corsConfig.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource url = new UrlBasedCorsConfigurationSource();
		url.registerCorsConfiguration("/**", corsConfig);
		return url;
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity security, DaoAuthenticationProvider provider, JwtAuthenticationConverter converter) {
		return security.cors(cors -> {})
					   .csrf(csrf -> csrf.disable())
					   .authenticationProvider(provider)
					   .authorizeHttpRequests(auth -> auth.requestMatchers("/h2-console/**","/auth/**","/mail/test","/otp/**")
					   .permitAll().anyRequest().authenticated())
					   .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
					   .logout(logout -> logout.disable())
					   .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(converter)))
					   .headers(h -> h.frameOptions(f -> f.disable()))
					   .build();
	}
	
}
