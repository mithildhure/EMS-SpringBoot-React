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

**backend**
|
├── config
├── controller
├── dto
├── entity
├── enums
├── repository
├── service
├── security
└── exception

**frontend**
|
├── auth
├── employee
├── department
├── common
└── assets
