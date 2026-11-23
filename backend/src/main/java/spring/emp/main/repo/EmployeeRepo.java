package spring.emp.main.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.emp.main.model.EmployeeModel;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<EmployeeModel, Integer> {

//    using for update and delete
    Optional<EmployeeModel> findByEmpId(Integer empId);

    boolean existsByEmpEmailOrEmpUsername(String empEmail, String empUsername);

    List<EmployeeModel> findByEmpFirstNameContainingIgnoreCaseOrEmpLastNameContainingIgnoreCaseOrEmpEmailContainingIgnoreCase(String firstname, String lastname, String email);


}
