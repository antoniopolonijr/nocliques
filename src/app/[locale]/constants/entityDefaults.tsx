/**
 * Entity Defaults
 * Provides default values for each entity type.
 * This is used to populate new entities with default values.
 * This is also used to provide default lengths for each entity type.
 * This is used to provide a single source of truth for default values.
 */

/**
 * Import dependencies
 */

// React
import { JSX } from "react";

// Types
import {
  EntityMap,
  EntityType,
  Player,
} from "@/app/[locale]/types/entityTypes";

// Constants
import FieldsLegendPlayers from "@/app/[locale]/constants/FieldsLegendPlayers";

// Default Entity Values
// Provides a single source of truth for default values of each entity type.
export const entityDefaults: { [K in EntityType]: EntityMap[K] } = {
  Players: { name: "", position: "Any", skill: "Medium" },
  Teams: { name: "" },
  // NewEntityType: { name: "" }, // Example for a future entity
};

// Default lengths for each entity type
export const entityDefaultLengths: { [K in EntityType]: number } = {
  Players: 16,
  Teams: 2,
  // NewEntityType: 10, // Example for a future entity
};

/**
 * Fields legend for different entity types.
 */
export const fieldsLegend: Record<string, () => JSX.Element | null> = {
  Players: () => <FieldsLegendPlayers />,
  Teams: () => null,
};

// Constant array to store Player Positions options
export const playerPositions: Player["position"][] = [
  "Any",
  "Goalkeeper",
  "Defender",
  "Defensive Midfielder",
  "Attacking Midfielder",
  "Forward",
];

// Constant array to store Player Positions options
export const playerSkills: Player["skill"][] = ["Low", "Medium", "High"];

/**
 * Predefined sorting order for player positions.
 */
export const POSITION_ORDER: Record<string, number> = {
  Goalkeeper: 0,
  Defender: 1,
  "Defensive Midfielder": 2,
  "Attacking Midfielder": 3,
  Forward: 4,
  Any: 5,
};
