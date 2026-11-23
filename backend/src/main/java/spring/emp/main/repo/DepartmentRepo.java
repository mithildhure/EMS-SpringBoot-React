package spring.emp.main.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.emp.main.model.DepartmentModel;

import java.util.Optional;


public interface DepartmentRepo extends JpaRepository<DepartmentModel, Integer> {

    boolean existsByDeptName(String deptName);
    
    Optional<DepartmentModel> findByDeptName(String deptName);
}
