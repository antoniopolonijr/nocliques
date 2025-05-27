/**
 * Utility functions for Team Generator management.
 */

// Types
import { Player, Team, GeneratedTeams } from "@/app/[locale]/types/entityTypes";

// Constants
import { POSITION_ORDER } from "@/app/[locale]/constants/entityDefaults";

/**
 * Counts the total number of players in a given team.
 */
export function countTotalPlayers(team: Player[]): number {
  return team.length;
}

/**
 * Counts the number of players in a team for a specific position.
 */
export function countPositionPlayers(team: Player[], position: string): number {
  return team.filter((p) => p.position === position).length;
}

/**
 * Counts the number of players in a team for a specific skill level.
 */
export function countSkillPlayers(team: Player[], skill: string): number {
  return team.filter((p) => p.skill === skill).length;
}

/**
 * Determines the skill balance of a team by calculating the difference between high and low skill players.
 * @param team - Array of players in the team.
 * @returns Skill balance as a difference between high and low skill counts.
 */
const getSkillBalance = (team: Player[]): number =>
  countSkillPlayers(team, "High") - countSkillPlayers(team, "Low");

/**
 * Sorts teams based on the best fit for a given player.
 *
 * - Prioritizes balancing high vs. low skill players.
 * - Ensures even distribution of positions across teams.
 * - Keeps total number of players per team as balanced as possible.
 */
export function getSortedTeams(
  teamMap: Record<string, Player[]>,
  teamNames: string[],
  player: Player,
  skillPriority = false
): string[] {
  return [...teamNames].sort((a, b) => {
    if (skillPriority) {
      const skillBalanceA = getSkillBalance(teamMap[a]);
      const skillBalanceB = getSkillBalance(teamMap[b]);

      if (player.skill === "High" && skillBalanceA !== skillBalanceB) {
        return skillBalanceA - skillBalanceB; // Prioritize teams with more low-skill players
      }
      if (player.skill === "Low" && skillBalanceA !== skillBalanceB) {
        return skillBalanceB - skillBalanceA; // Prioritize teams with more high-skill players
      }
    }

    // Prioritize teams with fewer players in this position
    const posDiff =
      countPositionPlayers(teamMap[a], player.position) -
      countPositionPlayers(teamMap[b], player.position);
    if (posDiff !== 0) return posDiff;

    // Balance total players per team
    return countTotalPlayers(teamMap[a]) - countTotalPlayers(teamMap[b]);
  });
}

/**
 * Sorts players by their predefined position order.
 *
 * @param players - List of players to be sorted.
 * @returns Sorted list of players.
 */
export function sortPlayersByPosition(players: Player[]): Player[] {
  return players.sort(
    (a, b) => POSITION_ORDER[a.position] - POSITION_ORDER[b.position]
  );
}

/**
 * Assigns a random substitution order to non-goalkeeper players. *
 *
 * @param players - List of players to process.
 */
export function assignSubstitutionOrder(players: Player[]): void {
  const eligiblePlayers = players.filter(
    (player) => player.position !== "Goalkeeper"
  );
  const shuffledPlayers = [...eligiblePlayers].sort(() => Math.random() - 0.5);
  shuffledPlayers.forEach((player, index) => {
    player.substitutionOrder = index + 1;
  });
}

/**
 * Function that assign Default Names to the entities if their names are empty.
 *
 * @param entities - List of entities (players or teams).
 * @param defaultNamePrefix - The prefix used for the placeholder (e.g., "Player" or "Team").
 * @returns Updated list of entities with names filled.
 */
export function assignDefaultNames<T extends { name: string }>(
  entities: T[],
  defaultNamePrefix: string
): T[] {
  return entities.map((entity, index) => ({
    ...entity,
    name:
      entity.name && entity.name.trim() !== ""
        ? entity.name
        : `${defaultNamePrefix} ${index + 1}`,
  }));
}

/**
 * Generates balanced teams based on player skills and positions.
 *
 * - Distributes goalkeepers first.
 * - Prioritizes teams with more low-skill players when adding a high-skill player.
 * - - Prioritizes teams with more high-skill players when adding a low-skill player.
 * - Distributes medium-skill players last to equalize team sizes.
 * - Ensures each team has a balanced number of players per position.
 * - Assigns a substitution order and sorts players by position.
 *
 * @param players - List of players.
 * @param teams - List of teams.
 * @returns Object containing generated teams.
 */
export function generateBalancedTeams(
  players: Player[],
  teams: Team[],
  defaultPlayerName: string,
  defaultTeamName: string
): GeneratedTeams {
  const highSkill: Player[] = [];
  const mediumSkill: Player[] = [];
  const lowSkill: Player[] = [];
  const goalkeepers: Player[] = [];

  // Assign Default Names to the entities if their names are empty
  const updatedPlayers = assignDefaultNames(players, defaultPlayerName);
  const updatedTeams = assignDefaultNames(teams, defaultTeamName);

  // Shuffle players for randomness
  const shuffledPlayers = [...updatedPlayers].sort(() => Math.random() - 0.5);

  // Categorize players
  shuffledPlayers.forEach((player) => {
    if (player.position === "Goalkeeper") {
      goalkeepers.push(player);
    } else if (player.skill === "High") {
      highSkill.push(player);
    } else if (player.skill === "Medium") {
      mediumSkill.push(player);
    } else {
      lowSkill.push(player);
    }
  });

  // Initialize team map with empty
  const teamMap: Record<string, Player[]> = {};
  updatedTeams.forEach((team) => (teamMap[team.name] = []));
  const teamNames = Object.keys(teamMap);
  const playersPerTeam = Math.floor(shuffledPlayers.length / teamNames.length);

  /**
   * Distributes players in a round-robin fashion while ensuring balanced team sizes.
   *
   * @param playerList - The list of players to distribute.
   * @param skillPriority - Whether to prioritize skill balancing.
   */
  function distributePlayersInRounds(
    playerList: Player[],
    skillPriority = false
  ) {
    const positions = new Set(playerList.map((p) => p.position));

    while (playerList.length > 0) {
      for (const position of positions) {
        // Find the first player in the list with the required position
        const playerIndex = playerList.findIndex(
          (p) => p.position === position
        );
        if (playerIndex === -1) continue;

        const player = playerList.splice(playerIndex, 1)[0];
        // Get the best-suited team for the player
        const sortedTeams = getSortedTeams(
          teamMap,
          teamNames,
          player,
          skillPriority
        );

        // Assign player to the most suitable team
        teamMap[sortedTeams[0]].push(player);
      }
    }
  }

  /**
   * Balances team sizes by moving extra players from overfilled teams to underfilled teams.
   */
  function balanceTeamSizes() {
    const teamsOverLimit: string[] = [];
    const teamsUnderLimit: string[] = [];

    // Categorize teams into overfilled and underfilled
    for (const teamName of teamNames) {
      const playerCount = teamMap[teamName].length;
      if (playerCount > playersPerTeam) {
        teamsOverLimit.push(teamName);
      } else if (playerCount < playersPerTeam) {
        teamsUnderLimit.push(teamName);
      }
    }

    // Move players from overfilled teams to underfilled teams
    while (teamsOverLimit.length > 0 && teamsUnderLimit.length > 0) {
      const overTeam = teamsOverLimit[0];
      const underTeam = teamsUnderLimit[0];

      // Transfer the last player from the overfilled team to the underfilled team
      const playerToMove = teamMap[overTeam].pop();
      if (playerToMove) {
        teamMap[underTeam].push(playerToMove);
      }

      // Update the lists if teams are now balanced
      if (teamMap[overTeam].length <= playersPerTeam) teamsOverLimit.shift();
      if (teamMap[underTeam].length >= playersPerTeam) teamsUnderLimit.shift();
    }
  }

  // Distribute players ensuring fairness
  distributePlayersInRounds(goalkeepers); // Ensure goalkeepers are evenly spread
  distributePlayersInRounds(highSkill, true); // Prioritizes teams with more low-skill players when adding a high-skill player.
  distributePlayersInRounds(lowSkill, true); // Prioritizes teams with more high-skill players when adding a low-skill player.
  distributePlayersInRounds(mediumSkill); // Medium-skill players balance team size
  balanceTeamSizes(); // Final balancing of team sizes

  // Assign substitution order and sort players for each team
  const generatedTeams: GeneratedTeams = {};
  Object.keys(teamMap).forEach((teamName) => {
    const clonedPlayers = teamMap[teamName].map((player) => ({ ...player })); // Avoids mutations in the original array
    assignSubstitutionOrder(clonedPlayers);
    generatedTeams[teamName] = sortPlayersByPosition(clonedPlayers);
  });

  return generatedTeams;
}
