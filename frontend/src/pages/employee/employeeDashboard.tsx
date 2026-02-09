import { getEmployeeDashboard } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import DashboardNavbar from "@/components/common/DashboardNavbar";
import WelcomeAttendanceCard from "@/components/employee/WelcomeAttendanceCard";
import BottomHoverMenu from "@/components/BottomHoverMenu";
const EmployeeDashboard = ()=>{
    const { data } = useQuery({
    queryKey: ["employee"],
    queryFn: getEmployeeDashboard,
  });

 
    return(
        <section className="min-h-screen w-full bg-cover bg-center bg-no-repeat" 
        style={{backgroundImage: `url()`}}>
            <DashboardNavbar
            role="employee"
            image={""}
            />
            <WelcomeAttendanceCard/>
            {data}Employee Dashboard
            <BottomHoverMenu/>
        </section>
    )
}
export default EmployeeDashboard