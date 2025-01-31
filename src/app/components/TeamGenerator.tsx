import * as React from "react";

import { Button } from "@/components/ui/button";

import { PlayersList } from "./PlayersList";
import { TeamsList } from "./TeamsList";
import { GeneratedTeamsList } from "./GeneratedTeamsList";

export function TeamGenerator() {
  return (
    <section
      aria-labelledby="team-generator-title"
      className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col space-y-1.5 p-4 sm:p-6 w-[576px] sm:w-full"
    >
      <header>
        <h2
          id="team-generator-title"
          className="text-3xl font-bold text-center"
        >
          NoCliques
        </h2>
        <p className="text-center">
          NoCliques is a team generator app designed to create fair and balanced
          teams avoiding the famous "cliques".
        </p>
      </header>
      <section aria-labelledby="input-section">
        <PlayersList />
        <TeamsList />
      </section>
      <section aria-labelledby="output-section">
        <GeneratedTeamsList />
      </section>
      <footer className="flex flex-row justify-between items-center">
        <Button aria-label="Reset" type="button" variant="outline">
          Reset
        </Button>
        <Button aria-label="Generate Teams" type="submit">
          Generate Teams
        </Button>
      </footer>
    </section>
  );
}
