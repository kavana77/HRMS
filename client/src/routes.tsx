import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import RootLayout from './layout/rootLayout'
import AdminSignUpPage from './pages/admin-onboarding/adminSignUpPage'
import VerifyEmailPage from './pages/admin-onboarding/verifyEmailPage'
import LoginPage from './pages/admin-onboarding/loginPage'
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path='/' element={<RootLayout/>}>
        {/* Admin Onboarding */}
            <Route path='admin'>
                <Route path='signup' element={<AdminSignUpPage/>}/>
                <Route path='verify-email' element={<VerifyEmailPage/>}/>
                <Route path='login' element={<LoginPage/>}/>
            </Route>
        </Route>
        </>
    )
)
export default router