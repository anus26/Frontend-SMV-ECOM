import { Navigate, Outlet } from "react-router";
import useAuth from "../../redux/hooks/useAuth";

const ProtectedRoutes = ({allowedRoles}) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate to="/signin" replace />;
    }
  if (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(user.role.toLowerCase())) {
    return <Navigate to="/" replace />;
}

    console.log(user.role);
    console.log("USER:", user);
console.log("ROLE CHECK:", user.role, allowedRoles);

    
    return <Outlet/>;
}
export default ProtectedRoutes;