import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
// import { useAuthContext } from "../hooks/auth/useauthcontext";

export  function PrivateRoute() {
     const { user } = useAuthContext()
     return user ? <Outlet /> : <Navigate to="/login" />;
}

export  function AllowededRoute() {
     const { user } = useAuthContext()
     return !user ? <Outlet /> : <Navigate to="/" />;
}
