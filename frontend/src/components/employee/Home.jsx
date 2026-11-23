import { useEffect, useRef, useState } from 'react'
import Api from '../auth/Api';
import { NavLink } from 'react-router-dom';
import SearchAndLinks from './SearchAndLinks';

const Home = () => {
    const [employee, setEmployee] = useState([]);
    const [empIdToDelete, setEmpIdToDelete] = useState(null);
    const closeDeleteModalRef = useRef(null);

    const roles = JSON.parse(localStorage.getItem("roles") || []);
    const isAdmin = roles.some(role => role.authority === 'ROLE_ADMIN');

    useEffect(() => {
        fetchEmployees()
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await Api.get(`/emp/home`);
            setEmployee(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = () => {
        
        if(!empIdToDelete) return;

        Api.delete(`/emp/delete/${empIdToDelete}`).then((res) => {
            console.log("Employee Deleted Succesfully : ", res);

            if(closeDeleteModalRef.current) closeDeleteModalRef.current.click();

            fetchEmployees();
            setEmpIdToDelete(null);
            
        }).catch((err) => {
            console.log(err);
            alert('Failed to delete Employee.');
        });

    }


  return (
    <>
        <div className="container-fluid my-4 px-4" >
                        
                        <div className="container text-center">
                            <h3 className='text-center text-secondary'>Employee List</h3>
                        </div>
                        
                        <SearchAndLinks/>

            <div className="table-responsive rounded">
                <table className="table table-light table-hover table-sm align-middle table-bordered">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Age</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Address</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Department</th>
                            <th scope="col">Type</th>
                            <th scope="col">Shift</th>
                            {

                                isAdmin && (
                                    <th scope="col">Actions</th>
                                )

                            }
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.length === 0 ? (
                                
                                    <tr>
                                        <td colSpan="14" className='text-center text-muted py-3'>No Employees Found</td>
                                    </tr>
                                
                            ) : (
                                    employee.map(emp => (
                                <tr key={emp.empId}>
                                <td>{emp.empId}</td>
                                <td>{emp.empFirstName}</td>
                                <td>{emp.empLastName}</td>
                                <td>{emp.empUsername}</td>
                                <td>{emp.empAge}</td>
                                <td>{emp.empPhone}</td>
                                <td>{emp.empEmail}</td>
                                <td>{emp.empSalary}</td>
                                <td>{emp.empAddress}</td>
                                <td>{emp.empJobTitle}</td>

                                <td>{emp.department ? emp.department.deptName : 'Unassigned'}</td>
                                
                                <td>{emp.empType}</td>
                                <td>{emp.empShift}</td>
                                {
                                    isAdmin && (

                                        <td>
                                    <div
                                        className="container d-flex justify-content-center align-items-center">
                                        
                                                <NavLink className="btn btn-outline-warning btn-sm m-1"
                                                to={`/emp/update/${emp.empId}`}
                                                role='button'>
                                                Update
                                                </NavLink>
                                         
                                        
                                                    <button 
                                                        className='btn btn-outline-danger btn-sm m-1'
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#deleteEmpModal" 
                                                        onClick={() => setEmpIdToDelete(emp.empId)}
                                                        >
                                                Delete
                                                </button>

                                    </div>    
                                </td>   

                                    )
                                }
                                </tr>
                                    ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <div
            className="modal fade"
            id="deleteEmpModal"
            tabIndex="-1"
            
            aria-labelledby="deleteEmpModalLabel"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-sm"
            >
                <div className="modal-content text-start border-danger">
                    <div className="modal-header bg-danger text-white p-2">
                        <h6 className="modal-title" id="deleteEmpModalLabel">
                            Confirm Deletion
                        </h6>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            ref={closeDeleteModalRef}
                        ></button>
                    </div>
                    <div className="modal-body text-center py-3">
                        <p className='mb-0 fw-semibold text-secondary'>
                            Are you sure you want to permanently delete this employee ?
                        </p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center p-2 bg-light">
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm px-3"
                            data-bs-dismiss="modal"
                            onClick={() => setEmpIdToDelete(null)}
                        >
                            Cancel
                        </button>
                        <button type="button" className="btn btn-danger btn-sm px-3" onClick={handleDelete}>Yes, Delete</button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Home