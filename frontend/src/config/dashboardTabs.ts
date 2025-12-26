import { CalendarCheck, CheckSquare, ClipboardList, FileText, Home, LayoutDashboard, Users, Wallet, type LucideIcon } from "lucide-react";
export type Role = "admin" | "manager" | "employee"
export const dashboardTabs: Record<Role, {label: string; path: string; icon: LucideIcon}[]>={
    admin: [
        {label: "Dashboard", path: "/admin/dashboard", icon:Home },
        {label: "Employees", path: "/admin/employees", icon: Users},
        {label: "Attendance", path: "/admin/attendance", icon: CalendarCheck },
        {label: "Leaves", path: "/admin/leaves", icon: FileText}
    ],
    manager: [
        {label: "Dashboard", path: "/manager/dashboard", icon:LayoutDashboard},
        {label: "My Team", path: "/manager/team", icon:Users},
        {label: "Approvals", path: "/manager/approvals", icon: CheckSquare},
        {label: "Attendannce", path: "/manager/attendance", icon: CalendarCheck}
    ],
    employee: [
        {label: "Home", path: "/employee/dashboard", icon: Home},
        {label: "Attendance", path: "/employee/attendance", icon: CalendarCheck},
        {label: "Leaves", path: "/employee/leaves", icon: FileText},
        {label: "Requests", path: "/employee/requests", icon: ClipboardList},
        {label: "Payrolls", path: "/employee/payrolls", icon: Wallet}
    ]
}