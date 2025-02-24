/**
 * TeamGenerator component
 * This component is responsible for generating teams based on player inputs.
 * It includes sections for player input, team input, and displaying the generated teams.
 */

// Import dependencies
"use client";
import * as React from "react";
// Import useState hook from React
import { useState } from "react";
// Import Burron component from Button.tsx
import { Button } from "@/components/ui/button";
// Import function from entityUtils.ts
import { initializeEntities } from "@/app/utils/entityUtils";
// Import types from entityTypes.ts
import { Player, Team } from "@/app/types/entityTypes";
// Import EntitiesList and GeneratedTeamsList components
import { EntitiesList } from "./entities-list/EntitiesList";
import { GeneratedTeamsList } from "./GeneratedTeamsList";

/**
 * TeamGenerator component
 */

export const TeamGenerator = () => {
  /**
   * State for players and teams
   * Initialize players and teams with default values
   * Players and teams are stored as arrays of Player and Team objects
   * The initializeEntities function is used to create default entities
   */
  const [players, setPlayers] = useState<Player[]>(
    initializeEntities("Players")
  );
  const [teams, setTeams] = useState<Team[]>(initializeEntities("Teams"));

  /**
   * Render the TeamGenerator component
   */
  return (
    <section
      aria-labelledby="team-generator-title"
      className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 w-full max-w-5xl mx-auto"
    >
      {/* Header section with title and description */}
      <header className="flex flex-col space-y-3 p-4 sm:p-6">
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
        className="lg:flex lg:gap-6 p-4 sm:p-6 sm:pt-0 pt-0 space-y-4 sm:space-y-6 lg:space-y-0"
      >
        <div className="min-w-[280px] w-full lg:w-2/3">
          <EntitiesList // Component for player input
            entityType="Players" // Type of entity
            entities={players} // List of entities
            setEntities={setPlayers} // Function to update entities
          />
        </div>
        <div className="min-w-[280px] w-full lg:w-1/3">
          <EntitiesList // Component for team input
            entityType="Teams" // Type of entity
            entities={teams} // List of entities
            setEntities={setTeams} // Function to update entities
          />
        </div>
      </section>
      {/* Output section for displaying generated teams */}
      <section
        aria-labelledby="output-section"
        className="p-4 sm:p-6 pt-0 sm:pt-0"
      >
        <GeneratedTeamsList />
      </section>
      {/* Footer section with action buttons */}
      <footer className="flex justify-between items-center p-4 sm:p-6 pt-0 sm:pt-0">
        {/* Reset button */}
        <Button aria-label="Reset" type="button" variant="secondary">
          Reset
        </Button>
        {/* Generate teams button */}
        <Button
          aria-label="Generate Teams"
          type="button"
          onClick={() => {
            console.log(players, teams); // todo: implement team generation
          }}
        >
          Generate Teams
        </Button>
      </footer>
    </section>
  );
};
