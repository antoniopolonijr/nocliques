/**
 * Utility functions for entity management and normalization.
 */

// Types
import { EntityMap, EntityType } from "@/app/types/entityTypes";

// Constants
import {
  entityDefaults,
  entityDefaultLengths,
  DEFAULT_PLACEHOLDER,
} from "@/app/constants/entityDefaults";
import {
  abbreviations,
  normalizationMaps,
} from "@/app/constants/abbreviations";

// Ensure abbreviations is typed as Record<string, string>
const typedAbbreviations: Record<
  string,
  Record<string, string>
> = abbreviations;

/**
 * Utility function to create a default entity based on its type.
 * @param entityType - The type of entity to create.
 * @returns A default entity object.
 */
export const createDefaultEntity = <T extends EntityType>(
  entityType: T
): EntityMap[T] => {
  return entityDefaults[entityType];
};

/**
 * Function to initialize arrays of default entities with customizable length
 * @param entityType - The type of entity to initialize.
 * @param length - The number of entities to create.
 * @returns An array of default entities.
 */
export const initializeEntities = <T extends EntityType>(
  entityType: T,
  length?: number // Optional length parameter, will fall back to default
): EntityMap[T][] => {
  const defaultLength = entityDefaultLengths[entityType]; // Get the default length for the entity type
  return Array.from({ length: length ?? defaultLength }, () =>
    createDefaultEntity(entityType)
  ); // Use length or default
};

/**
 * Function to format entity types for display
 * @param entityType - The entity type to format.
 * @returns An object with formatted entity types.
 * - singular: The singular form of the entity (e.g., "player").
 * - plural: The plural form of the entity (e.g., "players").
 * - capitalizedSingular: The capitalized singular form (e.g., "Player").
 * - capitalizedPlural: The capitalized plural form (e.g., "Players").
 */
export const formatEntity = (entityType: string) => {
  // Predefined mapping for known entity types
  const entityMap: Record<string, { singular: string; plural: string }> = {
    players: { singular: "player", plural: "players" },
    teams: { singular: "team", plural: "teams" },
  };

  // Retrieve entity mapping or fallback to defaults
  const entity = entityMap[entityType.toLowerCase()] || {
    singular: entityType.toLowerCase(),
    plural: entityType.toLowerCase(),
  };

  return {
    singular: entity.singular, // e.g., "player"
    plural: entity.plural, // e.g., "players"
    capitalizedSingular:
      entity.singular.charAt(0).toUpperCase() + entity.singular.slice(1), // e.g., "Player"
    capitalizedPlural:
      entity.plural.charAt(0).toUpperCase() + entity.plural.slice(1), // e.g., "Players"
  };
};

/**
 * Function that returns the corresponding abbreviation or the original value if there is no abbreviation
 * @param value - The value to abbreviate.
  return typedAbbreviations[value] || value;
 */
export function getAbbreviation(value: string): string {
  const category = Object.keys(typedAbbreviations).find((key) =>
    typedAbbreviations[key].hasOwnProperty(value)
  );
  return category ? typedAbbreviations[category][value] : value;
}

/**
 * Generalized Field Normalization Function
 * @template K - Entity type ("Players" | "Teams").
 * @template F - Field key of the entity.
 * @param entityType - The type of entity being processed.
 * @param fieldKey - The specific field to normalize.
 * @param value - The raw input value.
 * @returns Normalized field value or default if unrecognized.
 *
 * This function handles:
 * - Trimming whitespace from input.
 * - Mapping recognized abbreviations to full values.
 * - Falling back to default values defined in entityDefaults.
 */
const normalizeField = <K extends EntityType, F extends keyof EntityMap[K]>(
  entityType: K,
  fieldKey: F,
  value: string
): EntityMap[K][F] => {
  const defaultValue = entityDefaults[entityType][fieldKey]; // Get default value from entityDefaults.

  // If the field has a normalization map (like position or skill), use it.
  if (fieldKey in normalizationMaps) {
    const map = normalizationMaps[fieldKey as keyof typeof normalizationMaps];
    return (map[value.toLowerCase()] ?? defaultValue) as EntityMap[K][F];
  }

  // For fields without a normalization map (e.g., name), trim or use the default.
  return (value.trim() || defaultValue) as EntityMap[K][F];
};

/**
 * Unified Parsing Function
 * @template T - Entity type.
 * @param fields - Array of raw field values (e.g., ["John", "Forward", "High"]).
 * @param entityType - The type of entity to parse.
 * @returns A fully normalized entity object.
 *
 * Steps:
 * 1. Retrieves the default entity structure.
 * 2. Extracts field keys dynamically from entityDefaults.
 * 3. Normalizes each field using normalizeField.
 * 4. Returns a new entity with all fields set.
 */
const parseEntity = <T extends EntityType>(
  fields: string[],
  entityType: T
): EntityMap[T] => {
  const defaultEntity = entityDefaults[entityType]; // Base defaults.
  const entityFields = Object.keys(defaultEntity) as (keyof EntityMap[T])[]; // Dynamic field extraction.

  return entityFields.reduce(
    (acc, fieldKey, index) => {
      acc[fieldKey] = normalizeField(entityType, fieldKey, fields[index] ?? ""); // Normalize each field.
      return acc;
    },
    { ...defaultEntity }
  ) as EntityMap[T]; // Return entity with normalized fields.
};

/**
 * Parses Imported Data into Entities
 * @template T - Entity type.
 * @param data - Multiline CSV-like string with entity information.
 * @param entityType - The type of entity to parse.
 * @returns An array of normalized entities.
 *
 * Parsing Steps:
 * 1. Trims input to avoid leading/trailing whitespace issues.
 * 2. Splits input into lines (one per entity).
 * 3. Splits each line into comma-separated fields and trims them.
 * 4. Filters out empty lines.
 * 5. Parses each set of fields into an entity via parseEntity.
 */
export const parseImportData = <T extends EntityType>(
  data: string,
  entityType: T
): EntityMap[T][] => {
  return data
    .trim() // Step 1: Clean input.
    .split("\n") // Step 2: Split into lines.
    .map((line) => line.split(",").map((field) => field.trim())) // Step 3: Split and trim fields.
    .filter((fields) => fields.some(Boolean)) // Step 4: Remove empty lines.
    .map((fields) => parseEntity(fields, entityType)); // Step 5: Parse fields into entities.
};

/**
 * Entity management functions (Add, Update, Delete, Reset) *
 */

/**
 * Add a new entity with default values
 * @param entities - The list of Entities to add to.
 * @param entityType - The type of entity to add.
 * @returns The updated list of Entities.
 */
export const addEntity = <T extends EntityType>(
  entities: EntityMap[T][],
  entityType: T
): EntityMap[T][] => [...entities, createDefaultEntity(entityType)];

/**
 * Update a specific Entity in the list with new values
 * @param entities - The list of Entities to update.
 * @param index - The index of the Entity to update.
 * @param updatedFields - The fields to update.
 * @returns The updated list of Entities.
 */
export const updateEntity = <T extends EntityType>(
  entities: EntityMap[T][],
  index: number,
  updatedFields: Partial<EntityMap[T]>
): EntityMap[T][] =>
  entities.map((entity: EntityMap[T], i: number) =>
    i === index ? { ...entity, ...updatedFields } : entity
  );

/**
 * Deletes a Entity from the list.
 * @param entities - The list of Entities to remove from.
 * @param index - The index of the Entity to remove.
 * @returns The updated list of Entities.
 */
export const deleteEntity = <T extends EntityType>(
  entities: EntityMap[T][],
  index: number
): EntityMap[T][] =>
  entities.filter((_: EntityMap[T], i: number) => i !== index);

/**
 * Resets all Entities to default values
 * @param entities - The list of Entities to reset.
 * @param entityType - The type of entity to reset.
 * @returns The updated list of Entities.
 */
export const resetEntities = <T extends EntityType>(
  entities: EntityMap[T][],
  entityType: T
): EntityMap[T][] => entities.map(() => createDefaultEntity(entityType));

/**
 * Updates the list of Entities when the dropdown value changes.
 * @param entities - The list of Entities to update.
 * @param newLength - The new number of Entities selected.
 * @param entityType - The type of entity to update.
 * @returns The updated list of Entities.
 */
export const updateNumberOfEntities = <T extends EntityType>(
  entities: EntityMap[T][],
  newLength: number,
  entityType: T
): EntityMap[T][] => {
  if (newLength > entities.length) {
    // Add new Entity objects if the selected number is greater than the current count
    return [
      ...entities,
      ...Array.from({ length: newLength - entities.length }, () =>
        createDefaultEntity(entityType)
      ),
    ];
  }
  // Remove Entity objects if the selected number is less than the current count
  return entities.slice(0, newLength);
};

/**
 * Retrieves the placeholder text based on the selected entity type.
 * Falls back to an empty string if the entity type is not recognized.
 */
export const getPlaceholderText = (entityType: EntityType): string => {
  return DEFAULT_PLACEHOLDER[entityType] || "";
};
