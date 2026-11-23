package spring.emp.main.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import spring.emp.main.model.UserModel;
import java.util.Optional;


public interface UserRepo extends JpaRepository<UserModel, Integer>{

	Optional<UserModel> findByUsername(String username);
	
	Optional<UserModel> findByEmail(String email);
	
	Optional<UserModel> findByUsernameOrEmail(String username, String email);
	
}
