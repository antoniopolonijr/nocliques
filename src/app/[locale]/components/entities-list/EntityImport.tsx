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

// Icons
import { Import } from "lucide-react";

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
} from "@/app/[locale]/utils/entityUtils";

// Types
import {
  EntityType,
  EntityImportProps,
} from "@/app/[locale]/types/entityTypes";

// Constants
import { fieldsLegend } from "@/app/[locale]/constants/entityDefaults";

// Translations
import { useTranslations } from "next-intl";

/**
 * EntityImport Component
 * @param entityType - The type of entity to import
 * @param setEntities - Function to update the list of entities
 */
export default function EntityImport<T extends EntityType>({
  entityType,
  setEntities,
}: EntityImportProps<T>) {
  // Translations
  const t = useTranslations("EntityImport");

  // Format the entity type for display
  const { singular, plural, capitalizedPlural } = formatEntity(entityType);

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
        description: `${t("ImportErrorDescription")}`,
        title: `${t("ImportErrorTitle")}`,
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
    <section>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="secondary"
            aria-label={`${t("Import")} ${t(capitalizedPlural)}`}
          >
            <Import className="inline me-1" aria-hidden="true" /> {t("Import")}{" "}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("Import")} {t(capitalizedPlural)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Label
                className="text-sm text-zinc-600 dark:text-zinc-400 font-normal"
                htmlFor={`import-${t(plural)}`}
              >
                {t("instructionPrefix")} {t(plural)} {t("instructionInfix")}{" "}
                {t(singular)} {t("instructionSufix")}.{" "}
                {entityType === "Players" ? `${t("instructionExtra")}` : ""}{" "}
                {fieldsLegend[entityType]?.()}
              </Label>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <section className="flex flex-col gap-4">
            <Textarea
              placeholder={
                entityType === "Players"
                  ? `Ronaldo\nRonaldo, ${t("FORWARD")}\nRonaldo, ${t(
                      "Forward"
                    )}, ${t("High")}\nRonaldo, ${t("fw")}, ${t("h")}`
                  : entityType === "Teams"
                  ? `Real Madrid\nBarcelona`
                  : ""
              }
              rows={6}
              id={`import-${t(plural)}`}
              name={`import-${t(plural)}`}
              aria-label={`${t("Import")} ${t(capitalizedPlural)} ${t(
                "textarea"
              )}`}
              value={importText}
              onChange={handleImportChange}
              className="placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
            />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
              <span className="font-bold">{t("warning")}</span>{" "}
              {t("warningDescription")} {t(plural)}.
            </p>
          </section>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmImport}
              aria-label={`${t("confirmImport")} ${t(capitalizedPlural)}`}
            >
              {t("confirmImport")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
