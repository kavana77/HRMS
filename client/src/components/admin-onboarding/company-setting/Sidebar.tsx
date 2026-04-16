import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

import Logo from "@/assets/magure-logo.png"

import {
  LayoutDashboard,
  Wallet,
  CalendarCheck,
  Clock,
  FileText,
} from "lucide-react"

import { NavLink, useLocation } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Leave", icon: CalendarCheck, path: "/leave" },
  { name: "Attendance", icon: Clock, path: "/attendance" },
  { name: "Company Policy", icon: FileText, path: "/company-policy" },
  { name: "Payroll", icon: Wallet, path: "/payroll" }
]

const AdminSidebar = () => {
  const {state} = useSidebar()
  const location = useLocation()

  return (
    <Sidebar collapsible="icon" className="border-none ">

      {/* Logo */}
      <SidebarHeader className="flex flex-row items-center gap-2 px-6 py-5 bg-white">
        <img src={Logo} className="w-9 h-7" />

        {/* Hide text when collapsed */}
        <span className="font-semibold text-lg text-gray-800 group-data-[collapsible=icon]:hidden">
          HROne
        </span>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-2 mt-2 space-y-2 bg-white">

        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <Tooltip >
              <TooltipTrigger>
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-2.5 rounded-l-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-[#E8F0FE] text-blue-500"
                    : "text-gray-500 hover:bg-gray-100"
                }
                group-data-[collapsible=icon]:justify-center
                group-data-[collapsible=icon]:p-2
                group-data-[collapsible=icon]:h-12
                group-data-[collapsible=icon]:hover:${item.name}
                `
              }
            >
              {/* ICON */}
              <Icon size={18} className={`group-data-[collapsible=icon]:hover:${item.name}`}/>

              {/* TEXT (hidden when collapsed) */}
              <span className="group-data-[collapsible=icon]:hidden">
                {item.name}
              </span>

              {/* ACTIVE RIGHT BAR */}
              {location.pathname === item.path && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-1 rounded-l bg-blue-500 group-data-[collapsible=icon]:h-11" />
              )}
            </NavLink>
            <TooltipContent side="right"
            hidden={state !== "collapsed"}
            
            >
              {item.name}
            </TooltipContent>
            </TooltipTrigger>
            </Tooltip>
          )
        })}

      </SidebarContent>

    </Sidebar>
  )
}

export default AdminSidebar