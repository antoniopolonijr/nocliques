/**
 * EntityImport Component
 * This component allows users to import a list of entities for a given entity type.
 * It includes a textarea for input and a button to confirm the import.
 * The import text is parsed and used to update the list of entities.
 * This component is used in the EntitiesList component.
 */

// Import dependencies
"use client";
import * as React from "react";
// Import the useState hook from React
import { useState } from "react";
// Import the Button, Label and Textarea components from the UI library
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
// Import functions from the entityUtils file
import { formatEntity, parseImportData } from "@/app/utils/entityUtils";
// Import types from the entityTypes file
import { EntityType, EntityImportProps } from "@/app/types/entityTypes";

/**
 * EntityImport Component
 * @param entityType - The type of entity to import
 * @param setEntities - Function to update the list of entities
 * @param setIsImporting - Function to set the import state
 */
export const EntityImport = <T extends EntityType>({
  entityType,
  setEntities,
  setIsImporting,
}: EntityImportProps<T>) => {
  // Format the entity type for display
  const { singular, plural, capitalizedSingular, capitalizedPlural } =
    formatEntity(entityType);

  /**
   * State and functions for importing Entities.
   */

  // State to hold the text input for importing Entities
  const [importText, setImportText] = useState("");

  // Updates the import text as the user types
  const handleImportChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setImportText(event.target.value);

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
   * Render the EntityImport component
   */
  return (
    <section
      aria-label={`Import ${capitalizedPlural} Section`}
      className="flex flex-col gap-6 p-4 pt-0 sm:p-6 sm:pt-0"
    >
      <Label
        className="text-sm text-zinc-500 dark:text-zinc-400 font-normal"
        htmlFor={`import-${plural}`}
      >
        Insert or paste a list of {capitalizedPlural} with one {singular} per
        line. Optionally, add other fields separated by commas if applicable.
        Invalid entries will use default values.
      </Label>
      <Textarea
        placeholder={
          entityType === `Players` // Placeholder text for Players
            ? `Ronaldo\nRonaldo, FORWARD\nRonaldo, Forward, High\nRonaldo, fw, h`
            : entityType === `Teams` // Placeholder text for Teams
            ? `Real Madrid\nBarcelona`
            : "" // Default placeholder text
        }
        rows={6}
        id={`import-${plural}`}
        name={`import-${plural}`}
        aria-label={`Import ${capitalizedPlural} Textarea`}
        value={importText}
        onChange={handleImportChange}
      />
      <div className="flex gap-2 items-center justify-between">
        {/* Clear the import text button */}
        <Button
          type="button"
          aria-label="Clear Import Text"
          variant="outline"
          onClick={handleClearImport}
        >
          Clear
        </Button>

        {/* This button triggers an alert dialog to confirm the import */}
        {/* The alert dialog contains a message and two buttons to confirm or cancel the import */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {/* Import button */}
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
              {/* Cancel button */}
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* Confirm button */}
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
  );
};
