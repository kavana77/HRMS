import {Bell,  BookOpen,  Settings} from "lucide-react"
interface Props{
    role: "admin" | "manager" | "employee"
}
const NavbarActions = ({role}:Props)=>{
    return(
        <div className="flex items-center gap-5 sm:gap-3 md:gap-6 lg:gap-8">
            <button className="relative flex items-center justify-center">
                <span className="bg-red-700 absolute rounded-full w-3.5 h-3.5 -top-1 -right-1 text-white text-[10px] flex items-center justify-center font-semibold">1</span>
                <Bell size={21}/>
            </button>
            <button >
                <BookOpen/>
            </button>
            {/* only admin sees settings*/}
            {role === "admin" && (
                <button>
                    <Settings size={21}/>
                </button>
            )}
        </div>
    )
}
export default NavbarActions