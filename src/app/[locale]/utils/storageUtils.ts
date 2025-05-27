// storageUtils.ts

import { Player, Team } from "@/app/[locale]/types/entityTypes";

/**
 * Checks if the code is running in a browser environment (client-side).
 */
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Keys used to identify stored data in localStorage.
 * These should be unique to avoid conflicts with other stored values.
 */
const STORAGE_KEYS = {
  PLAYERS: "nocliques_players",
  TEAMS: "nocliques_teams",
} as const;

/**
 * Saves any data to localStorage by serializing it to JSON.
 *
 * @param key - The localStorage key under which data will be saved.
 * @param data - The data to store.
 */
export function saveToStorage<T>(key: string, data: T): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Loads any data from localStorage and parses it from JSON.
 *
 * @param key - The localStorage key to retrieve data from.
 * @returns Parsed data or null if not found.
 */
export function loadFromStorage<T>(key: string): T | null {
  if (!isBrowser()) return null;
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
}

/**
 * Removes a specific key from localStorage.
 *
 * @param key - The key to remove.
 */
export function clearStorage(key: string): void {
  if (!isBrowser()) return;
  localStorage.removeItem(key);
}

/**
 * Saves the list of players to localStorage.
 *
 * @param players - Array of Player objects.
 */
export function savePlayers(players: Player[]): void {
  saveToStorage(STORAGE_KEYS.PLAYERS, players);
}

/**
 * Saves the list of teams to localStorage.
 *
 * @param teams - Array of Team objects.
 */
export function saveTeams(teams: Team[]): void {
  saveToStorage(STORAGE_KEYS.TEAMS, teams);
}

/**
 * Loads the list of players from localStorage.
 *
 * @returns Array of Player objects or null if not found.
 */
export function loadPlayers(): Player[] | null {
  return loadFromStorage<Player[]>(STORAGE_KEYS.PLAYERS);
}

/**
 * Loads the list of teams from localStorage.
 *
 * @returns Array of Team objects or null if not found.
 */
export function loadTeams(): Team[] | null {
  return loadFromStorage<Team[]>(STORAGE_KEYS.TEAMS);
}
