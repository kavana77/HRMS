import Header from "@/components/admin-onboarding/company-setting/Header"
import AdminSidebar from "@/components/admin-onboarding/company-setting/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
    return(
        <SidebarProvider style={
    {
      "--sidebar-width": "200px",
    } as React.CSSProperties
  }>
            <div className="flex h-screen w-full">
            <AdminSidebar/>
            <div className="flex flex-col flex-1">
                <Header/>
            <main className="flex-1 px-6 py-4 bg-[#F7FAFF]">

                <Outlet/>
            </main>
            </div>
            </div>
        </SidebarProvider>
    )
}
export default AdminLayout