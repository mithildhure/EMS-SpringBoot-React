import axios from 'axios';
import Api from '../auth/Api';
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import AddDept from './AddDept';
import UpdateDept from './UpdateDept';

const ViewDept = () => {

  const [dept, setDept] = useState([]);
  const [selectedDept, setSelectedDept] = useState({deptId : "", deptName : ""});

  const [deptIdToDelete, setDeptIdToDelete] = useState(null);
  const closeDeleteModalRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const roles = JSON.parse(localStorage.getItem("roles") || []);
  const isAdmin = roles.some(role => role.authority === 'ROLE_ADMIN');

// alert box logic

  useEffect(() => {
    fetchDept();
  },[]);

  const fetchDept = async () => {
    try {
      const response = await Api.get(`/dept/home`);
      setDept(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = () => {
      if (!deptIdToDelete) return;

      Api.delete(`/dept/delete/${deptIdToDelete}`).then((res) => {
          console.log("Deleted Succesfully : ",res);
          
          if (closeDeleteModalRef.current) closeDeleteModalRef.current.click();

          fetchDept();

          setDeptIdToDelete(null);
      }).catch((err) => {
          console.log(err);
          setErrorMessage("Failed To Delete Department");
      });

  }

  return (
    <>
    
    <div
      className="container text-center my-3 p-2">
      
        <div className="container my-4">
          <h3 className='text-center text-secondary mb-3'>Department List</h3>
        </div>

        <div className='col-md-7 col-lg-6 mx-auto'>
        <div className="d-flex justify-content-end align-items-center mb-2" >

                    {
                      isAdmin && (
                        <AddDept onDeptAdd={fetchDept} />
                        )
                    }

                            <NavLink className="btn btn-outline-primary" to='/' role='button'>
                              Employees
                            </NavLink>
                            
          </div>

            <div className="table-responsive rounded shadow-sm" >
              <table className="table table-hover table-bordered align-middle mb-0 ">
                <thead className='table-dark '>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>

                {
                  isAdmin && (
                    <th scope="col">Actions</th>
                  )
                }

              </tr>
               </thead>
              <tbody>
              {
                dept.length === 0 ? (
                  <tr>
                    <td colSpan="14" className='text-center'>No Department Found</td>
                  </tr>
                ) : (
                  dept.map((dep) => (
                      <tr key={dep.deptId}>
                      <td>{dep.deptId}</td>
                      <td>{dep.deptName}</td>
                      {
                        isAdmin && (
                          <td>
                                        <div
                                        className="container d-flex justify-content-center gap-2">

                                                <button 
                                                    className="btn btn-outline-warning btn-sm m-1" 
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#updateModalId"
                                                    onClick={() => setSelectedDept({deptId : dep.deptId, deptName : dep.deptName})}>
                                                    Update
                                                </button>

                                                <button className='btn btn-outline-danger btn-sm m-1' 
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteConfirmModal"
                                                onClick={() => setDeptIdToDelete(dep.deptId)}
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

        </div>

        <UpdateDept 
        deptId={selectedDept.deptId}
        currentName={selectedDept.deptName}
        onDeptUpdated={fetchDept}/>
        
        <div
          className="modal fade"
          id="deleteConfirmModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true">
          <div
            className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content text-start border-danger">
              <div className="modal-header bg-danger text-white p-2">
                <h6 className="modal-title" id="deleteModalLabel">
                  Confirm
                </h6>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeDeleteModalRef}
                ></button>
              </div>
              <div className="modal-body">
                <p className='mb-0 fw-bold text-secondary'>
                  Are you sure, you want to Permanently delete this department ?
                </p>
              </div>
              <div className="modal-footer d-flex justify-content-center p-2 bg-light">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm px-3"
                  data-bs-dismiss="modal"
                  onClick={() => {setDeptIdToDelete(null)}}
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

export default ViewDept