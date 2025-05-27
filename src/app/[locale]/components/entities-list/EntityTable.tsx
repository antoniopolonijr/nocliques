/**
 * EntityTable Component
 * This component displays a table of entities for a given entity type.
 * It includes editable fields for each entity, as well as buttons to add, update, and delete entities.
 * The component is designed to be reusable and flexible for different entity types.
 * It is used in the EntitiesList component.
 * The component receives the entity type, list of entities, and a function to update the entities list.
 * It renders a table with columns for each entity field, including name, position, and skill level.
 * The table includes buttons to add, update, and delete entities, as well as a button to reset the entities to their default values.
 */

/**
 * Import dependencies
 */

// Icons
import { RefreshCcw, Plus, Trash2 } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Types
import {
  EntityType,
  EntityMap,
  Player,
  EntityTableProps,
} from "@/app/[locale]/types/entityTypes";

// Constants
import {
  entityDefaults,
  playerPositions,
  playerSkills,
} from "@/app/[locale]/constants/entityDefaults";

// Utility Functions
import {
  formatEntity,
  getAbbreviation,
  deleteEntity,
  addEntity,
  updateEntity,
  resetEntities,
} from "@/app/[locale]/utils/entityUtils";

// Translations
import { useTranslations } from "next-intl";

/**
 * EntityTable Component
 * @param entityType - The type of entity to manage
 * @param entities - The list of entities to display
 * @param setEntities - Function to update the list of entities
 */
export default function EntityTable<T extends EntityType>({
  entityType,
  entities,
  setEntities,
}: EntityTableProps<T>) {
  // Translations
  const t = useTranslations("EntityTable");

  // Format the entity type for display
  const { singular, plural, capitalizedSingular, capitalizedPlural } =
    formatEntity(entityType);

  /**
   * Functions to add, update, delete, and reset entities.
   * These functions update the entities state using setEntities.
   * They are passed as callbacks to child components.
   */
  const handleAddEntity = () =>
    setEntities((prev) => addEntity(prev, entityType));

  const handleUpdateEntity = (
    index: number,
    updatedFields: Partial<EntityMap[typeof entityType]>
  ) => setEntities((prev) => updateEntity(prev, index, updatedFields));

  const handleDeleteEntity = (index: number) =>
    setEntities((prev) => deleteEntity(prev, index));

  const handleResetEntities = () => {
    setEntities((prev) => resetEntities(prev, entityType));

    // Scroll to the top of the list
    setTimeout(() => {
      document
        .getElementById(`${t(plural)}-list`)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 400); // Delay the scroll until the DOM has settled
  };

  /**
   * Render the EntityTable Component
   */
  return (
    <section
      aria-label={`${t(capitalizedPlural)} - ${t("tableSection")}`}
      className="flex flex-col gap-4 p-4 sm:p-6 pt-0 sm:pt-0"
    >
      <p
        id={`${t(plural)}-table-instructions`}
        className="text-sm text-zinc-500 dark:text-zinc-400"
      >
        {t("instructionPrefix")} {t(plural)} {t("instructionInfix")} {t(plural)}
        .
      </p>
      <Table aria-describedby={`${t(plural)}-table-instructions`}>
        <TableHeader>
          <TableRow>
            {/* Table headers for each entity field */}
            {Object.keys(entityDefaults[entityType]).map((key) => (
              <TableHead key={key}>
                {t(key) || key.charAt(0).toUpperCase() + key.slice(1)}
              </TableHead>
            ))}

            {/* Actions header */}
            <TableHead className="text-right">{/* Actions */}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Rows for each entity */}
          {entities.map((entity, index) => (
            <TableRow key={index} className="w-full border-0">
              {/* Editable input for Entity name */}
              <TableCell className="px-0.5 w-full">
                <Input
                  className="truncate"
                  type="text"
                  value={entity.name}
                  // Update the entity name when the value changes
                  onChange={(e) =>
                    handleUpdateEntity(index, {
                      name: e.target.value,
                    } as Partial<EntityMap[T]>)
                  }
                  aria-label={`${t(capitalizedSingular)} ${
                    entity.name || index + 1
                  } - ${t("Name")}`}
                  placeholder={`${t(capitalizedSingular)} ${index + 1}`}
                  id={`${t(singular)}-${index + 1}-name`} // Unique ID for each entity field
                  name={`${t(singular)}-${index + 1}-name`} // Unique name for each entity field
                />
              </TableCell>

              {/* Select dropdown for Entity Position */}
              {/* Only displayed for Players */}
              {entityType === "Players" && (
                <TableCell className="px-0.5">
                  <Select
                    name={`${t(singular)}-${index + 1}-position`} // Unique name for each entity field
                    value={
                      ("position" in entity
                        ? entity.position // Use entity position if set
                        : "Any") as Player["position"] // Default to "Any" if not set
                    }
                    // Update the entity position when the value changes
                    onValueChange={(value) =>
                      handleUpdateEntity(index, {
                        position: value as Player["position"],
                      } as unknown as Partial<EntityMap[T]>)
                    }
                  >
                    <SelectTrigger
                      id={`${t(singular)}-${index + 1}-position`} // Unique ID for each entity field
                      aria-label={`${t(capitalizedSingular)} ${
                        entity.name || index + 1
                      } - ${t("Position")}`}
                    >
                      <SelectValue placeholder={t("Position")}>
                        {/* Display the position abbreviation (e.g., "GK" for "Goalkeeper") on small screens */}
                        <abbr
                          title={t((entity as Player).position)}
                          className="sm:hidden md:inline lg:hidden no-underline"
                        >
                          {t(getAbbreviation((entity as Player).position))}
                        </abbr>
                        <span className="hidden sm:inline md:hidden lg:inline">
                          {t((entity as Player).position)}
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {/* Generate selectable positions dynamically */}
                      {playerPositions.map((position) => (
                        <SelectItem
                          key={position}
                          value={position}
                          aria-label={`${t("Select")} ${t(position)}`}
                        >
                          {t(position)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              )}

              {/* Select dropdown for Entity skill level */}
              {/* Only displayed for Players */}
              {entityType === "Players" && (
                <TableCell className="px-0.5">
                  <Select
                    name={`${t(singular)}-${index + 1}-skill`} // Unique name for each entity field
                    // Use entity skill if set, default to "Medium" if not set
                    value={
                      ("skill" in entity
                        ? entity.skill
                        : "Medium") as Player["skill"]
                    }
                    // Update the entity skill level when the value changes
                    onValueChange={(value) =>
                      handleUpdateEntity(index, {
                        skill: value as Player["skill"],
                      } as unknown as Partial<EntityMap[T]>)
                    }
                  >
                    <SelectTrigger
                      id={`${t(singular)}-${index + 1}-skill`} // Unique ID for each entity field
                      aria-label={`${t(capitalizedSingular)} ${
                        entity.name || index + 1
                      } - ${t("Skill")}`}
                    >
                      <SelectValue placeholder={t("Skill")}>
                        {/* Display the skill abbreviation (e.g., "H" for "High") on small screens */}
                        <abbr
                          title={t((entity as Player).skill)}
                          className="sm:hidden md:inline lg:hidden no-underline"
                        >
                          {t(getAbbreviation((entity as Player).skill))}
                        </abbr>
                        <span className="hidden sm:inline md:hidden lg:inline">
                          {t((entity as Player).skill)}
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {/* Generate selectable skill levels dynamically */}
                      {playerSkills.map((skill) => (
                        <SelectItem
                          key={skill}
                          value={skill}
                          aria-label={`${t("Select")} ${t(skill)}`}
                        >
                          {t(skill)}
                        </SelectItem>
                      ))}
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
                  onClick={() => handleDeleteEntity(index)}
                  aria-label={`${t("Delete")} ${t(capitalizedSingular)} ${
                    entity.name || `${index + 1}`
                  }`}
                >
                  {/* Display "Trash Icon" on small screens and "Delete" on larger screens */}
                  <span className="inline sm:hidden md:inline lg:hidden">
                    <Trash2 className="inline" />
                  </span>
                  <span className="hidden sm:inline md:hidden lg:inline">
                    <Trash2 className="inline" /> {t("Delete")}
                  </span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <tfoot>
          <TableRow className="border-0 border-t dark:border-zinc-800/50 hover:bg-transparent w-full">
            {/* Reset and Add Entity buttons */}
            <TableCell
              colSpan={Object.keys(entityDefaults[entityType]).length + 1}
              className="pt-6 px-0.5"
            >
              <div className="flex justify-between w-full">
                {/* Reset Entities Data button
                - Hidden when has no entities */}
                {entities.length > 0 ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        aria-label={`${t("Reset")} ${t(capitalizedPlural)}`}
                      >
                        <RefreshCcw />
                        {t("Reset")}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t("AlertDialogTitle")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("AlertDialogDescriptionPrefix")} {t(plural)}{" "}
                          {t("AlertDialogDescriptionSufix")}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleResetEntities}
                          aria-label={`${t("ConfirmReset")}`}
                        >
                          {t("ConfirmReset")}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <span></span> // Keeps layout consistent when hidden
                )}
                {/* Add Entity button */}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddEntity}
                  aria-label={`${t("Add")} ${t(capitalizedSingular)}`}
                >
                  <Plus className="inline" /> {t(capitalizedSingular)}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </section>
  );
}
