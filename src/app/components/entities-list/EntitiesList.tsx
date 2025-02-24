/**
 * EntitiesList Component
 * This component allows users to input and manage a list of entities.
 * It supports multiple entity types (e.g., Players, Teams) and provides import functionality.
 * The component includes features for adding, updating, and deleting entities.
 * It also allows users to reset the entities to their default values.
 * The component is designed to be reusable and flexible for different entity types.
 */

/**
 * Import dependencies
 */
"use client";
import * as React from "react";
import { useState } from "react";
// Import the Button and Select components from the UI library
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Import types from the entityTypes file
import { EntityType, EntitiesListProps } from "@/app/types/entityTypes";
// Import utility functions from the entityUtils file
import { formatEntity, updateNumberOfEntities } from "@/app/utils/entityUtils";
// Import the EntityImport and EntityTable components
import { EntityImport } from "./EntityImport";
import { EntityTable } from "./EntityTable";

/**
 * EntitiesList Component
 * @param entityType - The type of entity to manage
 * @param entities - The list of entities to display
 * @param setEntities - Function to update the list of entities
 */
export const EntitiesList = <T extends EntityType>({
  entityType,
  entities,
  setEntities,
}: EntitiesListProps<T>) => {
  // Format the entity type for display
  const { singular, plural, capitalizedSingular, capitalizedPlural } =
    formatEntity(entityType);

  // State to control whether the import section is visible
  const [isImporting, setIsImporting] = useState(false);

  // Toggles the import section visibility
  const handleImportToggle = () => {
    setIsImporting((prev) => !prev);
  };

  // Updates the list of Entities when the dropdown value changes.
  const handleUpdateNumberOfEntities = (newLength: number) =>
    setEntities((prev) => updateNumberOfEntities(prev, newLength, entityType));

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
        <EntityImport
          entityType={entityType}
          setEntities={setEntities}
          setIsImporting={setIsImporting}
        />
      ) : (
        <EntityTable
          entityType={entityType}
          entities={entities}
          setEntities={setEntities}
        />
      )}
    </section>
  );
};
