import Api from '../auth/Api';
import { useEffect, useRef, useState } from 'react'

const UpdateDept = ({deptId, currentName, onDeptUpdated}) => {
    const [deptName, setDeptName] = useState("");
    const closeButtonRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (currentName) {
                setDeptName(currentName);
        }else {
            setDeptName("");
        }
    },[currentName, deptId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!deptName.trim()){
            setErrorMessage("Department name cannot be empty!");
            return;
        };

        Api.put(`/dept/update/${deptId}`,{deptName : deptName}).then((result) => {
            console.log("Update Succesfull : ",result.data);
            if (closeButtonRef.current) {
                closeButtonRef.current.click();
            }
            onDeptUpdated();
        }).catch((err) => {
            console.log(err);
            if(err.response && err.response.data && err.response.data.error){
                setErrorMessage(err.response.data.error);
            }else {
                setErrorMessage("Something went wrong on the server side!")
            }
        })
    }

  return (
    <>
        <div
            className="modal fade"
            id="updateModalId"
            tabIndex="-1"
            aria-labelledby="updateModalTitleId"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-start">

                    <div className="modal-header">
                        <h5 className="modal-title" id="updateModalTitleId">
                            Update Department
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            ref={closeButtonRef}
                        ></button>
                    </div>

                    <form onSubmit={handleSubmit}>

                    <div className="modal-body">

                        {
                            errorMessage && (
                                <div
                                    className="alert alert-danger d-flex align-items-center py-2 px-3 mb-3 small" role='alert'>
                                        <i className='bi bi-exclamation-traingle-fill me-2'></i>
                                        <div>{errorMessage}</div>
                                </div>
                                
                            )
                        }

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="deptNameInput"
                                placeholder="Department Name"
                                value={deptName || ""}
                                onChange={(e) => setDeptName(e.target.value)}
                                required
                            />
                            <label htmlFor="deptNameInput">Department Name</label>
                        </div>

                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-success">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

    </>
  )
}

export default UpdateDept