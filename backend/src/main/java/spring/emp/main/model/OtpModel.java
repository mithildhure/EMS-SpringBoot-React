package spring.emp.main.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import spring.emp.main.enums.OtpType;

@Entity
@Table(name = "otp")
@Getter
@Setter
public class OtpModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "otp_id")
	private Long otpId;
	
	@Column(nullable = false)
	private String email;
	
	@Column(name = "otp_code" ,nullable = false)
	private String otpCode;
	
	@Column(name = "otp_type", nullable = false)
	@Enumerated(EnumType.STRING)
	private OtpType otpType;
	
	@Column(name = "otp_expiry", nullable = false)
	private LocalDateTime expiryAt;
	
	@Column(name = "otp_verified")
	private Boolean otpVerified = false;
	
}
