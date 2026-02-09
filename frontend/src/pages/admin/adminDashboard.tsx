import { useQuery } from "@tanstack/react-query"
import { getAdminDashboard } from "@/utils/http"
import DashboardNavbar from "@/components/common/DashboardNavbar"
import DashboardTabs from "@/components/common/DashboardTabs"
import Sidebar from "@/components/common/Sidebar"

const AdminDashboard =()=>{
    const {data} = useQuery({
        queryKey: ["admin"],
        queryFn: getAdminDashboard
    })
    return(
        <section className="flex min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: `url()`}}>
            <Sidebar/>
            <div className="w-full">
                <DashboardNavbar 
                role="admin"
                image={""}/>
                <DashboardTabs role="admin"/>
                {data}AdminDashboard
            </div>
            
        </section>
    )
}
export default AdminDashboard