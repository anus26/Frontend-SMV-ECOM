import { Navigate, Outlet } from "react-router";
import useAuth from "../../redux/hooks/useauth";

const ProtectedRoutes = ({allowedRole}) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate to="/signin" replace />;
    }
    if (allowedRole&&!allowedRole.includes(user.role)) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}
export default ProtectedRoutes;