"use client";

/**
 * TeamGenerator Component
 *
 * This component manages player and team inputs, generates balanced teams, and
 * displays the results. It also provides actions for resetting data and generating teams.
 */

/**
 * Import dependencies
 */

// React Hooks
import { useState } from "react";

// UI Components
import { Button } from "@/components/ui/button";

// Utility Functions
import { initializeEntities } from "@/app/utils/entityUtils";

// Types
import { Player, Team, GeneratedTeams } from "@/app/types/entityTypes";

// Components
import EntitiesList from "@/app/components/entities-list/EntitiesList";
import GeneratedTeamsList from "@/app/components/generated-teams-list/GeneratedTeamsList";

/**
 * TeamGenerator component
 */
export default function TeamGenerator() {
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

  // Control visibility of generated teams section
  const [isGenerated, setIsGenerated] = useState(false);

  /**
   * Reset all data to default values
   */
  function handleResetDefault(): void {
    setIsGenerated(false);
    setPlayers(initializeEntities("Players"));
    setTeams(initializeEntities("Teams"));
  }

  /**
   * Example of randomized Teams functions for development only
   * TODO: In the future implement functions to generate teams based on skill and position
   */

  // State to store randomized teams
  const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeams>({});

  /**
   * Function to shuffle an array using the Fisher-Yates algorithm.
   * @param array - The array to be shuffled.
   * @returns A new shuffled array.
   */
  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  /**
   * Function to distribute players into teams randomly.
   * Ensures players are evenly assigned across all teams.
   */
  const handleGenerateTeams = (): void => {
    if (teams.length === 0 || players.length === 0) return;

    const shuffledPlayers = shuffleArray(players);
    const teamsMap: GeneratedTeams = Object.fromEntries(
      teams.map((team) => [team.name, []])
    );

    shuffledPlayers.forEach((player, index) => {
      const teamName = teams[index % teams.length].name;
      teamsMap[teamName].push(player);
    });

    setGeneratedTeams(teamsMap);
    setIsGenerated(true);
  };

  /**
   * Render the TeamGenerator component
   */
  return (
    <section
      aria-labelledby="team-generator-title"
      className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 w-full max-w-5xl mx-auto"
    >
      {/* Header */}
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
      {/* Input Section */}
      <section
        aria-labelledby="input-section"
        className="md:flex md:gap-6 p-4 sm:p-6 sm:pt-0 pt-0 space-y-4 sm:space-y-6 md:space-y-0"
      >
        {/* Player Input */}
        <div className="min-w-[280px] w-full md:w-2/3">
          <EntitiesList // Component for player input
            entityType="Players" // Type of entity
            entities={players} // List of entities
            setEntities={setPlayers} // Function to update entities
          />
        </div>

        {/* Team Input */}
        <div className="min-w-[280px] w-full md:w-1/3">
          <EntitiesList // Component for team input
            entityType="Teams" // Type of entity
            entities={teams} // List of entities
            setEntities={setTeams} // Function to update entities
          />
        </div>
      </section>

      {/* Output Section */}
      <section
        aria-labelledby="output-section"
        className="p-4 sm:p-6 pt-0 sm:pt-0"
      >
        <div className="min-w-[280px] w-full">
          {isGenerated && (
            <GeneratedTeamsList generatedTeams={generatedTeams} />
          )}
        </div>
      </section>

      {/* Footer section with action buttons */}
      <footer className="flex justify-between items-center p-4 sm:p-6 pt-0 sm:pt-0">
        {/* Reset button */}
        <Button
          aria-label="Reset to default"
          type="button"
          variant="secondary"
          onClick={handleResetDefault}
        >
          Reset
        </Button>

        {/* Generate teams button */}
        <Button
          aria-label="Generate Teams"
          type="button"
          onClick={handleGenerateTeams}
        >
          Generate Teams
        </Button>
      </footer>
    </section>
  );
}
