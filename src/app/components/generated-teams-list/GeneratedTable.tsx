/**
 * GeneratedTable Component
 *
 * This component receives a list of teams with assigned players and renders a table for each team,
 * displaying player positions, names, and substitution orders.
 */

/**
 * Import dependencies
 */

// UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
import { Player, GeneratedTableProps } from "@/app/types/entityTypes";

// Utility Functions
import { getAbbreviation } from "@/app/utils/entityUtils";

/**
 * GeneratedTable Component
 *
 * @param {GeneratedTableProps} props - Component props containing `generatedTeams`
 * @returns - Rendered component displaying tables for generated teams
 */
export default function GeneratedTable({
  generatedTeams,
}: GeneratedTableProps) {
  /**
   * Render the GeneratedTable Component
   */
  return (
    <div className="md:grid md:grid-cols-2 sm:gap-6 p-4 sm:p-6 sm:pt-0 pt-0 space-y-4 sm:space-y-6 md:space-y-0">
      {/* Iterate through each generated team */}
      {Object.entries(generatedTeams).map(([teamName, teamPlayers], index) => (
        <section
          key={`${teamName}-${index}`}
          aria-labelledby={`generated-team-${index + 1}-${teamName
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
          className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col p-4 sm:p-6"
        >
          {/* Team Header */}
          <header className="flex items-center justify-center gap-2 pb-4">
            <h3
              id={`generated-team-${index + 1}-${teamName
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              className="font-semibold leading-none tracking-tight text-lg"
            >
              {teamName}
            </h3>
            {/* Display number of players in the team */}
            <div className="font-light text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
              ({teamPlayers.length} Players)
            </div>
          </header>
          {/* Team Players Table */}
          <Table>
            <TableHeader>
              <TableRow className="text-base">
                <TableHead>Subs</TableHead>
                <TableHead>
                  <span
                    title="Position"
                    className="sm:hidden md:inline lg:hidden no-underline"
                    aria-label="Position"
                  >
                    Pos
                  </span>
                  <span className="hidden sm:inline md:hidden lg:inline">
                    Position
                  </span>
                </TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-base">
              {/* Render substitution order */}
              {teamPlayers.map((player, index) => (
                <TableRow
                  key={`${player.name}-${index}`}
                  className="w-full text-start dark:border-zinc-800/50"
                >
                  {/* Substitution Order - Displayed as "1º", "2º", etc. */}
                  <TableCell>
                    {player.position === "Goalkeeper"
                      ? "-"
                      : `${player.substitutionOrder}º`}
                  </TableCell>

                  {/* Player Position - Abbreviation on smaller screens */}
                  <TableCell className="whitespace-nowrap">
                    <span
                      title={player.position}
                      aria-label={player.position}
                      className="sm:hidden md:inline lg:hidden"
                    >
                      {getAbbreviation(player.position)}
                    </span>
                    <span className="hidden sm:inline md:hidden lg:inline">
                      {player.position}
                    </span>
                  </TableCell>

                  {/* Player Name - Truncated if too long */}
                  <TableCell className="max-w-[100px] w-full truncate">
                    {player.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ))}
    </div>
  );
}
