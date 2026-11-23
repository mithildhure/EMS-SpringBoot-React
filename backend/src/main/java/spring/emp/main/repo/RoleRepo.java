package spring.emp.main.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import spring.emp.main.model.RoleModel;


public interface RoleRepo extends JpaRepository<RoleModel, Integer>{

	Optional<RoleModel> findByRoleName(String roleName);
	
}
