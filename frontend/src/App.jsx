import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./components/employee/Home"
import AddEmp from './components/employee/AddEmp'
import UpdateEmp from './components/employee/UpdateEmp'
import ViewDept from './components/department/ViewDept'
import Navbar from './components/Navbar'
import SearchEmp from './components/employee/SearchEmp'
import UpdateDept from './components/department/UpdateDept'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminRoute from './components/auth/AdminRoute'
import VerifyOtp from './components/otp/VerifyOtp'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import VerifyResetOtp from './components/otp/VerifyResetOtp'

function App() {

  return (
    <>
      <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/verify-otp' element={<VerifyOtp/>} />
                <Route path='/forgot-password' element={<ForgotPassword/>} />
                <Route path='/verify-reset-otp' element={<VerifyResetOtp/>}/>
                <Route path='/reset-password' element={<ResetPassword/>} />
                <Route path='/' element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
                <Route path='/emp/add' element={<ProtectedRoute><AdminRoute> <AddEmp/> </AdminRoute></ProtectedRoute>} />
                <Route path='/emp/update/:id' element={<ProtectedRoute> <AdminRoute> <UpdateEmp/> </AdminRoute> </ProtectedRoute>} />
                <Route path='/emp/search/:keyword' element={<ProtectedRoute> <SearchEmp/> </ProtectedRoute>} />
                <Route path='/dept' element={<ProtectedRoute><ViewDept/></ProtectedRoute>} />
                <Route path='/dept/update/:id' element={<ProtectedRoute> <AdminRoute> <UpdateDept/> </AdminRoute> </ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App