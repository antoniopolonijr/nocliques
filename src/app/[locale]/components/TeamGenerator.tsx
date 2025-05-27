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

// Translations
import { useTranslations } from "next-intl";

// React Hooks
import { useState, useEffect, useRef } from "react";

// Icons
import { Pencil, Download, Share2, Copy, Icon } from "lucide-react";
import { soccerBall, soccerPitch } from "@lucide/lab";

// Capture DOM as image
import html2canvas from "html2canvas";

// UI Components
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Utility Functions
import { initializeEntities } from "@/app/[locale]/utils/entityUtils";
import { generateBalancedTeams } from "@/app/[locale]/utils/teamGeneratorUtils";
import {
  loadPlayers,
  loadTeams,
  savePlayers,
  saveTeams,
} from "@/app/[locale]/utils/storageUtils";

// Types
import { Player, Team, GeneratedTeams } from "@/app/[locale]/types/entityTypes";

// Components
import GeneratedTeamsList from "@/app/[locale]/components/generated-teams-list/GeneratedTeamsList";
import EntitiesList from "@/app/[locale]/components/entities-list/EntitiesList";

/**
 * TeamGenerator component
 */
export default function TeamGenerator() {
  /**
   * State for players and teams
   * Initialize players and teams with default values
   * Players and teams are stored as arrays of Player and Team objects
   * Load saved data or initializeEntities function is used to create default entities
   */

  // Translations
  const t = useTranslations("TeamGenerator");

  // State to check if the component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  // State to store players
  const [players, setPlayers] = useState<Player[]>([]);

  // State to store teams
  const [teams, setTeams] = useState<Team[]>([]);

  // Control visibility of generated teams section
  const [isGenerated, setIsGenerated] = useState(false);

  // State to store randomized teams
  const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeams>({});

  // State to store the timestamp of when the teams were generated
  const [generatedAt, setGeneratedAt] = useState<Date | null>(null);

  // Toast notification
  const { toast } = useToast();

  // Ref to the DOM element that will be captured as image
  const resultRef = useRef<HTMLDivElement>(null);

  // Initialize data after first render
  useEffect(() => {
    setPlayers(loadPlayers() ?? initializeEntities("Players"));
    setTeams(loadTeams() ?? initializeEntities("Teams"));
    setHasMounted(true);
  }, []);

  /**
   * Sync players state with localStorage whenever it changes.
   * Ensures persistence of data between sessions.
   */
  useEffect(() => {
    if (players.length > 0) {
      savePlayers(players);
    }
  }, [players]);

  /**
   * Sync teams state with localStorage whenever it changes.
   * Ensures persistence of data between sessions.
   */
  useEffect(() => {
    if (teams.length > 0) {
      saveTeams(teams);
    }
  }, [teams]);

  /**
   * Check if the component has mounted before rendering
   * This is to avoid hydration issues in Next.js
   */
  if (!hasMounted) return null;

  /**
   * Edit teams and players
   */
  function handleEdit(): void {
    setIsGenerated(false);
    document
      .getElementById("team-generator-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  /**
   * Generate teams based on player and team inputs
   * The function uses the generateBalancedTeams function to create balanced teams
   */
  function handleGenerateTeams(): void {
    // Check if players and teams are empty
    if (players.length === 0 || teams.length === 0) {
      toast({
        description: `${t("emptyToastDescription")}`,
      });
      return;
    }
    const defaultPlayerName = t("Player");
    const defaultTeamName = t("Team");
    setGeneratedTeams(
      generateBalancedTeams(players, teams, defaultPlayerName, defaultTeamName)
    );
    setGeneratedAt(new Date()); // Stores the date at the time of generation
    setIsGenerated(true);
    document
      .getElementById("team-generator-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  // Helper function to format teams for WhatsApp-friendly copy
  function formatTeamsForCopy(
    teams: GeneratedTeams,
    generatedAt: Date | null
  ): string {
    const timestamp = generatedAt
      ? `${t("copyTimestampPrefix")} ${generatedAt.toLocaleString()}`
      : "";

    const content = Object.entries(teams)
      .map(
        ([teamName, players]) =>
          `*${teamName}*\n\n` +
          players
            .map(
              (p) =>
                `${
                  p.position === "Goalkeeper"
                    ? " - "
                    : `${p.substitutionOrder}º`
                } *${p.name}*`
            )
            .join("\n")
      )
      .join("\n\n");

    return `${timestamp}\n\n${content}`;
  }

  /**
   * Copies formatted team data to clipboard
   */
  async function handleCopy(): Promise<void> {
    const formatted = formatTeamsForCopy(generatedTeams, generatedAt);
    try {
      await navigator.clipboard.writeText(formatted);
      toast({
        description: `${t("CopyToastDescription")}`,
      });
    } catch {
      toast({
        description: `${t("CopyErrorToastDescription")}`,
        variant: "destructive",
      });
    }
  }

  /**
   * Downloads an image of the generated team list
   */
  async function handleDownload(): Promise<void> {
    if (!resultRef.current) return;

    const canvas = await html2canvas(resultRef.current);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${t("downloadFileNamePrefix")} ${
      generatedAt ? generatedAt.toLocaleString() : `${t("unknownDate")}`
    }.png`;
    link.click();
  }

  /**
   * Shares the generated team image using Web Share API (e.g., WhatsApp)
   */
  async function handleShare(): Promise<void> {
    if (!navigator.canShare || !resultRef.current) {
      toast({
        description: `${t("shareNotSupportedToastDescription")}`,
        variant: "destructive",
      });
      return;
    }

    const canvas = await html2canvas(resultRef.current);
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File(
        [blob],
        `${t("downloadFileNamePrefix")} ${
          generatedAt ? generatedAt.toLocaleString() : `${t("unknownDate")}`
        }.png`,
        {
          type: "image/png",
        }
      );

      try {
        await navigator.share({
          title: `${t("shareTitle")}`,
          text: `${t("shareText")}`,
          files: [file],
        });
      } catch {
        toast({
          description: `${t("shareErrorToastDescription")}`,
          variant: "destructive",
        });
      }
    });
  }

  /**
   * Render the TeamGenerator component
   */
  return (
    <section
      id="team-generator-section"
      className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 w-full mx-auto text-center sm:text-left"
    >
      {/* Header */}
      <header className="flex flex-col p-6 sm:p-8 space-y-4 sm:space-y-6">
        <h1
          id="team-generator-title"
          aria-label="NoCliques"
          className="text-4xl font-bold text-center"
        >
          N
          <Icon className="inline" iconNode={soccerBall} aria-hidden="true" />
          Cliques
        </h1>
        <p className="text-center max-w-prose mx-auto text-zinc-500 dark:text-zinc-400">
          {t("description")}
        </p>
      </header>
      <section id="main-section">
        {/* Input Section */}
        {!isGenerated && (
          <section
            className="flex flex-col md:flex-row gap-4 md:gap-6 px-4 pt-0 pb-0 sm:px-6"
            aria-labelledby="input-section-heading"
          >
            <h2 id="input-section-heading" className="sr-only">
              {t("inputSection")}
            </h2>

            {/* Player Input */}
            <div className="min-w-[292px] w-full md:w-2/3">
              <EntitiesList // Component for player input
                entityType="Players" // Type of entity
                entities={players} // List of entities
                setEntities={setPlayers} // Function to update entities
              />
            </div>

            {/* Team Input */}
            <div className="min-w-[292px] w-full md:w-1/3">
              <EntitiesList // Component for team input
                entityType="Teams" // Type of entity
                entities={teams} // List of entities
                setEntities={setTeams} // Function to update entities
              />
            </div>
          </section>
        )}

        {/* Output Section */}
        {isGenerated && (
          <section
            className="px-4 pt-0 pb-0 sm:px-6"
            aria-labelledby="output-section-heading"
          >
            <h2 id="output-section-heading" className="sr-only">
              {t("outputSection")}
            </h2>

            <div className="min-w-[280px] w-full" ref={resultRef}>
              <GeneratedTeamsList
                generatedTeams={generatedTeams}
                generatedAt={generatedAt}
              />
            </div>
          </section>
        )}
      </section>

      {/* Footer section with action buttons */}
      <footer
        className={`flex flex-col md:flex-row ${
          isGenerated ? `sm:justify-between` : `sm:justify-center`
        } gap-4 py-6 sm:py-8 px-4 sm:px-6`}
      >
        {isGenerated && (
          <div className="flex justify-center gap-1 sm:gap-4 items-center">
            <Button
              variant="secondary"
              aria-label={t("downloadGeneratedTeams")}
              type="button"
              onClick={handleDownload}
            >
              <Download aria-hidden="true" />
              {t("download")}
            </Button>

            <Button
              variant="secondary"
              aria-label={t("copyGeneratedTeams")}
              type="button"
              onClick={handleCopy}
            >
              <Copy aria-hidden="true" />
              {t("copy")}
            </Button>

            <Button
              variant="secondary"
              aria-label={t("shareGeneratedTeams")}
              type="button"
              onClick={handleShare}
            >
              <Share2 aria-hidden="true" /> {t("share")}
            </Button>
          </div>
        )}

        <div className="flex justify-center gap-3 sm:gap-4 items-center">
          {/* Edit Button */}
          {isGenerated && (
            <Button
              className="py-6 text-base sm:text-lg"
              aria-label={t("editPlayersAndTeams")}
              type="button"
              variant="outline"
              onClick={handleEdit}
            >
              <Pencil aria-hidden="true" />
              {t("edit")}
            </Button>
          )}

          {/* Generate teams button */}
          <Button
            className="py-6 text-base sm:text-lg"
            aria-label={
              isGenerated ? t("generateNewTeams") : t("generateTeams")
            }
            type="button"
            variant="default"
            onClick={handleGenerateTeams}
          >
            <Icon iconNode={soccerPitch} aria-hidden="true" />
            {isGenerated ? t("generateNewTeams") : t("generateTeams")}
          </Button>
        </div>
      </footer>
    </section>
  );
}
