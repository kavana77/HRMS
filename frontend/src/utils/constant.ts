import type { SidebarItem } from "@/components/types/data";
import { Clock, FileText, Home, Users, Wallet } from "lucide-react";

export const SideBarItems: SidebarItem[] = [
    {
        label: "Home",
        icon: Home,
        path: "/admin/home"
    },
    {
        label: "Employees",
        icon: Users,
        path: "/admin/employees"
    },
    {
        label: "Attendance",
        icon: Clock,
        path: "/admin/attendance"
    },
    {
        label: "Payroll",
        icon: Wallet,
        path: "/admin/payroll"
    },
    {
        label: "Reports",
        icon: FileText,
        path: "/admin/reports"
    }
]