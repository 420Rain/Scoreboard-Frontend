"use client";

export default function Navbar() {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/sign-out", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <nav className="bg-linear-to-r from-[#1d2344] to-lscs-blue p-5 shadow-lg relative z-20">
        <div className="max-w-7xl flex justify-between items-center mx-auto">
          <p className="text-white text-3xl font-lexend">LSCS</p>
          
          <div className="flex gap-5">
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-white font-medium hover:bg-white/10 hover:text-red-300 rounded-md transition-all duration-200 font-poppins text-sm md:text-base cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="h-1 bg-lscs-yellow shadow-lg"></div>
    </div>
  );
}