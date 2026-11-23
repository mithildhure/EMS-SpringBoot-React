package spring.emp.main.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "departments")
@Getter
@Setter
public class DepartmentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dept_id")
    private Integer deptId;

    @Column(name = "dept_name", nullable = false, unique = true)
    private String deptName;

    @JsonIgnore
    @OneToMany(mappedBy = "department")
    @JsonBackReference  //react was crashing btw this is parent
    private List<EmployeeModel> employees;

}
