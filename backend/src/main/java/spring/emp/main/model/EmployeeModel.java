package spring.emp.main.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import spring.emp.main.enums.EmployeeShift;
import spring.emp.main.enums.EmployeeType;

@Getter
@Setter
@Entity
@Table(name = "employees")
public class EmployeeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id")
    private Integer empId;

    @Column(name = "first_name", nullable = false)
    private String empFirstName;

    @Column(name = "last_name", nullable = false)
    private String empLastName;

    @Column(name = "username", nullable = false, unique = true)
    private String empUsername;

    @Column(name = "age", nullable = false)
    private Integer empAge;

    @Column(name = "phone", nullable = false, unique = true)
    private Long empPhone;

    @Column(name = "email", nullable = false, unique = true)
    private String empEmail;

    @Column(name = "salary", nullable = false)
    private Double empSalary;

    @Column(name = "address", nullable = false)
    private String empAddress;

    @Column(name = "job_title", nullable = false)
    private String empJobTitle;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private EmployeeType empType;

    @Enumerated(EnumType.STRING)
    @Column(name = "shift", nullable = false)
    private EmployeeShift empShift;

    @ManyToOne
    @JoinColumn(name = "dept_id")
    @JsonManagedReference // department name was not displaying
    private DepartmentModel department;

}