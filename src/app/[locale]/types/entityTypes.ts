/**
 * Entity types and interfaces with internationalization support.
 * This file defines the available entity types, their corresponding interfaces,
 * and component props that interact with these entities.
 */

// Import React types for TypeScript
import { Dispatch, SetStateAction } from "react";

/**
 * Enum-like string literals to identify entity types.
 * You can easily extend this by adding more entity types.
 */
export type EntityType = "Players" | "Teams"; // Add more: | "Coaches", etc.

/**
 * Base interface shared by all entities.
 * All entities must have a `name` property.
 */
export interface BaseEntity {
  name: string;
}

/**
 * SkillLevel values used for players.
 * These values will be translated in the UI, so avoid hard-coding user-facing labels.
 */
export type SkillLevel = "Low" | "Medium" | "High";

/**
 * Player positions.
 * These strings act as internal identifiers and should be translated before displaying to the user.
 */
export type Position =
  | "Any"
  | "Goalkeeper"
  | "Defender"
  | "Defensive Midfielder"
  | "Attacking Midfielder"
  | "Forward";

/**
 * The Player interface extends the base entity and adds position and skill.
 * `substitutionOrder` can be used to handle player rotation logic.
 */
export interface Player extends BaseEntity {
  position: Position;
  skill: SkillLevel;
  substitutionOrder?: number;
}

/**
 * Team interface only requires a name.
 */
export type Team = BaseEntity;

/**
 * Map entity types to their corresponding data structures.
 * Useful for generically typing props and lists.
 */
export interface EntityMap {
  Players: Player;
  Teams: Team;
  // Extend here if more entity types are added
  // Coaches: Coach;
}

/**
 * Props shared by components that render editable lists of entities.
 */
export interface EntitiesListProps<T extends EntityType> {
  entityType: T; // Type identifier: "Players", "Teams", etc.
  entities: EntityMap[T][]; // Array of the specific entity type
  setEntities: Dispatch<SetStateAction<EntityMap[T][]>>; // Function to update the list
}

/**
 * Props for components that import or load entities (e.g., via JSON upload or local storage).
 */
export interface EntityImportProps<T extends EntityType> {
  entityType: T;
  setEntities: Dispatch<SetStateAction<EntityMap[T][]>>;
}

/**
 * Props for a table-like display of entities (read/write).
 */
export interface EntityTableProps<T extends EntityType> {
  entityType: T;
  entities: EntityMap[T][];
  setEntities: Dispatch<SetStateAction<EntityMap[T][]>>;
}

/**
 * A structure representing the final generated teams.
 * Each team name maps to an array of players assigned to that team.
 */
export interface GeneratedTeams {
  [teamName: string]: Player[];
}

/**
 * Props for a list-style component that displays generated teams.
 */
export interface GeneratedTeamsListProps {
  generatedTeams: GeneratedTeams;
  generatedAt: Date | null; // Timestamp of when the generation occurred
}

/**
 * Props for a table-style component that displays generated teams.
 */
export interface GeneratedTableProps {
  generatedTeams: GeneratedTeams;
}
