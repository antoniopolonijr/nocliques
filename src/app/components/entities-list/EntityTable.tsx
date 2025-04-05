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

// Types
import {
  EntityType,
  EntityMap,
  Player,
  EntityTableProps,
} from "@/app/types/entityTypes";

// Constants
import {
  entityDefaults,
  playerPositions,
  playerSkills,
} from "@/app/constants/entityDefaults";

// Utility Functions
import {
  formatEntity,
  getAbbreviation,
  deleteEntity,
  addEntity,
  updateEntity,
  resetEntities,
} from "@/app/utils/entityUtils";

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

  const handleResetEntities = () =>
    setEntities((prev) => resetEntities(prev, entityType));

  /**
   * Render the EntityTable Component
   */
  return (
    <section
      aria-label={`${capitalizedPlural} Table Section`}
      className="flex flex-col gap-4 p-4 sm:p-6 pt-0 sm:pt-0"
    >
      <p
        id={`${plural}-table-instructions`}
        className="text-sm text-zinc-500 dark:text-zinc-400"
      >
        Select the number of {plural}, then fill in each {singular}'s fields.
        You can also import a list of {plural}.
      </p>
      <Table aria-describedby={`${plural}-table-instructions`}>
        <TableHeader>
          <TableRow>
            {/* Table headers for each entity field */}
            {Object.keys(entityDefaults[entityType]).map((key) => (
              <TableHead key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TableHead>
            ))}

            {/* Actions header */}
            <TableHead className="text-right">{/* Actions */}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Rows for each entity */}
          {entities.map((entity, index) => (
            <TableRow key={index} className="w-full">
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
                  aria-label={`${
                    entity.name || `${capitalizedSingular} ${index + 1}`
                  } Name`}
                  placeholder={`${capitalizedSingular} ${index + 1}`}
                  id={`${singular}-${index + 1}-name`} // Unique ID for each entity field
                  name={`${singular}-${index + 1}-name`} // Unique name for each entity field
                  required
                />
              </TableCell>

              {/* Select dropdown for Entity Position */}
              {/* Only displayed for Players */}
              {entityType === "Players" && (
                <TableCell className="px-0.5">
                  <Select
                    required
                    name={`${singular}-${index + 1}-position`} // Unique name for each entity field
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
                      id={`${singular}-${index + 1}-position`} // Unique ID for each entity field
                      aria-label={`${
                        entity.name || `${capitalizedSingular} ${index + 1}`
                      } Position`}
                    >
                      <SelectValue placeholder="Position">
                        {/* Display the position abbreviation (e.g., "GK" for "Goalkeeper") on small screens */}
                        <abbr
                          title={(entity as Player).position}
                          className="sm:hidden md:inline lg:hidden no-underline"
                        >
                          {getAbbreviation((entity as Player).position)}
                        </abbr>
                        <span className="hidden sm:inline md:hidden lg:inline">
                          {(entity as Player).position}
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {/* Generate selectable positions dynamically */}
                      {playerPositions.map((position) => (
                        <SelectItem
                          key={position}
                          value={position}
                          aria-label={`Select ${position} position`}
                        >
                          {position}
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
                    required
                    name={`${singular}-${index + 1}-skill`} // Unique name for each entity field
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
                      id={`${singular}-${index + 1}-skill`} // Unique ID for each entity field
                      aria-label={`${
                        entity.name || `${capitalizedSingular} ${index + 1}`
                      } Skill`}
                    >
                      <SelectValue placeholder="Skill">
                        {/* Display the skill abbreviation (e.g., "H" for "High") on small screens */}
                        <abbr
                          title={(entity as Player).skill}
                          className="sm:hidden md:inline lg:hidden no-underline"
                        >
                          {getAbbreviation((entity as Player).skill)}
                        </abbr>
                        <span className="hidden sm:inline md:hidden lg:inline">
                          {(entity as Player).skill}
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {/* Generate selectable skill levels dynamically */}
                      {playerSkills.map((skill) => (
                        <SelectItem
                          key={skill}
                          value={skill}
                          aria-label={`Select ${skill} skill`}
                        >
                          {skill}
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
                  aria-label={`Delete ${capitalizedSingular} ${
                    entity.name || `${index + 1}`
                  }`}
                >
                  {/* Display "Delete" on small screens and "X" on larger screens */}
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
            {/* Reset and Add Entity buttons */}
            <TableCell
              colSpan={Object.keys(entityDefaults[entityType]).length + 1}
              className="pt-6 px-0.5"
            >
              <div className="flex justify-between w-full">
                {/* Reset Entities Data button
                - Hidden when has no entities */}
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
                  variant="secondary"
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
  );
}
