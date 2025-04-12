// storageUtils.ts
import { Player, Team } from "@/app/types/entityTypes";

// Define localStorage keys for players and teams
const PLAYERS_KEY = "nocliques_players";
const TEAMS_KEY = "nocliques_teams";

// Generic save function
export function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Generic load function
export function loadFromStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
}

// Clear localStorage (optional utility)
export function clearStorage(key: string): void {
  localStorage.removeItem(key);
}

// Specific helpers for players and teams
export function savePlayers(players: Player[]): void {
  saveToStorage(PLAYERS_KEY, players);
}

export function saveTeams(teams: Team[]): void {
  saveToStorage(TEAMS_KEY, teams);
}

export function loadPlayers(): Player[] | null {
  return loadFromStorage<Player[]>(PLAYERS_KEY);
}

export function loadTeams(): Team[] | null {
  return loadFromStorage<Team[]>(TEAMS_KEY);
}
