import { useState } from "react";
import { CalendarCheck, ClipboardList, FileText, Home,  Wallet } from "lucide-react";


const BottomHoverMenu = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2">
            <div className="relative w-40 h-40" >
                {/* Home */}
                <button
                    className={`group absolute -bottom-23 left- -translate-x-1/2
                    w-10 h-10 rounded-full bg-white/80 text-black flex items-center justify-center
                    transition-all duration-300 hover:shadow-lg shadow-black/70
                    ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                >
                    <span
                        className="
                    pointer-events-none
                    absolute -top-9 left-0 -translate-x-1/2
                    whitespace-nowrap
                    rounded-md bg-black/80 px-2 py-1
                    text-xs text-white
                    opacity-0 scale-95
                    transition-all duration-200
                    group-hover:opacity-100 group-hover:scale-100
    "
                    >
                        Home
                    </span>
                    <Home size={18} className="hover:scale-150 duration-200 transition-all cursor-pointer active:scale-110" />
                </button>

                <button
                    className={`group absolute -bottom-13 left-3.5
                    w-10 h-10 rounded-full bg-white/80 text-black flex items-center justify-center
                    transition-all duration-300 ease-out hover:shadow-lg shadow-black/70
                    ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                >
                    <span
                        className="
                        pointer-events-none
                        absolute -top-9 left-2 -translate-x-1/2
                        whitespace-nowrap
                        rounded-md bg-black/80 px-2 py-1
                        text-xs text-white
                        opacity-0 scale-95
                        transition-all duration-200
                        group-hover:opacity-100 group-hover:scale-100
                        "
                    >
                        Attendance
                    </span>
                    <CalendarCheck size={18} className="hover:scale-150 duration-200 transition-all cursor-pointer 
                    active:scale-110"/>
                </button>

                <button
                    className={`group absolute -bottom-9 right-1/2 translate-x-1/2
                    w-10 h-10 rounded-full bg-white/80  text-black flex items-center justify-center
                    transition-all duration-300 ease-out
                    ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                >
                    <span
                        className="
                        pointer-events-none
                        absolute -top-9 left-6 -translate-x-1/2
                        whitespace-nowrap
                        rounded-md bg-black/80 px-2 py-1
                        text-xs text-white
                        opacity-0 scale-95
                        transition-all duration-200
                        group-hover:opacity-100 group-hover:scale-100
                        "
                    >
                        Payrolls
                    </span>
                    <Wallet size={18} className="hover:scale-150 duration-200 transition-all cursor-pointer hover:shadow-lg shadow-black/70
                    active:scale-110"/>
                </button>
                <button
                    className={`group absolute -bottom-13 right-8.5 translate-x-1/2
                    w-10 h-10 rounded-full bg-white/80  text-black flex items-center justify-center
                    transition-all duration-300 ease-out
                    ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                >
                    <span
                        className="
                        pointer-events-none
                        absolute -top-9 left-10 -translate-x-1/2
                        whitespace-nowrap
                        rounded-md bg-black/80 px-2 py-1
                        text-xs text-white
                        opacity-0 scale-95
                        transition-all duration-200
                        group-hover:opacity-100 group-hover:scale-100
                        "
                    >
                        Requests
                    </span>
                    <ClipboardList size={18} className="hover:scale-150 duration-200 transition-all cursor-pointer hover:shadow-lg shadow-black/70
                    active:scale-110"/>
                </button>
                <button
                    className={`group absolute -bottom-23 -right-10 -translate-x-1/2
                    w-10 h-10 rounded-full bg-white/80 backdrop-blur-md
                    flex items-center justify-center
                    transition-all duration-300 ease-out
                    ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                >
                    {/* Tooltip */}
                    <span
                        className="
                        pointer-events-none
                        absolute -top-9 left-10 -translate-x-1/2
                        whitespace-nowrap
                        rounded-md bg-black/80 px-2 py-1
                        text-xs text-white
                        opacity-0 scale-95
                        transition-all duration-200
                        group-hover:opacity-100 group-hover:scale-100
                        "
                    >
                        Leaves
                    </span>

                    {/* Icon */}
                    <FileText
                        size={18}
                        className="
                        cursor-pointer
                        transition-transform duration-200
                        group-hover:scale-125
                        active:scale-110
                        "
                    />
                </button>

                {/* Center button */}
                <button
                    className="absolute -bottom-41 left-1/2 -translate-x-1/2
                w-26 h-26 rounded-full bg-white text-black flex items-center justify-center
                shadow-lg " onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
                        >
                </button>
            </div>
        </div>
    );
};

export default BottomHoverMenu;
