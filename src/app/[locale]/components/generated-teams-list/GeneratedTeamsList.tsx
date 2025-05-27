/**
 * GeneratedTeamsList component
 *
 * This component renders the generated teams along with action buttons.
 */

/**
 * Import dependencies
 */

// Types
import { GeneratedTeamsListProps } from "@/app/[locale]/types/entityTypes";

// Abbreviations
import { positionLegend } from "@/app/[locale]/constants/abbreviations";

// Components
import GeneratedTable from "@/app/[locale]/components/generated-teams-list/GeneratedTable";

// Translations
import { useTranslations } from "next-intl";

/**
 * GeneratedTeamsList Component
 *
 * @param {GeneratedTeamsListProps} props - Component props containing `generatedTeams`
 * @returns - Rendered component displaying teams and action buttons
 */
export default function GeneratedTeamsList({
  generatedTeams,
  generatedAt,
}: GeneratedTeamsListProps) {
  // Translations
  const t = useTranslations("GeneratedTeamsList");

  /**
   * Render the GeneratedTeamsList component
   */
  return (
    <section
      aria-labelledby="generated-teams-list-title"
      className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      {/* Header Section */}
      <header className="flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex justify-center items-center">
          <h3
            id="generated-teams-list-title"
            className="font-semibold leading-none tracking-tight text-xl"
          >
            {t("GeneratedTeams")}
          </h3>
        </div>
        {/* Display generation timestamp */}
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 text-center">
          {generatedAt
            ? `${t("timestampPrefix")} ${generatedAt.toLocaleString()}`
            : null}
        </p>
      </header>

      {/* Render Generated Teams Table */}
      <GeneratedTable generatedTeams={generatedTeams} />

      {/* Footer Section with Ledend for Abbreviations */}
      <footer className="p-4 sm:p-6 pt-0 sm:pt-0 text-sm text-zinc-500 dark:text-zinc-400 text-start">
        <h4 className="font-semibold">{t("Legend")}</h4>
        <ul className="flex flex-col">
          <li>{t("LegendSubstitutionOrder")}</li>
          <li className="sm:hidden md:inline lg:hidden">
            {t("LegendPosition")}
          </li>
          {/* Display position legend */}
          {Object.entries(positionLegend).map(([abbr, full]) => (
            <li className="sm:hidden md:inline lg:hidden" key={abbr}>
              {t(abbr)} = {t(full)}
            </li>
          ))}
        </ul>
      </footer>
    </section>
  );
}
