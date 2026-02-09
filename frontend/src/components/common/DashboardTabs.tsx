import { dashboardTabs, type Role } from "@/config/dashboardTabs"
import { NavLink } from "react-router-dom"

interface Props {
    role: Role
}
const DashboardTabs = ({role}: Props)=>{
    const tabs = dashboardTabs[role]
    return(
        <div className="bg-white w-full shadow-sm px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <nav className="flex h-10 items-center justify-between">
                {tabs.map((tab)=>{
                    const Icon = tab.icon
                    return(
                    <NavLink
                    key={tab.label}
                    to={tab.path}
                    className={({isActive})=>
                    `flex items-center gap-2 text-[10px] sm:text-sm md:text-md font-medium 
                    ${isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-500"}`}>
                        <Icon size={16} className="hidden sm:flex"/>
                        {tab.label}
                    </NavLink>
                    )
                })}
            </nav>
        </div>
    )
}
export default DashboardTabs