package spring.emp.main.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import spring.emp.main.dto.EmployeeDto;
import spring.emp.main.model.DepartmentModel;
import spring.emp.main.model.EmployeeModel;
import spring.emp.main.repo.DepartmentRepo;
import spring.emp.main.repo.EmployeeRepo;

import java.util.List;
import java.util.Optional;

// yu should use an interface and then implement in this class and override method in here cuh
@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepo repo;
    private final DepartmentRepo deptRepo;

//    all that for using dto layer
    public EmployeeModel insertEmployee(EmployeeDto dto){
       if(repo.existsByEmpEmailOrEmpUsername(dto.getEmpEmail(), dto.getEmpUsername())){
            throw new RuntimeException("Employee Already Exists!");
       }else {
           EmployeeModel model = new EmployeeModel();
           model.setEmpFirstName(dto.getEmpFirstName());
           model.setEmpLastName(dto.getEmpLastName());
           model.setEmpUsername(dto.getEmpUsername());
           model.setEmpAge(dto.getEmpAge());
           model.setEmpPhone(dto.getEmpPhone());
           model.setEmpEmail(dto.getEmpEmail());
           model.setEmpSalary(dto.getEmpSalary());
           model.setEmpAddress(dto.getEmpAddress());
           model.setEmpJobTitle(dto.getEmpJobTitle());
           model.setEmpType(dto.getEmpType());
           model.setEmpShift(dto.getEmpShift());
           Optional<DepartmentModel> existingDept = deptRepo.findByDeptName(dto.getEmpDepartment());
           if(existingDept.isPresent()){
               model.setDepartment(existingDept.get());
           }else {
               throw  new RuntimeException("Department Doesnt Exist");
           }
           return repo.save(model);
       }
    }

//    the reason department not exist error is coming, cos of useRef, I have to manually refresh the page, as the functions is stopping it from displaying/using it

    public EmployeeModel updateEmployee(Integer id, EmployeeDto emp){
        Optional<EmployeeModel> opt = repo.findByEmpId(id);
        if(opt.isPresent()){
            EmployeeModel model = opt.get();
            if(emp.getEmpFirstName() != null) model.setEmpFirstName(emp.getEmpFirstName());
            if(emp.getEmpLastName() != null) model.setEmpLastName(emp.getEmpLastName());
            if(emp.getEmpUsername() != null) model.setEmpUsername(emp.getEmpUsername());
            if(emp.getEmpAge() != null) model.setEmpAge(emp.getEmpAge());
            if(emp.getEmpPhone() != null) model.setEmpPhone(emp.getEmpPhone());
            if(emp.getEmpEmail() != null) model.setEmpEmail(emp.getEmpEmail());
            if(emp.getEmpSalary() != null) model.setEmpSalary(emp.getEmpSalary());
            if(emp.getEmpAddress() != null) model.setEmpAddress(emp.getEmpAddress());
            if(emp.getEmpJobTitle() != null) model.setEmpJobTitle(emp.getEmpJobTitle());
            if(emp.getEmpType() != null) model.setEmpType(emp.getEmpType());
            if(emp.getEmpShift() != null) model.setEmpShift(emp.getEmpShift());
            if(emp.getEmpDepartment() != null || !emp.getEmpDepartment().trim().isEmpty()){
                    Optional<DepartmentModel> newDept = deptRepo.findByDeptName(emp.getEmpDepartment());
                    if(newDept.isPresent()){
                        model.setDepartment(newDept.get());
                    }else {
                        throw new RuntimeException("Department Doesnt Exist [inside if]");
                    }
            }else {
                model.setDepartment(null);
            }
            return repo.save(model);
        }else {
            throw new RuntimeException("Idk dept not present ig");
        }
    }

    public Boolean deleteEmployee(Integer id){
        Optional<EmployeeModel> opt = repo.findByEmpId(id);
        if(opt.isPresent()){
            EmployeeModel emp = opt.get();
            repo.delete(emp);
            return true;
        }else {
            return false;
        }
    }

//    can I have 1 api, for multiple search elements, like searching by username, email, id, firstname, lastname
    public EmployeeModel findEmployee(Integer id){
        Optional<EmployeeModel> opt = repo.findByEmpId(id);
        return opt.orElse(null);
    }

    public List<EmployeeModel> fetchAllEmployee(){
        return repo.findAll();
    }

    public List<EmployeeModel> searchAllEmployees(String keyword){
        return repo.findByEmpFirstNameContainingIgnoreCaseOrEmpLastNameContainingIgnoreCaseOrEmpEmailContainingIgnoreCase(keyword, keyword, keyword);
    }

//    sorting => by ascending/descending, department, shift, Type(full-time, part-time, contract)

}