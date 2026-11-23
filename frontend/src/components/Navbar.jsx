import { NavLink, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    navigate("/login");
  }
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container ">

                <NavLink className="text-primary navbar-brand" to="/">
                    Employee Management System
                </NavLink>

                {
                    token && (
                        <button
                            className="btn btn-outline-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )
                }

            </div>

        </nav>
    </>
  )
}

export default Navbar