package spring.emp.main.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import spring.emp.main.enums.EmployeeShift;
import spring.emp.main.enums.EmployeeType;

@Data
@Getter
@Setter
public class EmployeeDto {

    private String empFirstName;
    private String empLastName;
    private String empUsername;
    private Integer empAge;
    private Long empPhone;
    private String empEmail;
    private Double empSalary;
    private String empAddress;
    private String empJobTitle;
    private String empDepartment;
    private EmployeeType empType;
    private EmployeeShift empShift;

}
