/**
 * EntitiesList Component
 *
 * This reusable component manages a dynamic list of entities (e.g., Players, Teams).
 *
 * Main responsibilities:
 * - Displays a header with entity title and quantity selector.
 * - Supports importing entities.
 * - Renders an editable table of entities.
 * - Ensures accessibility via proper ARIA attributes.
 *
 * Built with TypeScript, Next.js, and ShadCN UI principles.
 */

/**
 * -------- Dependencies --------
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
import {
  EntityType,
  EntitiesListProps,
} from "@/app/[locale]/types/entityTypes";

// Utility Functions
import {
  formatEntity,
  updateNumberOfEntities,
} from "@/app/[locale]/utils/entityUtils";

// Subcomponents
import EntityImport from "@/app/[locale]/components/entities-list/EntityImport";
import EntityTable from "@/app/[locale]/components/entities-list/EntityTable";

// Translations
import { useTranslations } from "next-intl";

/**
 * -------- EntitiesList Component --------
 * @param entityType - The type of entity to manage
 * @param entities - The list of entities to display
 * @param setEntities - Function to update the list of entities
 */
export default function EntitiesList<T extends EntityType>({
  entityType,
  entities,
  setEntities,
}: EntitiesListProps<T>) {
  /**
   * Translations
   */
  const t = useTranslations("EntitiesList");

  /**
   * Format entity type for consistent singular/plural labels.
   * Example: "player" -> { plural: "players", capitalizedPlural: "Players" }
   */
  const { plural, capitalizedPlural } = formatEntity(entityType);

  /**
   * Handle updates to the number of entities selected in the dropdown.
   * Dynamically adjusts the list by adding or removing entities.
   *
   * @param newLength - Desired number of entities
   */
  const handleUpdateNumberOfEntities = (newLength: number) => {
    setEntities((prevEntities) =>
      updateNumberOfEntities(prevEntities, newLength, entityType)
    );
  };

  /**
   * -------- Render --------
   */
  return (
    <section
      id={`${t(plural)}-list`}
      aria-labelledby={`${t(plural)}-list-title`}
      className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      {/* Section Header */}
      <header className="p-4 sm:p-6">
        <div className="flex justify-between items-center">
          {/* Title and Quantity Selector Group */}
          <div className="flex items-center gap-2">
            {/* Accessible heading for screen readers */}
            <h3
              id={`${t(plural)}-list-title`}
              className="text-lg font-semibold leading-none tracking-tight"
            >
              {t(capitalizedPlural)}
            </h3>

            {/* Dropdown to select how many entities to manage */}
            <label htmlFor={`number-of-${t(plural)}`} className="sr-only">
              {t("selectNumberOf")} {t(capitalizedPlural)}
            </label>
            <Select
              name={`number-of-${t(plural)}`}
              value={entities.length.toString()}
              onValueChange={(value) =>
                handleUpdateNumberOfEntities(parseInt(value, 10))
              }
            >
              <SelectTrigger id={`number-of-${t(plural)}`}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {/* Dynamically generate options from 1 to 100 */}
                {Array.from({ length: 100 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Import Entities Button */}
          <EntityImport entityType={entityType} setEntities={setEntities} />
        </div>
      </header>

      {/* Section Table */}
      <EntityTable
        entityType={entityType}
        entities={entities}
        setEntities={setEntities}
      />
    </section>
  );
}
