"use client"

import { useState, useEffect } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Member {
  id: string;
  name: string;
  score: number;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/scores");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        setMembers(data);

      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        setError("Failed to load the scoreboard. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTop10();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500 font-poppins text-lg animate-pulse">
          Loading leaderboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-red-50 rounded-lg border border-red-200 shadow-sm">
        <p className="text-red-500 font-poppins text-lg font-semibold mb-1">Oops!</p>
        <p className="text-red-400 font-poppins text-sm md:text-base">{error}</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg border border-gray-200 border-dashed shadow-sm">
        <p className="text-gray-500 font-poppins text-lg font-semibold mb-1">No scores yet</p>
        <p className="text-gray-400 font-poppins text-sm md:text-base">Be the first to get on the board!</p>
      </div>
    );
  }

  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = members.slice(startIndex, startIndex + itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return(
  <div className="flex flex-col gap-8 w-full">
    <div className="flex flex-col gap-5">
      {currentMembers.map((member, index) => {
        const rank = startIndex + index + 1;
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
                {member.score}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    {totalPages > 1 && (
      <div className="mt-4 bg-white/60 p-3 rounded-xl border border-gray-200 shadow-sm">
        <Pagination>
          <PaginationContent className="font-poppins">
            
            <PaginationItem className="mr-4 md:mr-8"> 
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={`cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition-colors ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
              />
            </PaginationItem>

            {pageNumbers.slice(0, 3).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className={`cursor-pointer transition-all duration-200 ${
                    currentPage === page 
                      ? "bg-lscs-blue text-white hover:bg-lscs-blue hover:text-white shadow-md font-bold" 
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem className="ml-4 md:ml-8">
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={`cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition-colors ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
              />
            </PaginationItem>
            
          </PaginationContent>
        </Pagination>
      </div>
    )}
    </div>
  )
}
