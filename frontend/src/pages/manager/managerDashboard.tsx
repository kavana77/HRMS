import { useQuery } from "@tanstack/react-query"
import Background from "../../assets/managerBg.png"
import ManNavImg from "../../assets/managerNavbar.png"
import { getManagerDashboard } from "@/utils/http"
import DashboardNavbar from "@/components/common/DashboardNavbar"
import DashboardTabs from "@/components/common/DashboardTabs"
const ManagerDashboard = ()=>{
    const {data} = useQuery({
        queryKey: ["manager"],
        queryFn: getManagerDashboard
    })

    return(
        <section className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
         style={{backgroundImage: `url(${Background})`}}>
            <DashboardNavbar
            role="manager"
            image={ManNavImg}/>
            <DashboardTabs
            role="manager"/>
            {data}ManagerDashboard
            </section>
    )
}
export default ManagerDashboard