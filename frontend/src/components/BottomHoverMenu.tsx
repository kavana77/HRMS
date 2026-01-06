import { useState } from "react";
import {
  Home,
  CalendarCheck,
  Wallet,
  ClipboardList,
  FileText,
} from "lucide-react";

const BottomHoverMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50">
      {/* Half-moon hover area */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`
          relative overflow-hidden
          flex items-center justify-center
          bg-white/90 backdrop-blur-md shadow-xl
          transition-all duration-300 ease-out
          ${open ? "w-72 h-36" : "w-32 h-16"}
          rounded-t-full
        `}
      >
        {/* Icons container */}
        <div
          className={`relative
            flex items-center gap-6
            transition-all duration-300 ease-out
            ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {/* Home */}
          <div className="absolute -bottom-18 right-20 group flex flex-col items-center cursor-pointer">
            <Home size={26} className="transition-transform duration-200 group-hover:scale-125" />
            <span className="mt-0.5 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition">
              Home
            </span>
          </div>

          {/* Attendance */}
          <div className="absolute -bottom-6 right-8 group flex flex-col items-center cursor-pointer">
            <CalendarCheck size={26} className="transition-transform duration-200 group-hover:scale-125" />
            <span className="mt-0.5 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition">
              Attendance
            </span>
          </div>

          {/* Payroll */}
          <div className="absolute bottom-0 -right-4 group flex flex-col items-center cursor-pointer">
            <Wallet size={26} className="transition-transform duration-200 group-hover:scale-125" />
            <span className="mt-0.5 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition">
              Payroll
            </span>
          </div>

          {/* Requests */}
          <div className="absolute -bottom-6 left-9 group flex flex-col items-center cursor-pointer">
            <ClipboardList size={26} className="transition-transform duration-200 group-hover:scale-125" />
            <span className="mt-0.5 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition">
              Requests
            </span>
          </div>

          {/* Leaves */}
          <div className="absolute -bottom-18 left-20 group flex flex-col items-center cursor-pointer">
            <FileText size={28} className="transition-transform duration-200 group-hover:scale-125" />
            <span className="mt-0.5 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition">
              Leaves
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomHoverMenu;
