"use client"

import { useState, useEffect } from "react"

interface Member {
  id: string;
  name: string;
  points: number;
}

const getRankStyles = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        bg: "bg-amber-400",
        gradient: "from-amber-600 to-amber-400",
        shadow: "hover:shadow-amber-500/40",
        text: "text-amber-400",
        gap: "gap-9 md:gap-11 lg:gap-14",
      };
    case 2:
      return {
        bg: "bg-slate-400",
        gradient: "from-slate-600 to-slate-400",
        shadow: "hover:shadow-slate-500/40",
        text: "text-slate-400",
        gap: "gap-14",
      };
    case 3:
      return {
        bg: "bg-orange-400",
        gradient: "from-orange-600 to-orange-400",
        shadow: "hover:shadow-orange-500/40",
        text: "text-orange-400",
        gap: "gap-14",
      };
    default:
      return {
        bg: "bg-gray-300",
        gradient: "from-gray-400 to-gray-300",
        shadow: "hover:shadow-gray-400/40",
        text: "text-gray-400",
        gap: "gap-14",
      };
  }
};

export default function RankingList (){
  const[members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        // Option A: If your backend allows CORS from your frontend
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scores/top`);
        
        // Option B: If you get CORS errors, you'll need to create an app/api/scores/top/route.ts proxy 
        // and fetch from '/api/scores/top' instead!

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        // 1. Inspect the data in your browser console
        console.log("Backend response:", data); 

        // 2. Once you confirm the data structure matches your Member interface, 
        // uncomment the line below to actually update the UI!
        // setMembers(data);

      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    fetchTop10();
  }, []);

  return(
    <div className="flex flex-col gap-5">
      {members.map((member, index) => {
        const rank = index + 1;
        const styles = getRankStyles(rank);

        return (
          <div 
            key={member.id} 
            className={`relative group p-0.75 ${styles.bg} rounded-lg shadow-lg overflow-hidden transition-all duration-400 hover:shadow-lg ${styles.shadow}`}
          >
            <div className={`absolute inset-0 bg-linear-to-t ${styles.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out`}></div>
            <div className="relative z-10 px-5 py-3 bg-gray-100 rounded-md flex items-center justify-between">
              <div className={`flex items-center ${styles.gap}`}>
                <p className={`text-4xl text-shadow-md ${styles.text} font-archivo`}>
                  {rank}
                </p>
                <p className="text-gray-900 text-md md:text-lg font-semibold text-shadow-sm font-poppins">
                  {member.name}
                </p>
              </div>
              <p className="text-gray-600 text-xl font-semibold text-shadow-sm font-lexend">
                {member.points}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

// export async function buildLoginUrl() {
//   // Build a URL that the *browser* can open directly.
//   // We cannot use the Better‑Auth POST endpoint here because a plain GET link would result in a 404.
//   // Instead we point to a lightweight GET route (/api/auth/login) that renders a tiny HTML form
//   // which auto‑submits a POST to Better‑Auth’s sign‑in/social endpoint.
//   // This preserves the required cookie (state) and lets the flow work entirely in the browser.

//   const baseUrl =
//     process.env.BETTER_AUTH_URL ||
//     process.env.APP_URL ||
//     "http://localhost:3000";
//   const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
//   const callbackUrl = encodeURIComponent(frontendUrl + "/");
//   return `${baseUrl}/api/auth/login?provider=google&callbackURL=${callbackUrl}`;
// }