import { LayoutDashboard, PieChart, DollarSign, Users, Package, ListOrdered, FileText, Settings } from "lucide-react";

export const NAV_ITEMS = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/analytics", label: "Analytics", icon: PieChart },
    { to: "/revenue", label: "Revenue", icon: DollarSign },
    { to: "/customers", label: "Customers", icon: Users },
    { to: "/products", label: "Products", icon: Package },
    { to: "/orders", label: "Orders", icon: ListOrdered },
    { to: "/reports", label: "Reports", icon: FileText },
    { to: "/settings", label: "Settings", icon: Settings },
];