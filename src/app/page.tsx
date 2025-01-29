import { TeamGeneratorInputCard } from "./components/TeamGeneratorInputCard";
import { GeneratedTeamsCard } from "./components/GeneratedTeamsCard";

export default function Home() {
  return (
    <main className="container mx-auto py-12 px-2">
      <h1 className="text-3xl font-bold text-center">NoCliques</h1>
      <p className="text-center mt-4">
        NoCliques is a team generator app designed to create fair and balanced
        teams avoiding the famous "cliques".
      </p>
      <div className="flex flex-col gap-6 mt-8 items-center">
        <TeamGeneratorInputCard />
        <GeneratedTeamsCard />
      </div>
    </main>
  );
}
