import SetPasswordForm from "@/components/auth/SetPasswordForm"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

const SetPasswordPage = ()=>{
    return(
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-110 bg-white/50">
                <CardTitle className="ml-6 font-extrabold text-3xl pl-6 text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-400 to-orange-400">Activate Your Account</CardTitle>
                <CardContent>
                    <SetPasswordForm/>
                </CardContent>
            </Card>
        </div>
    )
}
export default SetPasswordPage