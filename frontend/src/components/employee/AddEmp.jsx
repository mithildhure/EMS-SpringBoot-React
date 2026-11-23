import Api from '../auth/Api';
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const AddEmp = () => {

    const [emp, setEmp] = useState({empFirstName : '', empLastName:'',empUsername:'',empAge:'',empPhone:'',empEmail:'',empSalary:'',empAddress:'',empJobTitle:'', empDepartment:'ACCOUNTS',empType:'FULL_TIME',empShift:'DAY'});
    const [dept, setDept] = useState([]);
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        Api.get(`/dept/home`).then((result) => {
            setDept(result.data);
            if(result.data.length > 0){
                setEmp((prev) => ({
                    ...prev,
                    empDepartment: result.data[0].deptName
                }))
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleChange = (e) => {

        const {name, value} = e.target;

        if(name === 'empFirstName' || name === 'empLastName'){
            const lettersOnly = value.replace(/[^a-zA-Z\s]/g,'');
            setEmp({...emp, [name] : lettersOnly});
            return;
        }

        if(name === 'empPhone'){
            const numbersOnly = value.replace(/\D/g,'');
            if(numbersOnly.length > 10) return;

            setEmp({...emp, [name] : numbersOnly});
            return;
        }

        setEmp({
            ...emp,[name] : value
        });

    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrorMessage('');

        if(emp.empPhone.length !== 10){
            setErrorMessage('Phone number must contain 10 digits!');
            return;
        }

        if(emp.empFirstName.trim().length < 2 || emp.empLastName.trim().length < 2){
            setErrorMessage('Enter Valid Name!');
            return;
        }
        
        if(parseInt(emp.empAge) < 18 || parseInt(emp.empAge) > 100){
            setErrorMessage('Employee Age Must be between 18 and 100!');
            return;
        }

        setSubmit(true);

        Api.post(`/emp/add`,emp).then((result)=>{
            setSubmit(false);
            navigate('/');
        }).catch((err)=>{
            console.log(err);
            setSubmit(false);
            setErrorMessage('failed to add Employee!');
        });

    }

  return (
    <>
        <div className="container my-4 p-3 bg-light rounded col-6 border shadow-sm">
            <h3 className='text-center p-3 my-3'>Add Employee</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="fname"
                        name='empFirstName'
                        value={emp.empFirstName}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="fname">First Name</label>
                </div>
                
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="lname"
                        name='empLastName'
                        value={emp.empLastName}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="lname">Last Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="uname"
                        name='empUsername'
                        value={emp.empUsername}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="uname">User Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        name='empAge'
                        value={emp.empAge}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="age">Age</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name='empPhone'
                        placeholder='1234567890'
                        value={emp.empPhone}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="phone">Phone (10 Digits)</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name='empEmail'
                        value={emp.empEmail}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="salary"
                        name='empSalary'
                        value={emp.empSalary}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="salary">Salary</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name='empAddress'
                        value={emp.empAddress}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="address">Address</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="jtitle"
                        name='empJobTitle'
                        value={emp.empJobTitle}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="jtitle">Job Title</label>
                </div>

                <div className="mb-3">
                    <label htmlFor="dept" className="form-label">Department</label>
                    <select
                        className="form-select form-select-lg"
                        name="empDepartment"
                        id="dept"
                        value={emp.empDepartment}
                        onChange={handleChange}
                        required>{
                            dept.length === 0 ? (
                                <option value="">No Department Available</option>
                            ) : (
                                dept.map((d) => (
                                    <option key={d.deptId} value={d.deptName}>{d.deptName}</option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="shift" className="form-label">Shift</label>
                    <select
                        className="form-select form-select-lg"
                        name="empShift"
                        id="shift"
                        value={emp.empShift}
                        onChange={handleChange}>
                        <option value="DAY">Day</option>
                        <option value="NIGHT">Night</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="Etype" className="form-label">Type</label>
                    <select
                        className="form-select form-select-lg"
                        name="empType"
                        id="Etype"
                        value={emp.empType}
                        onChange={handleChange}>
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="CONTRACT">Contract</option>
                    </select>
                </div>

            {
                errorMessage && (
                    <div className='alert alert-danger text-center' role='alert'>
                        {errorMessage}
                    </div>
                )
            }

                <div className="container d-flex justify-content-between">   

                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={submit}
                    >
                        {submit ? 'Adding...' : 'Submit'}
                    </button>

                    <NavLink className='btn btn-danger' to='/' role='button'>
                        Return
                    </NavLink>
                </div>
            </form>

        </div>
        
    </>
  )
}

export default AddEmp