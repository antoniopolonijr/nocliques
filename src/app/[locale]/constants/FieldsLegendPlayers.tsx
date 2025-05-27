/*
 * FieldsLegendPlayers.tsx
 * Displays a Popover with explanations of fields used for Players (Name, Position, Skill)
 */

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  positionLegend,
  skillLegend,
} from "@/app/[locale]/constants/abbreviations";

// Constants
import { entityDefaults } from "@/app/[locale]/constants/entityDefaults";

// Translations
import { useTranslations } from "next-intl";

/**
 * FieldsLegendPlayers component
 * Displays a Popover with explanations of fields used for Players (Name, Position, Skill)
 */
export default function FieldsLegendPlayers() {
  // Translations
  const t = useTranslations("FieldsLegendPlayers");

  return (
    <Popover>
      <PopoverTrigger className="text-sm font-medium underline cursor-pointer text-zinc-600 dark:text-zinc-300">
        {t("ClickHere")}
      </PopoverTrigger>

      <PopoverContent className="text-sm text-zinc-500 dark:text-zinc-400 text-start">
        {/* Fields Summary */}
        <h4 className="font-medium text-zinc-600 dark:text-zinc-300">
          {t("Fields")}
        </h4>
        {Object.entries(entityDefaults.Players).map(
          ([fields], index, array) => (
            <span key={fields} className="font-semibold">
              {t(fields.charAt(0).toUpperCase() + fields.slice(1))}
              {index < array.length - 1 && ", "}
            </span>
          )
        )}

        {/* Position Abbreviations */}
        <div className="mt-2">
          <h4 className="font-medium text-zinc-600 dark:text-zinc-300">
            {t("Position")}
          </h4>
          <ul>
            {Object.entries(positionLegend).map(([abbr, full]) => (
              <li key={abbr}>
                <span className="font-semibold">{t(abbr)}</span> ={" "}
                {full === entityDefaults.Players.position
                  ? `${t(full)} ${t("default")}`
                  : t(full)}
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Abbreviations */}
        <div className="mt-2">
          <h4 className="font-medium text-zinc-600 dark:text-zinc-300">
            {t("Skill")}
          </h4>
          <ul>
            {Object.entries(skillLegend).map(([abbr, full]) => (
              <li key={abbr}>
                <span className="font-semibold">{t(abbr)}</span> ={" "}
                {full === entityDefaults.Players.skill
                  ? `${t(full)} ${t("default")}`
                  : t(full)}
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
