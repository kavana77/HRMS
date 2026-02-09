import NavbarActions from "./NavbarActions"
import NavbarSearch from "./NavbarSearch"
import ProfileMenu from "./ProfileMenu"
interface DashboardNavbarProps {
  image: string;
  role: "admin" | "manager" | "employee";
}
const DashboardNavbar =({role }: DashboardNavbarProps)=>{
    return(
        <nav className="w-full bg-white/30 backdrop-blur-lg  flex justify-between items-center h-10  pr-2 sm:px-3 md:pr-4 lg:pr-10 xl:pr-14"
        >
            <div className="font-bold text-lg -ml-3">
               HR Admin
            </div>
                <NavbarSearch/>
            <div className="flex">
                <NavbarActions role={role}/>
                <ProfileMenu/>
            </div>
        </nav>
    )
}
export default DashboardNavbar