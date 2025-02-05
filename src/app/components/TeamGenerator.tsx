import * as React from "react";

import { Button } from "@/components/ui/button";

import { PlayersList } from "./PlayersList";
import { TeamsList } from "./TeamsList";
import { GeneratedTeamsList } from "./GeneratedTeamsList";

/**
 * TeamGenerator component
 * This component is responsible for generating teams based on player inputs.
 * It includes sections for player input, team input, and displaying the generated teams.
 */
export function TeamGenerator() {
  return (
    <section
      aria-labelledby="team-generator-title"
      className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 w-[563px] sm:w-full"
    >
      {/* Header section with title and description */}
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
      {/* Input section for players and teams */}
      <section
        aria-labelledby="input-section"
        className="lg:flex lg:flex-row lg:gap-6 p-6 pt-0 space-y-6 lg:space-y-0"
      >
        <PlayersList />
        <TeamsList />
      </section>
      {/* Output section for displaying generated teams */}
      <section aria-labelledby="output-section" className="p-6 pt-0">
        <GeneratedTeamsList />
      </section>
      {/* Footer section with action buttons */}
      <footer className="flex flex-row justify-between items-center p-6 pt-0">
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
