import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

const Register = () => {

    const [user, setUser] = useState({username:'',email:'',password:''});
    const [errorM, setErrorM] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user,
           [name] : value 
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post('http://localhost:8080/auth/register',user).then((result) => {
            setLoading(false);
            navigate("/verify-otp",{
                state : {email : user.email}
            });
        }).catch((err) => {
            setLoading(false);
            setErrorM(err.response?.data || "Something went wrong!");
            console.log(err);
        });
    }

  return (
    <>
    
        <div
            className="container my-4 p-3 bg-light rounded col-5 text-center shadow-sm border">
            
            <h3 className='text-center p-3 my-3'> Register </h3>    

            <form onSubmit={handleSubmit} >

                {loading && (<Loader/>)}

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="fname"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="fname">Username</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="femail"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="femail">Email</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="fpass"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="fpass">Password</label>
                </div>

                {
                errorM && (
                    <div className='alert alert-danger text-center' role='alert'>
                        {errorM}
                    </div>
                )
            }
                
                <button
                    type="submit"
                    className="btn btn-outline-success"
                >
                    Register
                </button>
            </form>

            <h5 className='text-center p-2 my-2' >Already Registered ? <NavLink to='/login'>Login</NavLink> </h5>

        </div>

    </>
  )
}

export default Register