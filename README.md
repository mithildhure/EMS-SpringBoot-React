# Employee Management System (EMS) v1.0

**Employee Management System(EMS)** is a full-stack web application built using **Spring Boot** and **React** that provides secure employee and department management.

_The application implements **JWT Authentication, Role-Based Access Control (RBAC), Email Verification, Forgot Password and Password Reset** using **OTP** and **CRUD Operations** for employees and department._

## Features
### Authentication And Authorization 

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (RBAC)
* Email Verification OTP
* Resend OTP
* Forgot Password
* Password Reset
* BCrypt Password Encoding
* Protected Routes
* Admin Routes

### Employee Management 

* Insert Employee
* Update Employee
* Delete Employee
* View Employees
* Search Employee

### Department Management

* Add Department
* Update Department
* Delete Department
* View Departments

## Roles
### ROLE_ADMIN

* Manage Employees _**(CREATE, READ, UPDATE, DELETE)**_
* Manage Departments _**(CREATE, READ, UPDATE, DELETE)**_
* Access all secured operation

### ROLE_USER
* View Employees
* View Departments
* Search Employees
* **Restricted** From **CREATE / UPDATE / DELETE** operations

## Tech Stack
### Backend

* Java 
* Spring Boot
* Spring Data JPA
* Spring Security
* Spring Validation
* Spring Mail
* OAuth2 Resource Server (_**JWT**_)
* H2 Database
* Lombok
* Maven
* Spring Boot DevTools

### Frontend

* Node
* React
* React DOM
* React Router DOM
* Axios
* Bootstrap
* Vite
* ESLint / OxLint

## Project Structure

```text
backend/
|
├── config/
├── controller/
├── dto/
├── entity/
├── enums/
├── repository/
├── service/
├── security/
└── exception/

frontend/
│
├── auth/
├── employee/
├── department/
├── common/
└── assets/
```

## Database Design
### UserModel

| userId | username |       email        | password | emailVerified |
| ------ |:--------:|:------------------:|:--------:|:-------------:|
|      1 |   mithil | dummy123@gmail.com | ******** |    FALSE      |

### Role Model

| roleId |  roleName  |
| ------ |:----------:|
|      1 | ROLE_ADMIN |
|      2 | ROLE_USER  |

### Employee Model

| empId | empFirstName | empLastName |    empUsernam    | empAge |  empPhone  |      empEmail       | empSalary | empAddress | empJobTitle |  empType  | empShift |
| ----- |:------------:|:-----------:|:----------------:|:------:|:----------:|:-------------------:|:---------:|:----------:|:-----------:|:---------:|:--------:|
|     1 |        Tommy |    Vercetti | tommyvercetti123 |     22 | 1234567890 | tommyv123@gmail.com | 230000000 |  Vice City |  Accountant | FULL_TIME |      DAY |

### Department Model
| deptId | deptName |
| ------ |:--------:|
|      1 | Accounts |
|      2 |       HR |
|      3 |       IT |
|      4 |    Sales |

### Otp Model
| otpId |        email        | otpCode |      otpType       | expiryAt | OtpVerified |
| ------|:-------------------:|:-------:|:------------------:|:--------:|:-----------:|
|     1 | tommyv123@gmail.com |  234127 | EMAIL_VERIFICATION |    10:00 |       FALSE |
