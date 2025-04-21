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

// UI Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
import { EntityType, EntitiesListProps } from "@/app/types/entityTypes";

// Utility Functions
import { formatEntity, updateNumberOfEntities } from "@/app/utils/entityUtils";

// Components
import EntityImport from "@/app/components/entities-list/EntityImport";
import EntityTable from "@/app/components/entities-list/EntityTable";

/**
 * EntitiesList Component
 * @param entityType - The type of entity to manage
 * @param entities - The list of entities to display
 * @param setEntities - Function to update the list of entities
 */
export default function EntitiesList<T extends EntityType>({
  entityType,
  entities,
  setEntities,
}: EntitiesListProps<T>) {
  // Format the entity type for display
  const { plural, capitalizedPlural } = formatEntity(entityType);

  // Updates the list of Entities when the dropdown value changes.
  const handleUpdateNumberOfEntities = (newLength: number) =>
    setEntities((prev) => updateNumberOfEntities(prev, newLength, entityType));

  /**
   * Renders the EntitiesList component.
   */
  return (
    <section
      id={`${capitalizedPlural}-list-title`}
      aria-labelledby={`${capitalizedPlural}-list-title`}
      className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <header className="p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h3
              id={`${capitalizedPlural}-list-title`}
              className="font-semibold leading-none tracking-tight text-lg"
            >
              {capitalizedPlural}
            </h3>

            {/* Dropdown to select the number of Entities */}
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
          </div>

          <EntityImport entityType={entityType} setEntities={setEntities} />
        </div>
      </header>

      {/* Renders Entities Table section */}
      <EntityTable
        entityType={entityType}
        entities={entities}
        setEntities={setEntities}
      />
    </section>
  );
}
