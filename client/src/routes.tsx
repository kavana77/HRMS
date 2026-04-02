import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import RootLayout from "./layout/rootLayout"
import AdminLayout from "./layout/adminLayout"

// pages
import AdminSignUpPage from "./pages/admin-onboarding/adminSignUpPage"
import VerifyEmailPage from "./pages/admin-onboarding/verifyEmailPage"
import LoginPage from "./pages/admin-onboarding/loginPage"
import LoginConfirmationPage from "./pages/admin-onboarding/loginConfirmationPage"
import WorkspaceSetupPage from "./pages/admin-onboarding/workspaceSetupPage"
import CompanyProfile from "./pages/admin-onboarding/companyProfile"

import Dashboard from "./pages/admin-onboarding/company-setting/dashboard"
import PayRollPage from "./pages/admin-onboarding/company-setting/payrollPage"
import LeavePage from "./pages/admin-onboarding/company-setting/leavePage"
import AttendancePage from "./pages/admin-onboarding/company-setting/attendancePage"
import CompanyPolicyPage from "./pages/admin-onboarding/company-setting/companyPolicyPage"

import AddLeaveForm from "./components/admin-onboarding/company-setting/AddLeaveForm"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

      {/* Admin Onboarding */}
      <Route path="admin">
        <Route path="signup" element={<AdminSignUpPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="login-confirmation" element={<LoginConfirmationPage />} />
        <Route path="workspace-setup" element={<WorkspaceSetupPage />} />
        <Route path="setup-company" element={<CompanyProfile />} />
      </Route>

      {/* Admin Dashboard */}
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="payroll" element={<PayRollPage />} />
        <Route path="leave" element={<LeavePage />}/>
        <Route path="leave/add-leave" element={<AddLeaveForm />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="company-policy" element={<CompanyPolicyPage />} />
      </Route>
    </Route>
  )
)

export default router