
import './App.css';
import HomePage from './pages/Home'
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import UserProfile from './pages/UserProfile';
import Hospitals from './pages/HospitalList';


import HospitalSignup from './pages/HospitalSignup';
import HospitalLogin from './pages/HospitalLogin';
import HospitalPanel from './pages/HospitalPanel';
import HospitalDoctor from './pages/DoctorHospital'


import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'
import AdminHospital from './pages/AdminHospital'
import AdminDepartment from './pages/AdminDepartment';
import AdminUser from './pages/AdminUser'



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RequireAuthLogin, LoginPageRender, RequireAuthLoginHospital, LoginPageRenderHospital, RequireAuthLoginUser } from './utils/RequireAuthAdminLogin';




function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='signup' element={<UserSignup />} />
          <Route path='login' element={<UserLogin />} />
          <Route path='hospitals' element={<Hospitals />} />

          <Route element={<RequireAuthLoginUser />}>
            <Route path='myprofile' element={<UserProfile />} />
          </Route>

          <Route element={<LoginPageRenderHospital />}>
            <Route path='hospital/login' element={<HospitalLogin />} />
          </Route>

          <Route path='hospital/signup' element={<HospitalSignup />} />

          <Route element={<RequireAuthLoginHospital />} >
            <Route path='hospital/panel' element={<HospitalPanel />} />
            <Route path='hospital/doctor' element={<HospitalDoctor />} />
          </Route>

          <Route element={<LoginPageRender />}>
            <Route path='admin/login' element={<AdminLogin />} />
          </Route>

          <Route element={<RequireAuthLogin />}>
            <Route path='admin/panel' element={<AdminPanel />} />
            <Route path='admin/hospital' element={<AdminHospital />} />
            <Route path='admin/department' element={<AdminDepartment />} />
            <Route path='admin/user' element={<AdminUser />} />
          </Route>

        </Routes>
      </Router>
    </div>
  )


}

export default App;
