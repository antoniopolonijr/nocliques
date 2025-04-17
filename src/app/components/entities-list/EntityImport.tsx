"use client";

/**
 * EntityImport Component
 * This component allows users to import a list of entities for a given entity type.
 * It includes a textarea for input and a button to confirm the import.
 * The import text is parsed and used to update the list of entities.
 * This component is used in the EntitiesList component.
 */

/**
 * Import dependencies
 */

// React Hooks
import { useState } from "react";

// UI Components
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
import { useToast } from "@/hooks/use-toast";

// Utility Functions
import {
  formatEntity,
  parseImportData,
  getPlaceholderText,
} from "@/app/utils/entityUtils";

// Types
import { EntityType, EntityImportProps } from "@/app/types/entityTypes";

// Constants
import { textLabel, fieldsLegend } from "@/app/constants/entityDefaults";

/**
 * EntityImport Component
 * @param entityType - The type of entity to import
 * @param setEntities - Function to update the list of entities
 */
export default function EntityImport<T extends EntityType>({
  entityType,
  setEntities,
}: EntityImportProps<T>) {
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

  // Toast notification
  const { toast } = useToast();

  /**
   * Handles the confirmation of imported data:
   * - Parses the import text.
   * - Updates the entity list state.
   * - Resets import-related states for future use.
   */
  // This function processes the import data and updates the list of entities
  const handleConfirmImport = () => {
    // Check if the import text is empty
    if (!importText) {
      // If empty, show an error message or a toast notification
      toast({
        description: `No data to import. Please provide a list of ${plural}.`,
        title: "Import Error",
        variant: "destructive",
      });
      return; // If empty, do nothing
    }

    // Parse the imported text data and update the entities list
    const newEntities = parseImportData(importText, entityType);

    // Update the state with the new entities
    setEntities(newEntities); // Update the entities list in the state
    setImportText(""); // Clear the import text field
  };

  /**
   * Render the EntityImport component
   */
  return (
    <section aria-label={`Import ${capitalizedPlural} Section`}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary">Import {capitalizedPlural}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import {capitalizedPlural}</AlertDialogTitle>
            <AlertDialogDescription>
              <Label
                className="text-sm text-zinc-500 dark:text-zinc-400 font-normal"
                htmlFor={`import-${plural}`}
              >
                Insert or paste a list of {plural} with one {singular} per line.
                {textLabel[entityType]}
                {fieldsLegend[entityType]?.()}
              </Label>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <section className="flex flex-col gap-4">
            <Textarea
              placeholder={getPlaceholderText(entityType)}
              rows={6}
              id={`import-${plural}`}
              name={`import-${plural}`}
              aria-label={`Import ${capitalizedPlural} Textarea`}
              value={importText}
              onChange={handleImportChange}
            />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
              <span className="font-bold">Warning:</span> This action cannot be
              undone. Confirming the import will overwrite your existing list of{" "}
              {plural}.
            </p>
          </section>
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
    </section>
  );
}
