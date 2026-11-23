import Api from '../auth/Api';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const SearchEmp = () => {

    const {keyword} = useParams();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        Api.get(`/emp/search/${keyword}`).then((result) => {
            setEmployees(result.data || []);
        }).catch((err) => {
            console.log(err);
        })
    },[keyword]);

  return (
    <>

        <h1 className='text-center text-dark'>Search Results</h1>

            <div
                className="container"
            >
                
                {
                    employees.length === 0 ? (
                        <h4 className='text-center text-danger'>No Employee Found</h4>
                    ) : (
                        <table className='table table-bordered table-hover'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Age</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Salary</th>
                                    <th>Department</th>
                                    <th>Address</th>
                                    <th>Job Title</th>
                                    <th>Type</th>
                                    <th>Shift</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.map((emp) => (
                                        <tr key={emp.empId}>
                                            <td>{emp.empId}</td>
                                            <td>{emp.empFirstName}</td>
                                            <td>{emp.empLastName}</td>
                                            <td>{emp.empUsername}</td>
                                            <td>{emp.empAge}</td>
                                            <td>{emp.empPhone}</td>
                                            <td>{emp.empEmail}</td>
                                            <td>{emp.empSalary}</td>
                                            <td>{emp.department ? emp.department.deptName : ''}</td>
                                            <td>{emp.empAddress}</td>
                                            <td>{emp.empJobTitle}</td>
                                            <td>{emp.empType}</td>
                                            <td>{emp.empShift}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }

                <NavLink className='btn btn-danger' to="/">Back</NavLink>

            </div>
            

    </>
  )
}

export default SearchEmp