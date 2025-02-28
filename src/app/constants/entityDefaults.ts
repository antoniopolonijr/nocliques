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

// Types
import { EntityMap, EntityType } from "@/app/types/entityTypes";

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
