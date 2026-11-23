package spring.emp.main.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import spring.emp.main.enums.OtpType;
import spring.emp.main.model.OtpModel;
import java.util.Optional;


public interface OtpRepo extends JpaRepository<OtpModel, Long>{

	Optional<OtpModel> findByEmailAndOtpType(String email, OtpType otpType);

	
	
}