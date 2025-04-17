/**
 * EntitiesList Component
 * This component allows users to input and manage a list of entities.
 * It supports multiple entity types (e.g., Players, Teams) and provides import functionality.
 * The component includes features for adding, updating, and deleting entities.
 * It also allows users to reset the entities to their default values.
 * The component is designed to be reusable and flexible for different entity types.
 */

// Import dependencies
"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * Entity Types & Interfaces
 */

// Defines the available entity types.
export type EntityType = "Players" | "Teams"; // | "NewEntityType"; You can extend this easily by adding more entity types

// Base interface for common fields.
export interface BaseEntity {
  name: string;
}

// Player entity with additional fields.
export interface Player extends BaseEntity {
  position: "Any" | "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  skill: "Low" | "Medium" | "High";
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

// Default Entity Values
// Provides a single source of truth for default values of each entity type.
export const entityDefaults: { [K in EntityType]: EntityMap[K] } = {
  Players: { name: "", position: "Any", skill: "Medium" },
  Teams: { name: "" },
  // NewEntityType: { name: "" }, // Example for a future entity
};

// Utility function to create a default entity based on its type.
export const createDefaultEntity = <T extends EntityType>(
  entityType: T
): EntityMap[T] => {
  return entityDefaults[entityType];
};

// Default lengths for each entity type
export const entityDefaultLengths: { [K in EntityType]: number } = {
  Players: 16,
  Teams: 2,
  // NewEntityType: 10, // Example for a future entity
};

// Function to initialize arrays of default entities with customizable length
export const initializeEntities = <T extends EntityType>(
  entityType: T,
  length?: number // Optional length parameter, will fall back to default
): EntityMap[T][] => {
  const defaultLength = entityDefaultLengths[entityType]; // Get the default length for the entity type
  return Array.from({ length: length ?? defaultLength }, () =>
    createDefaultEntity(entityType)
  ); // Use length or default
};

// Props for the EntitiesList component
export interface EntitiesListProps<T extends EntityType> {
  entityType: T;
  entities: EntityMap[T][];
  setEntities: React.Dispatch<React.SetStateAction<EntityMap[T][]>>;
}

/**
 * abbreviations mapping and getAbbreviation function
 */

// Maps abbreviations
export const abbreviations: Record<string, string> = {
  // Positions
  Goalkeeper: "GK",
  Defender: "DF",
  Midfielder: "MF",
  Forward: "FW",

  // Skills
  Low: "L",
  Medium: "M",
  High: "H",
};

// Function that returns the corresponding abbreviation or the original value if there is no abbreviation
export function getAbbreviation(value: string): string {
  return abbreviations[value] || value;
}

/*********************************************************************
 * EntitiesList component
 * This component alLows users to input and manage a list of Entities.
 *********************************************************************/
export const EntitiesList = <T extends EntityType>({
  entityType,
  entities,
  setEntities,
}: EntitiesListProps<T>) => {
  /**
   * Utility function to handle different variations of an entity type (e.g., "players" → "player", "Players", etc.).
   *
   * - Supports **singular** and **plural** forms.
   * - Includes **capitalized versions** for UI consistency.
   * - Uses an explicit mapping for **irregular words**.
   * - Defaults to lowercase transformations if an entity isn't found.
   */

  const formatEntity = (entityType: string) => {
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

  // Format the entity type for display
  const { singular, plural, capitalizedSingular, capitalizedPlural } =
    formatEntity(entityType);

  /**
   * State and functions for importing Entities.
   */

  // State to control whether the import section is visible
  const [isImporting, setIsImporting] = useState(false);

  // State to hold the text input for importing Entities
  const [importText, setImportText] = useState("");

  // Toggles the import section visibility
  const handleImportToggle = () => {
    setIsImporting((prev) => !prev);
  };

  // Updates the import text as the user types
  const handleImportChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setImportText(event.target.value);

  /**
   * Normalization Maps
   * Maps possible input variations (including abbreviations) to their normalized forms.
   */
  const normalizationMaps = {
    position: {
      any: "Any",
      goalkeeper: "Goalkeeper",
      gk: "Goalkeeper",
      defender: "Defender",
      df: "Defender",
      midfielder: "Midfielder",
      mf: "Midfielder",
      forward: "Forward",
      fw: "Forward",
    } as Record<string, Player["position"]>,
    skill: {
      low: "Low",
      l: "Low",
      medium: "Medium",
      m: "Medium",
      high: "High",
      h: "High",
    } as Record<string, Player["skill"]>,
  };

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
        acc[fieldKey] = normalizeField(
          entityType,
          fieldKey,
          fields[index] ?? ""
        ); // Normalize each field.
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
  const parseImportData = <T extends EntityType>(
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
   * Handles the confirmation of imported data:
   * - Parses the import text.
   * - Updates the entity list state.
   * - Resets import-related states for future use.
   */
  // This function processes the import data and updates the list of entities
  const handleConfirmImport = () => {
    // Parse the imported text data and update the entities list
    const newEntities = parseImportData(importText, entityType);

    // Update the state with the new entities
    setEntities(newEntities); // Update the entities list in the state
    setIsImporting(false); // Hide the import modal
    setImportText(""); // Clear the import text field
  };

  // Clear the import text
  const handleClearImport = () => {
    setImportText("");
  };

  /**
   * Entity management functions (Add, Update, Delete, Reset)
   */

  /**
   * Update a specific Entity in the list with new values
   * @param index - The index of the Entity to update.
   * @param updatedFields - The fields to update.
   */
  const handleUpdateEntity = <T extends EntityType>(
    index: number,
    updatedFields: Partial<EntityMap[T]>
  ) => {
    setEntities((prevEntities) =>
      prevEntities.map((entity, i) =>
        i === index ? { ...entity, ...updatedFields } : entity
      )
    );
  };

  /**
   * Deletes a Entity from the list.
   * @param index - The index of the Entity to remove.
   */
  const handleDelete = (index: number) => {
    setEntities((prevEntities) => prevEntities.filter((_, i) => i !== index));
  };

  // Adds a new Entity to the list.
  const handleAddEntity = () => {
    setEntities((prevEntities) => [
      ...prevEntities,
      createDefaultEntity(entityType),
    ]);
  };

  // Resets all Entities to default values
  const handleResetEntities = (): void => {
    setEntities((prevEntities) =>
      prevEntities.map(() => createDefaultEntity(entityType))
    );
  };

  /**
   * Updates the list of Entities when the dropdown value changes.
   * @param newLength - The new number of Entities selected.
   */
  const handleUpdateNumberOfEntities = (newLength: number) => {
    setEntities((prevEntities) => {
      if (newLength > prevEntities.length) {
        // Add new Entity objects if the selected number is greater than the current count
        return [
          ...prevEntities,
          ...Array.from({ length: newLength - prevEntities.length }, () =>
            createDefaultEntity(entityType)
          ),
        ];
      }
      // Else trim the array if the selected number is smaller
      return prevEntities.slice(0, newLength);
    });
  };

  /**
   * Renders the EntitiesList component.
   */

  return (
    <section
      aria-labelledby={`${capitalizedPlural}-list-title`}
      className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <header className="flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h3
              id={`${capitalizedPlural}-list-title`}
              className="font-semibold leading-none tracking-tight"
            >
              {capitalizedPlural}
            </h3>

            {/* Dropdown to select the number of Entities */}
            {/* - If isImporting is true, hide the Dropdown */}
            {!isImporting && (
              <Select
                name={`number-of-${plural}`}
                value={entities.length.toString()}
                onValueChange={(value) =>
                  handleUpdateNumberOfEntities(parseInt(value, 10))
                }
              >
                <SelectTrigger
                  aria-label={`Number of ${capitalizedPlural}`}
                  id={`number-of-${plural}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {/* Generate selectable numbers from 1 to 100 dynamically */}
                  {Array.from({ length: 100 }, (_, i) => (
                    <SelectItem
                      key={i + 1}
                      value={(i + 1).toString()}
                      aria-label={`Select ${i + 1} ${capitalizedPlural}`}
                    >
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          {isImporting ? (
            <Button
              aria-label={`Cancel Import ${capitalizedPlural}`}
              type="button"
              variant="secondary"
              onClick={handleImportToggle}
            >
              Cancel Import
            </Button>
          ) : (
            <Button
              aria-label={`Import ${capitalizedPlural}`}
              type="button"
              variant="secondary"
              onClick={handleImportToggle}
            >
              Import {capitalizedPlural}
            </Button>
          )}
        </div>
      </header>

      {/* 
        Renders either the Import Entities or Entities Table section based on "isImporting":  
        - true: Shows the import area with textarea and controls.  
        - false: Displays the table for managing Entities.  
      */}
      {isImporting ? (
        <section
          aria-label={`Import ${capitalizedPlural} Section`}
          className="flex flex-col gap-6 p-4 pt-0 sm:p-6 sm:pt-0"
        >
          <Label
            className="text-sm text-zinc-500 dark:text-zinc-400 font-normal"
            htmlFor={`import-${plural}`}
          >
            Insert or paste a list of {capitalizedPlural} with one {singular}{" "}
            per line. Optionally, add other fields separated by commas if
            applicable. Invalid entries will use default values.
          </Label>
          <Textarea
            placeholder={
              entityType === `Players`
                ? `Ronaldo\nRonaldo, FORWARD\nRonaldo, Forward, High\nRonaldo, fw, h`
                : entityType === `Teams`
                ? `Real Madrid\nBarcelona`
                : ""
            } // Placeholder text for Players or Teams
            rows={6}
            id={`import-${plural}`}
            name={`import-${plural}`}
            aria-label={`Import ${capitalizedPlural} Textarea`}
            value={importText}
            onChange={handleImportChange}
          />
          <div className="flex gap-2 items-center justify-between">
            <Button
              type="button"
              aria-label="Clear Import Text"
              variant="outline"
              onClick={handleClearImport}
            >
              Clear
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default">Import {capitalizedPlural}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Confirming the import will
                    overwrite your existing list of {capitalizedPlural}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleConfirmImport}
                    aria-label={`Confirm Import ${capitalizedPlural}`}
                  >
                    Confirm Import
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>
      ) : (
        <section
          aria-label={`${capitalizedPlural} Table Section`}
          className="flex flex-col gap-4 p-4 sm:p-6 pt-0 sm:pt-0"
        >
          <p
            id={`${plural}-table-instructions`}
            className="text-sm text-zinc-500 dark:text-zinc-400"
          >
            Select the number of {plural}, then fill in each {singular}'s
            fields. You can also import a list of {plural}.
          </p>
          <Table aria-describedby={`${plural}-table-instructions`}>
            <TableHeader>
              <TableRow>
                {Object.keys(entityDefaults[entityType]).map((key) => (
                  <TableHead key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableHead>
                ))}
                <TableHead className="text-right">{/* Actions */}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entities.map((entity, index) => (
                <TableRow key={index} className="w-full">
                  {/* Editable input for Entity name */}
                  <TableCell className="px-0.5 w-full">
                    <Input
                      className="truncate"
                      type="text"
                      value={entity.name}
                      onChange={(e) =>
                        handleUpdateEntity(index, { name: e.target.value })
                      }
                      aria-label={`${
                        entity.name || `${capitalizedSingular} ${index + 1}`
                      } Name`}
                      placeholder={`${capitalizedSingular} ${index + 1}`}
                      id={`${singular}-${index + 1}-name`}
                      name={`${singular}-${index + 1}-name`}
                      required
                    />
                  </TableCell>

                  {/* Select dropdown for Entity position */}
                  {entityType === "Players" && (
                    <TableCell className="px-0.5">
                      <Select
                        required
                        name={`${singular}-${index + 1}-position`}
                        value={(entity as Player).position}
                        onValueChange={(value) =>
                          handleUpdateEntity(index, {
                            position: value as Player["position"],
                          })
                        }
                      >
                        <SelectTrigger
                          id={`${singular}-${index + 1}-position`}
                          aria-label={`${
                            entity.name || `${capitalizedSingular} ${index + 1}`
                          } Position`}
                        >
                          <SelectValue placeholder="Position">
                            <abbr
                              title={(entity as Player).position}
                              className="sm:hidden no-underline"
                            >
                              {getAbbreviation((entity as Player).position)}
                            </abbr>
                            <span className="hidden sm:inline">
                              {(entity as Player).position}
                            </span>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="Any"
                            aria-label={`Select Any position`}
                          >
                            Any
                          </SelectItem>
                          <SelectItem
                            value="Goalkeeper"
                            aria-label={`Select Goalkeeper position`}
                          >
                            Goalkeeper
                          </SelectItem>
                          <SelectItem
                            value="Defender"
                            aria-label={`Select Defender position`}
                          >
                            Defender
                          </SelectItem>
                          <SelectItem
                            value="Midfielder"
                            aria-label={`Select Midfielder position`}
                          >
                            Midfielder
                          </SelectItem>
                          <SelectItem
                            value="Forward"
                            aria-label={`Select Forward position`}
                          >
                            Forward
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}

                  {/* Select dropdown for Entity skill level */}
                  {entityType === "Players" && (
                    <TableCell className="px-0.5">
                      <Select
                        required
                        name={`${singular}-${index + 1}-skill`}
                        value={(entity as Player).skill}
                        onValueChange={(value) =>
                          handleUpdateEntity(index, {
                            skill: value as Player["skill"],
                          })
                        }
                      >
                        <SelectTrigger
                          id={`${singular}-${index + 1}-skill`}
                          aria-label={`${
                            entity.name || `${capitalizedSingular} ${index + 1}`
                          } Skill`}
                        >
                          <SelectValue placeholder="Skill">
                            <abbr
                              title={(entity as Player).skill}
                              className="sm:hidden no-underline"
                            >
                              {getAbbreviation((entity as Player).skill)}
                            </abbr>
                            <span className="hidden sm:inline">
                              {(entity as Player).skill}
                            </span>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="Low"
                            aria-label={`Select Low skill`}
                          >
                            Low
                          </SelectItem>
                          <SelectItem
                            value="Medium"
                            aria-label={`Select Medium skill`}
                          >
                            Medium
                          </SelectItem>
                          <SelectItem
                            value="High"
                            aria-label={`Select High skill`}
                          >
                            High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}

                  {/* Delete Entity button */}
                  <TableCell
                    colSpan={Object.keys(entityDefaults[entityType]).length + 1}
                    className="px-0.5 text-right"
                  >
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleDelete(index)}
                      aria-label={`Delete ${capitalizedSingular} ${
                        entity.name || `${index + 1}`
                      }`}
                    >
                      <abbr
                        title="Delete"
                        className="no-underline sm:after:content-['Delete'] after:content-['X']"
                      ></abbr>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <tfoot>
              <TableRow className="border-t border-b-0 hover:bg-transparent w-full">
                {/* Reset Entities Data button */}
                <TableCell
                  colSpan={Object.keys(entityDefaults[entityType]).length + 1}
                  className="pt-6 px-0.5"
                >
                  <div className="flex justify-between w-full">
                    {/* Reset Entities Data button */}
                    {/* Reset Button: Hidden when has no entities */}
                    {entities.length > 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleResetEntities}
                        aria-label={`Reset ${capitalizedPlural} Data`}
                      >
                        Reset
                      </Button>
                    ) : (
                      <span></span> // Keeps layout consistent when hidden
                    )}
                    {/* Add Entity button */}
                    <Button
                      type="button"
                      onClick={handleAddEntity}
                      aria-label={`Add ${capitalizedSingular}`}
                    >
                      Add {capitalizedSingular}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </tfoot>
          </Table>
        </section>
      )}
    </section>
  );
};
