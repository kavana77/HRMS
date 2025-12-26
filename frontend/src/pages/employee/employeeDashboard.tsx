import { getEmployeeDashboard } from "@/utils/http";
import Background from "../../assets/employeeBg.png"
import { useQuery } from "@tanstack/react-query";
import DashboardNavbar from "@/components/common/DashboardNavbar";
import EmpNavImg from "../../assets/employeeNavbar.png"
import DashboardTabs from "@/components/common/DashboardTabs";
import WelcomeAttendanceCard from "@/components/employee/WelcomeAttendanceCard";
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
            <DashboardTabs
            role="employee"/>
            <WelcomeAttendanceCard/>
            {data}Employee Dashboard
        </section>
    )
}
export default EmployeeDashboard