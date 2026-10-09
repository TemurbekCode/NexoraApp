import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useSettings } from "../context/SettingsContext";
import DashboardPage from "../pages/DashboardPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import RevenuePage from "../pages/RevenuePage";
import CustomersPage from "../pages/CustomersPage";
import ProductsPage from "../pages/ProductsPage";
import OrdersPage from "../pages/OrdersPage";
import ReportsPage from "../pages/ReportsPage";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";

export default function AppRoutes() {
    const { preferences } = useSettings();
    const home = `/${preferences.defaultView}`;
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route index element={<Navigate to={home} replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="revenue" element={<RevenuePage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to={home} replace />} />
            </Route>
        </Routes>
    );
}