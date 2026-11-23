import Api from '../auth/Api'
import { useRef, useState } from 'react'

const AddDept = ({onDeptAdd}) => {

    const [deptName, setDeptName] = useState('');
    const closeButtonRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!deptName.trim()) return alert("Department cannot be empty!");

        try {
            const respone = await Api.post(`/dept/add`, {
                deptName : deptName
            });
            console.log("Department Added : ",respone.data);
            setDeptName('');
            closeButtonRef.current.click();
            onDeptAdd();
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed To Add Department!');
        }
    }

  return (
    <>

        <button
            type="button"
            className="btn btn-outline-success mx-2"
            data-bs-toggle="modal"
            data-bs-target="#modalId"
        >
            + Add Dept
        </button>
        
        
        <div
            className="modal fade"
            id="modalId"
            tabIndex="-1"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-start">

                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId">
                            Add New Department
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
                                <div className='alert alert-danger d-flex align-items-center py-2 mb-3 small' role='alert'>
                                    <i className='bi bi-exclamation-triangle-fill me-2'></i>
                                    {errorMessage}
                                </div>
                            )
                        }

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="formId1"
                                id="deptNameInput"
                                placeholder=""
                                value={deptName}
                                onChange={(e) => setDeptName(e.target.value)}
                                required
                            />
                            <label htmlFor="formId1">Department Name</label>
                        </div>

                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-success">Add</button>
                    </div>

                    </form>

                </div>
            </div>
        </div>        

    </>
  )
}

export default AddDept