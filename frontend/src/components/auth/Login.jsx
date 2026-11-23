import axios from 'axios'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import Api from './Api';
import Loader from '../common/Loader';
import AllertMessage from '../common/AllertMessage';

const Login = () => {

    const [user, setUser] = useState({usernameOrEmail:'', password:''});
    const navigate = useNavigate();
    const [errorM, setErrorM] = useState('');
    const [showVerifyOptions, setShowVerifyOptions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setUser({...user,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:8080/auth/login',user).then((result) => {
            setLoading(false);
            localStorage.setItem("token", result.data.jwtToken);
            localStorage.setItem("roles", JSON.stringify(result.data.roles));
            navigate('/');
        }).catch((err) => {
            setLoading(false);
            setErrorM(err.response?.data || "Something went wrong");
            console.log(err);
            if (err.response.data === "Please Verify Your Email First!") {
                localStorage.setItem("unverifiedEmail",user.usernameOrEmail);
                setShowVerifyOptions(true);
            }
        });
    }

    const handleResendOtp = async () => {
            setLoading(true)
            await Api.post("/otp/resend",{email:localStorage.getItem("unverifiedEmail")}).then(() => {
                setLoading(false);
                setSuccessMessage('Otp Sent Successfully!')
            }).catch((err) => {
                setLoading(false);
                setErrorM(err.response?.data || "Failed To Send Otp");
                console.log(err);
            })
        };

        const handleVerifyEmail = () => {
            navigate("/verify-otp",{state : {
                email : localStorage.getItem('unverifiedEmail')
            }})
        };

  return (
    <>

        <div
            className="container my-4 p-3 bg-light rounded col-5 text-center shadow-sm border">

            <h3 className='text-center p-3 mt-1 mb-3'> Login </h3>    

            <form onSubmit={handleSubmit} >

                {loading && (<Loader/>)}

                <AllertMessage type="success" message={successMessage}/>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="usernameOrEmail"
                        id="fname"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="fname">Username Or Email</label>
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
                
                <AllertMessage type="danger" message={errorM} />

                {
                    showVerifyOptions && (
                        <div className="my-3">
                            <button type='button' className='btn btn-outline-warning btn-sm me-2' onClick={handleResendOtp} >
                                Resend Otp
                            </button>
                            <button type='button' className='btn btn-outline-primary btn-sm' onClick={handleVerifyEmail}>
                                Verify Email
                            </button>
                        </div>
                    )
                }

                <div className="container d-flex justify-content-between">
                    
                    <NavLink className='link-info' to="/forgot-password">Forgot Password ?</NavLink>

                <button
                    type="submit"
                    className="btn btn-outline-success">
                    Login
                </button>

                </div>
                

            </form>


                <h5 className='text-center p-2 mt-4'>New User ? <NavLink to='/register'>Register</NavLink> </h5>

        </div>
        

    </>
  )
}

export default Login