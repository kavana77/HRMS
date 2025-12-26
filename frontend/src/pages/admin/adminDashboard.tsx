import { useQuery } from "@tanstack/react-query"
import Background from "../../assets/adminBg.png"
import { getAdminDashboard } from "@/utils/http"
import DashboardNavbar from "@/components/common/DashboardNavbar"
import AdminNavImg from "../../assets/adminNavbar.png"
import DashboardTabs from "@/components/common/DashboardTabs"

const AdminDashboard =()=>{
    const {data} = useQuery({
        queryKey: ["admin"],
        queryFn: getAdminDashboard
    })
    return(
        <section className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: `url(${Background})`}}>
            <DashboardNavbar 
            role="admin"
            image={AdminNavImg}/>
            <DashboardTabs role="admin"/>
            {data}AdminDashboard
        </section>
    )
}
export default AdminDashboard