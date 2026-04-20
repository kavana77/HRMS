import { Bell } from "lucide-react"
import { Input } from "../../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { SidebarTrigger } from "../../ui/sidebar"


const Header = () => {
    return (
        <header className="py-3 flex items-center justify-between pr-[16px]">
            <SidebarTrigger />
            <p className="text-sm text-white">← Workspace</p>
            <div className="flex items-center gap-[24px]">
                <Input
                    placeholder="Search..."
                    className="w-[275px] h-[36px]" />
                <Bell className="bg-gray-300 w-8 h-8 rounded-full p-1.5 " />
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>HR</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}
export default Header