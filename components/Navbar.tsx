"use client";
import { useState, useRef, useEffect } from "react";
import { Triangle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/sign-out", {
        method: "POST",
      });

      if(!res.ok){
        throw new Error("Logout failed");
      }

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <nav className="bg-linear-to-r from-[#1d2344] to-lscs-blue p-5 shadow-lg relative z-20">
        <div className="max-w-7xl flex justify-between items-center mx-auto">
          <p className="text-white text-3xl font-lexend">LSCS</p>
          <div className="flex gap-5">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 cursor-pointer focus:outline-none"
              >
                <div className="size-10 flex items-center justify-center bg-lscs-yellow rounded-full transition-transform hover:scale-105">
                  {/* <img src="" alt="" className="rounded-full" /> */}
                </div>
                <Triangle
                  className={`size-3 text-amber-50 fill-amber-100 transition-transform duration-200 ${
                    isOpen ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <button
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors text-sm font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-1 bg-lscs-yellow shadow-lg"></div>
    </div>
  );
}