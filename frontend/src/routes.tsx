import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "./layout/rootLayout";
import Login from "./pages/loginPage";
import SetPasswordPage from "./pages/setPasswordPage";
import AdminDashboard from "./pages/admin/adminDashboard";
import ManagerDashboard from "./pages/manager/managerDashboard";
import EmployeeDashboard from "./pages/employee/employeeDashboard";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<RootLayout/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="set-password" element={<SetPasswordPage/>}/>
            <Route path="admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="manager/dashboard" element={<ManagerDashboard/>}/>
            <Route path="employee/dashboard" element={<EmployeeDashboard/>}/>
        </Route>
        </>
    )
)
export default router