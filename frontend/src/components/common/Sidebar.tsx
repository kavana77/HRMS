import { SideBarItems } from "@/utils/constant"
import LOGO from "../../assets/logo.png"
import { NavLink } from "react-router-dom"
import { LogOut } from "lucide-react"

const handleLogout = () => {
    // Clear user data from local storage or context
    localStorage.removeItem("user")
    // Redirect to login page
    window.location.href = "/"
}

const Sidebar = () => {
    return (
        <aside className="h-screen w-16 bg-white/30 backdrop-blur-lg flex flex-col items-center">

            {/* Logo */}
            <div className="flex items-center justify-center mt-3 mb-4">
                <img src={LOGO} className="w-8" />
            </div>

            {/* Nav */}
            <nav className="flex flex-col items-center gap-2 w-full px-1">
                {SideBarItems.map((item) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                flex flex-col items-center justify-center
                w-full py-2 rounded-md
                text-[10px] font-medium
                transition-all duration-200
                ${isActive
                                    ? "bg-primary text-white/50"
                                    : "text-gray-600 hover:bg-gray-100"
                                }
                `
                            }
                        >
                            <Icon size={18} />
                            <span className="mt-1 text-center leading-none">
                                {item.label}
                            </span>
                        </NavLink>
                    )
                })}
                <div className="px-1 pb-3 mt-42">
                    <button
                        onClick={handleLogout}
                        className="flex flex-col items-center justify-center w-full py-2 rounded-md text-[11px] font-medium text-red-500 cursor-pointer"
                    >
                        <LogOut size={18} />
                        <span className="mt-1">Logout</span>
                    </button>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
