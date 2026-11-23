package spring.emp.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import spring.emp.main.dto.DepartmentDto;
import spring.emp.main.model.DepartmentModel;
import spring.emp.main.service.DepartmentService;

import java.util.List;

@RestController
@RequestMapping("/dept")
@RequiredArgsConstructor
public class DepartmentController {
    
    private final DepartmentService service;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<DepartmentModel> addDept(@RequestBody DepartmentDto dto){
         return new ResponseEntity<>(service.insertDepartment(dto), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/find/{id}")
    public ResponseEntity<DepartmentModel> findDept(@PathVariable Integer id){
        return new ResponseEntity<>(service.findDeptById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<DepartmentModel> updateDept(@PathVariable Integer id, @RequestBody DepartmentDto dto){
        return new ResponseEntity<>(service.updateDepartment(id,dto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDept(@PathVariable Integer id){
            Boolean isDeleted = service.deleteDepartment(id);
            if(!isDeleted){
                return new ResponseEntity<>("Department Not Found", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>("Department Deleted!", HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/home")
    public ResponseEntity<List<DepartmentModel>> fetchDept(){
        return new ResponseEntity<>(service.fetchAllDepartment(), HttpStatus.OK);
    }

}
