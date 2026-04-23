"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth-url');

      if (!response.ok) {
        throw new Error("Failed to fetch login URL");
      }

      const data = await response.json();

      if (data.loginUrl) {
        window.location.href = data.loginUrl;
      } else {
        console.error("URL not found in backend response:", data);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // bg-linear-to-t from-lscs-blue/80 from-0% via-lscs-yellow/60 via-20% to-white to-40%
    // 
    <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-lscs-blue/30 from 0% to-gray-50 to-20% px-4 pb-10">
      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
        <div className="text-center font-poppins text-gray-800">
          <p className="font-bold text-2xl md:text-3xl lg:text-4xl mb-5 font-lexend bg-linear-to-r from-yellow-400 to-blue-500 bg-clip-text text-transparent"><span className="text-lscs-yellow">LSCS</span> <span className="text-lscs-blue">Scoreboard</span></p>

          <div className="relative group p-0.75 bg-gray-400 rounded-lg shadow-lg overflow-hidden transition-all duration-400 hover:shadow-lg hover:shadow-gray-500/40">
            <div className="absolute inset-0 bg-linear-to-t from-gray-600 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
            <div className="relative z-10 px-5 py-3 bg-white rounded-md flex items-center justify-between">
              <div className="flex flex-col w-full p-3 gap-4">
                <p className="text-md md:text-lg font-semibold">Please Sign In With Your DLSU Email</p>
                <Button 
                  onClick={handleGoogleSignIn} 
                  disabled={isLoading}
                  className="w-full p-6 text-md hover:bg-gray-800 duration-400"
                >
                  {isLoading ? (
                    "Redirecting..."
                  ) : (
                    <span>
                      Sign in With{" "}
                      <span className="font-medium tracking-wide">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                      </span>
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
