"use client";

import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  idNumber?: string; 
  score?: number;
}

export default function UserCard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (!res.ok) throw new Error("Failed to fetch session");
        
        const data = await res.json();
        
        if (data && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 flex flex-col justify-between bg-gray-100 rounded-lg gap-6 shadow-md border-3 border-gray-300 min-h-40 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-lg border border-red-200">
        Failed to load user profile.
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col justify-between bg-gray-100 rounded-lg gap-6 shadow-md border-3 border-gray-300 font-poppins font-semibold text-gray-900">
      <div className="flex flex-col gap-0.5">
        <p className="text-3xl">{user.name}</p>
        <p className="text-lg text-gray-500">{user.idNumber}</p>
      </div>
      <p className="text-xl">Points: <span className="text-lscs-blue">{user.score !== undefined ? user.score : "0"}</span></p>
    </div>
  );
}
