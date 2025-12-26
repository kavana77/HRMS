import { getEmployeeDashboard } from "@/utils/http";
import Background from "../../assets/employeeBg.png"
import { useQuery } from "@tanstack/react-query";
import DashboardNavbar from "@/components/common/DashboardNavbar";
import EmpNavImg from "../../assets/employeeNavbar.png"
import WelcomeAttendanceCard from "@/components/employee/WelcomeAttendanceCard";
import BottomHoverMenu from "@/components/BottomHoverMenu";
const EmployeeDashboard = ()=>{
    const { data } = useQuery({
    queryKey: ["employee"],
    queryFn: getEmployeeDashboard,
  });

 
    return(
        <section className="min-h-screen w-full bg-cover bg-center bg-no-repeat" 
        style={{backgroundImage: `url(${Background})`}}>
            <DashboardNavbar
            role="employee"
            image={EmpNavImg}
            />
            <WelcomeAttendanceCard/>
            {data}Employee Dashboard
            <BottomHoverMenu/>
        </section>
    )
}
export default EmployeeDashboard