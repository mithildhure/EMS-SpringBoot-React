package spring.emp.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import spring.emp.main.dto.EmployeeDto;
import spring.emp.main.model.EmployeeModel;
import spring.emp.main.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/emp")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService service;

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/home")
    public ResponseEntity<List<EmployeeModel>> fetchAllEmp(){
        return new ResponseEntity<>(service.fetchAllEmployee(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<EmployeeModel> addEmp(@RequestBody EmployeeDto dto){
        EmployeeModel emp = service.insertEmployee(dto);
        if(emp != null){
            return new ResponseEntity<>(emp, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<EmployeeModel> updateEmp(@PathVariable Integer id, @RequestBody EmployeeDto model){
        EmployeeModel emp = service.updateEmployee(id,model);
        if(emp != null){
            return new ResponseEntity<>(emp, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteEmp(@PathVariable Integer id){
        Boolean result = service.deleteEmployee(id);
        if(result != false){
            return new ResponseEntity<>(result,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/find/{id}")
    public ResponseEntity<EmployeeModel> findEmp(@PathVariable Integer id){
        EmployeeModel model = service.findEmployee(id);
        if(model != null){
            return new ResponseEntity<>(model, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/search/{name}")
    public ResponseEntity<List<EmployeeModel>> searchEmp(@PathVariable String name){
        return new ResponseEntity<>(service.searchAllEmployees(name), HttpStatus.OK);
    }

}