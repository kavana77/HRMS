import LoginForm from "@/components/auth/LoginForm"
import { Card, CardContent, CardTitle } from "@/components/ui/card"


const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-110  bg-white/40">
                <CardTitle className="font-extrabold text-3xl pl-6 text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-400 to-orange-400">Login</CardTitle>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}
export default Login