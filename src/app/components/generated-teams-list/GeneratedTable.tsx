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
 * Utility function to shuffle an array of players.
 * This helps randomize substitution order within each team.
 *
 * @param players - Array of players to shuffle
 * @returns A new shuffled array of players
 */
const shufflePlayers = (players: Player[]): Player[] => {
  return [...players].sort(() => Math.random() - 0.5);
};

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
          <header className="flex items-center justify-start gap-2 pb-4">
            <h3
              id={`generated-team-${index + 1}-${teamName
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              className="font-semibold leading-none tracking-tight truncate"
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
              <TableRow>
                <TableHead>Sub</TableHead>
                <TableHead>
                  <abbr
                    title="Position"
                    className="sm:hidden md:inline lg:hidden no-underline"
                  >
                    Pos
                  </abbr>
                  <span className="hidden sm:inline md:hidden lg:inline">
                    Position
                  </span>
                </TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Render shuffled players to determine substitution order */}
              {shufflePlayers(teamPlayers).map((player, index) => (
                <TableRow key={`${player.name}-${index}`} className="w-full">
                  {/* Substitution Order - Displayed as "1º", "2º", etc. */}
                  <TableCell>{index + 1}º</TableCell>

                  {/* Player Position - Abbreviation on smaller screens */}
                  <TableCell>
                    <abbr
                      title={player.position}
                      className="sm:hidden md:inline lg:hidden no-underline"
                    >
                      {getAbbreviation(player.position)}
                    </abbr>
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
