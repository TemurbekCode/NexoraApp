import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PATHS } from "../config/appConfig";

function Splash() {
    return <div className="splash" role="status" aria-label="Loading"><span className="spinner spinner--lg" /></div>;
}

export function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    if (loading) return <Splash />;
    if (!isAuthenticated) return <Navigate to={PATHS.login} replace state={{ from: location }} />;
    return <Outlet />;
}

// Login/Register: authenticated bo'lsa redirect.
// Onboarding tugamagan bo'lsa /setup'ga, aks holda /dashboard'ga.
export function PublicOnlyRoute() {
    const { isAuthenticated, loading, preferences } = useAuth();
    const location = useLocation();
    if (loading) return <Splash />;
    if (isAuthenticated) {
        const fallback = preferences?.onboarded ? PATHS.dashboard : PATHS.setup;
        return <Navigate to={location.state?.from?.pathname ?? fallback} replace />;
    }
    return <Outlet />;
}