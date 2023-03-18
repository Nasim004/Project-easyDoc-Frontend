import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuthLogin = () => {
    console.log("Inside Auth Function");
    const token = Cookies.get('jwt-admin')
    console.log(token);
    return (
        token
            ? <Outlet />
            : <Navigate to='/admin/login' />
    )
}

export const LoginPageRender = () => {
    const token = Cookies.get('jwt-admin')
    return (
        token
            ? <Navigate to='/admin/panel' />
            : <Outlet />
    )
}

export const RequireAuthLoginHospital = () => {
    const token = Cookies.get('jwt-hospital')
    return (
        token
            ? <Outlet />
            : <Navigate to='/hospital/login' />



    )
}

export const LoginPageRenderHospital = () => {
    const token = Cookies.get('jwt-hospital')
    return (
        token
            ? <Navigate to='/hospital/panel' />
            : <Outlet />

    )

}






