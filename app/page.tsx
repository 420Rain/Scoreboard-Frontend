import Navbar from "@/components/Navbar";
import RankingList from "@/components/RankingList";

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <section className="p-8 mb-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-3xl text-shadow-md text-gray-900 font-semibold text-center lg:text-left mb-7 font-poppins">Scoreboard</p>

          <div className="grid grid-cols-1 gap-14 justify-center items-start lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-8">
              <div className="p-4 flex flex-col justify-between bg-gray-100 rounded-lg gap-6 shadow-md border-3 border-gray-300 font-poppins font-semibold text-gray-900">
                <div className="flex flex-col gap-0.5">
                  <p className="text-3xl">Name</p>
                  <p className="text-lg text-gray-500">ID Number</p>
                </div>
                <p className="text-xl">Points:</p>
              </div>

              <div className="lg:flex flex-col mx-auto text-center hidden lg:text-left font-poppins">
                <p className="font-semibold text-3xl">Climb the Ranks & Earn Rewards</p>
                <div className="h-0.5 bg-linear-to-r from-transparent via-lscs-gray to-transparent my-5 opacity-50"></div>
                <p className="text-lg">This scoreboard highlights our most active members. You can earn points and rise up leaderboard by attending LSCS events, participating in workshops, and answering questions in the community.</p>
              </div>
            </div>

            <RankingList />
            
            <div className="flex flex-col mx-auto text-center lg:hidden lg:text-left font-poppins">
                <p className="font-semibold text-3xl">Climb the Ranks & Earn Rewards</p>
                <div className="h-0.5 bg-linear-to-r from-transparent via-lscs-gray to-transparent my-5 opacity-50"></div>
                <p className="text-lg">This scoreboard highlights our most active members. You can earn points and rise up leaderboard by attending LSCS events, participating in workshops, and answering questions in the community.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
