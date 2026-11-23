import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const SearchAndLinks = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const roles = JSON.parse(localStorage.getItem("roles") || []);
    const isAdmin = roles.some(role => role.authority === "ROLE_ADMIN");

    const handleSearch = (e) => {
        e.preventDefault();
        if(!keyword.trim()){
            return;
        }
        navigate(`emp/search/${keyword}`);
    }

  return (
    
        <>
        
            <div className="container-fluid px -0 my-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
                                            
                                            <form className='d-flex gap-2 m-0' role='search' onSubmit={handleSearch}>
                                                <input  className='form-control' type="search" value={keyword} onChange={(e) => {setKeyword(e.target.value)}} placeholder='Search' style={{maxWidth : '200px'}} />
                                                    <button type='submit' className='btn btn-outline-info '>
                                                        Search
                                                    </button>
            
                                            </form>
            
                                    <div className='d-flex gap-2'>
                                        <NavLink className="btn btn-outline-primary mx-2" to='/dept' role='button'>
                                        Department
                                        </NavLink>

                                        {
                                            isAdmin && (
                                                <NavLink className='btn btn-outline-success' to='/emp/add' role='button'>
                                                    Add Emp
                                                </NavLink>
                                            )
                                        }
                                        </div>
                                        
                                    </div>
        
        </>
    
  )
}

export default SearchAndLinks