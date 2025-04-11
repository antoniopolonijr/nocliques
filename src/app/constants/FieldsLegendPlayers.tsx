/*
 * FieldsLegendPlayers.tsx
 * Displays a Popover with explanations of fields used for Players (Name, Position, Skill)
 */

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { positionLegend, skillLegend } from "@/app/constants/abbreviations";

// Constants
import { entityDefaults } from "@/app/constants/entityDefaults";

/**
 * FieldsLegendPlayers component
 * Displays a Popover with explanations of fields used for Players (Name, Position, Skill)
 */
export default function FieldsLegendPlayers() {
  return (
    <Popover>
      <PopoverTrigger className="text-sm font-medium underline cursor-pointer text-zinc-600 dark:text-zinc-300">
        Click here to see the fields
      </PopoverTrigger>

      <PopoverContent className="text-sm text-zinc-500 dark:text-zinc-400 text-start">
        {/* Fields Summary */}
        <h4 className="font-medium text-zinc-600 dark:text-zinc-300">Fields</h4>
        <p className="font-semibold">Name, Position, Skill</p>

        {/* Position Abbreviations */}
        <div className="mt-2">
          <h4 className="font-medium text-zinc-600 dark:text-zinc-300">
            Position
          </h4>
          <ul>
            {Object.entries(positionLegend).map(([abbr, full]) => (
              <li key={abbr}>
                <span className="font-semibold">{abbr}</span> ={" "}
                {full === entityDefaults.Players.position
                  ? `${full} (default)`
                  : full}
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Abbreviations */}
        <div className="mt-2">
          <h4 className="font-medium text-zinc-600 dark:text-zinc-300">
            Skill
          </h4>
          <ul>
            {Object.entries(skillLegend).map(([abbr, full]) => (
              <li key={abbr}>
                <span className="font-semibold">{abbr}</span> ={" "}
                {full === entityDefaults.Players.skill
                  ? `${full} (default)`
                  : full}
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
