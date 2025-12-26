import { Search } from "lucide-react";
import { useState } from "react";

const NavbarSearch = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      {/* Search Input */}
      <div
        className={`relative ${
          open ? "block" : "hidden"
        } sm:block w-[260px] md:w-[320px]`}
      >
        <Search
          className="absolute hidden sm:flex left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
          placeholder="Search for page..."
          className="w-full rounded-full bg-white pl-9 pr-4 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Toggle Button (Mobile only) */}
      <button
        className="absolute ml-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/20 sm:hidden "
        onClick={() => setOpen((prev) => !prev)}
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default NavbarSearch;
