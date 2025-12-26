import NavbarActions from "./NavbarActions"
import NavbarSearch from "./NavbarSearch"
import ProfileMenu from "./ProfileMenu"
import Logo from "../../assets/magureLogo.png"
interface DashboardNavbarProps {
  image: string;
  role: "admin" | "manager" | "employee";
}
const DashboardNavbar =({ image,role }: DashboardNavbarProps)=>{
    return(
        <nav className="w-full bg-cover bg-center bg-no-repeat flex justify-between items-center h-16 rounded-t-xl px-2 sm:px-3 md:px-4 lg:px-10 xl:px-14"
        style={{backgroundImage: `url(${image})`}}>

            {/* icon */}
            <div className="flex items-center">
                <img src={Logo} className="w-25 sm:w-30 md:w-35 lg:w-40 xl:w-45 bg-cover bg-center "/>
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