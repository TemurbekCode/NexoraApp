import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./config/appConfig";
import { ProtectedRoute, PublicOnlyRoute } from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessSetup from "./pages/BusinessSetup";
import Preferences from "./pages/Preferences";
import Profile from "./pages/Profile";
import DashboardPlaceholder from "./pages/DashboardPlaceholder";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path={PATHS.login} element={<Login />} />
        <Route path={PATHS.register} element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={PATHS.setup} element={<BusinessSetup />} />
        <Route path={PATHS.preferences} element={<Preferences />} />
        <Route path={PATHS.dashboard} element={<DashboardPlaceholder />} />
        <Route path={PATHS.profile} element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to={PATHS.dashboard} replace />} />
    </Routes>
  );
}