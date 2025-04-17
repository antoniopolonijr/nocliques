/**
 * Entity types and interfaces.
 * This file defines the available entity types and their corresponding interfaces.
 * It also defines the props for the components that will display and manage these entities.
 * This file can be extended to add more entity types and interfaces as needed.
 */

// Import React types for TypeScript
import { Dispatch, SetStateAction } from "react";

// Defines the available entity types.
export type EntityType = "Players" | "Teams"; // | "NewEntityType"; You can extend this easily by adding more entity types

// Base interface for common fields.
export interface BaseEntity {
  name: string;
}

export type SkillLevel = "Low" | "Medium" | "High";

export type Position =
  | "Any"
  | "Goalkeeper"
  | "Defender"
  | "Defensive Midfielder"
  | "Attacking Midfielder"
  | "Forward";

// Player entity with additional fields.
export interface Player extends BaseEntity {
  position: Position;
  skill: SkillLevel;
  substitutionOrder?: number;
}

// Team entity only has a name.
export interface Team extends BaseEntity {}

// Define additional properties as needed for future entities
/* export interface NewEntityType extends BaseEntity {  
...
} */

// Maps each entity type to its corresponding interface.
export interface EntityMap {
  Players: Player;
  Teams: Team;
  // NewEntityType: NewEntity; // Example for a future entity
}

// Props for the EntitiesList component
export interface EntitiesListProps<T extends EntityType> {
  // Type of entity (Players, Teams or any other future entity)
  entityType: T;
  // List of entities to display
  entities: EntityMap[T][];
  // Function to update the entities list
  setEntities: Dispatch<SetStateAction<EntityMap[T][]>>;
}

// Props for the EntityImportProps component
export interface EntityImportProps<T extends EntityType> {
  // Type of entity (Players, Teams or any other future entity)
  entityType: T;
  // Function to update the entities list
  setEntities: Dispatch<SetStateAction<EntityMap[T][]>>;
}

// Props for the EntityTableProps component
export interface EntityTableProps<T extends EntityType> {
  // Type of entity (Players, Teams or any other future entity)
  entityType: T;
  // List of entities to display
  entities: EntityMap[T][];
  // Function to update the entities list
  setEntities: Dispatch<SetStateAction<EntityMap[T][]>>;
}

// Generated Teams interface
export interface GeneratedTeams {
  [teamName: string]: Player[];
}

// Props for the GeneratedTeamsListProps component
export interface GeneratedTeamsListProps {
  generatedTeams: GeneratedTeams;
  generatedAt: Date | null;
}

// Props for the GeneratedTableProps component
export interface GeneratedTableProps {
  generatedTeams: GeneratedTeams;
}
