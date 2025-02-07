import * as React from "react";

import { Button } from "@/components/ui/button";

import { PlayersList } from "./PlayersList";
import { TeamsList } from "./TeamsList";
import { GeneratedTeamsList } from "./GeneratedTeamsList";

export function TeamGenerator() {
  return (
    <section
      aria-labelledby="team-generator-title"
      className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 w-[563px] sm:w-full"
    >
      <header className="flex flex-col space-y-3 p-6">
        <h2
          id="team-generator-title"
          className="text-3xl font-bold text-center"
        >
          NoCliques
        </h2>
        <p className="text-center max-w-prose mx-auto">
          NoCliques is a team generator app designed to create fair and balanced
          teams avoiding the famous "cliques".
        </p>
      </header>
      <section
        aria-labelledby="input-section"
        className="lg:flex lg:lg:gap-6 p-6 pt-0 space-y-6 lg:space-y-0"
      >
        <PlayersList />
        <TeamsList />
      </section>
      <section aria-labelledby="output-section" className="p-6 pt-0">
        <GeneratedTeamsList />
      </section>
      <footer className="flex justify-between items-center p-6 pt-0">
        <Button aria-label="Reset" type="button" variant="secondary">
          Reset
        </Button>
        <Button aria-label="Generate Teams" type="button">
          Generate Teams
        </Button>
      </footer>
    </section>
  );
}
