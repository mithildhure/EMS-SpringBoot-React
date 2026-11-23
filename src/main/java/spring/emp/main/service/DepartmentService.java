package spring.emp.main.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import spring.emp.main.dto.DepartmentDto;
import spring.emp.main.model.DepartmentModel;
import spring.emp.main.model.EmployeeModel;
import spring.emp.main.repo.DepartmentRepo;
import spring.emp.main.repo.EmployeeRepo;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepo deptRepo;
    private final EmployeeRepo empRepo;

    public List<DepartmentModel> fetchAllDepartment(){
        return deptRepo.findAll();
    }

    public DepartmentModel insertDepartment(DepartmentDto dto){
        Optional<DepartmentModel> opt = deptRepo.findByDeptName(dto.getDeptName());
        if(opt.isEmpty()){
            DepartmentModel model = new DepartmentModel();
            model.setDeptName(dto.getDeptName());
            model.setEmployees(null);
            return deptRepo.save(model);
        }else {
            throw new RuntimeException("Department Already Exist!");
        }
    }

    public DepartmentModel updateDepartment(Integer id,DepartmentDto dto){
        Optional<DepartmentModel> opt = deptRepo.findById(id);
            if(opt.isPresent()){
                DepartmentModel model = opt.get();
                Optional<DepartmentModel> op2 = deptRepo.findByDeptName(dto.getDeptName());
                if(op2.isPresent() && !op2.get().getDeptId().equals(id)){
                    throw new RuntimeException("Department Already Exist");
                }else {
                    model.setDeptName(dto.getDeptName());
                    return deptRepo.save(model);
                }
            }else {
                throw new RuntimeException("Department Doesnt Exist");
            }
    }

    public Boolean deleteDepartment(Integer id){
    	
        Optional<DepartmentModel> opt = deptRepo.findById(id);
        if(opt.isPresent()){
            DepartmentModel model = opt.get();
            List<EmployeeModel> emp = model.getEmployees();

            if(emp != null){
                for(EmployeeModel em : emp){
                    em.setDepartment(null);
                    empRepo.save(em);
                }
            }

            deptRepo.delete(model);
            return true;
        }else {
            return false;
        }
    }

    public DepartmentModel findDeptById(Integer id){
        Optional<DepartmentModel> opt = deptRepo.findById(id);
        if(opt.isPresent()){
            return opt.get();
        }else {
            throw new RuntimeException("Department Doesnt Exist");
        }
    }

}
