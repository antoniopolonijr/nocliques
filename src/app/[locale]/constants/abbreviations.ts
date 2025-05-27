/**
 * Constants for abbreviations and normalization maps.
 */

// Types
import { Player } from "@/app/[locale]/types/entityTypes";

/**
 * Abbreviations for positions
 */
export const positionAbbreviations: Record<Player["position"], string> = {
  Goalkeeper: "GK",
  Defender: "DF",
  "Defensive Midfielder": "DM",
  "Attacking Midfielder": "AM",
  Forward: "FW",
  Any: "ANY",
};

/**
 * Abbreviations for skill levels
 */
export const skillAbbreviations: Record<Player["skill"], string> = {
  Low: "L",
  Medium: "M",
  High: "H",
};

/**
 * Unified abbreviations object
 */
export const abbreviations = {
  positions: positionAbbreviations,
  skills: skillAbbreviations,
};

/**
 * Reverses a map: Abbreviation ➜ Full Name
 * (Useful for legends or tooltips)
 */
export const reverseMap = (
  input: Record<string, string>
): Record<string, string> =>
  Object.entries(input).reduce((acc, [full, short]) => {
    acc[short] = full;
    return acc;
  }, {} as Record<string, string>);

/**
 * Abbreviations for positions
 * Reverse mapping for displaying full names in the legend
 */
export const positionLegend: Record<string, string> = reverseMap(
  abbreviations.positions
);
export const skillLegend: Record<string, string> = reverseMap(
  abbreviations.skills
);

/**
 * Normalization Maps
 * Maps possible input variations (including abbreviations) to their normalized forms.
 */
export const normalizationMaps = {
  position: {
    any: "Any",
    qualquer: "Any",
    goalkeeper: "Goalkeeper",
    goleiro: "Goalkeeper",
    gk: "Goalkeeper",
    gl: "Goalkeeper",
    defender: "Defender",
    zagueiro: "Defender",
    df: "Defender",
    zg: "Defender",
    "defensive midfielder": "Defensive Midfielder",
    volante: "Defensive Midfielder",
    dm: "Defensive Midfielder",
    vl: "Defensive Midfielder",
    "attacking midfielder": "Attacking Midfielder",
    "meia atacante": "Attacking Midfielder",
    am: "Attacking Midfielder",
    ma: "Attacking Midfielder",
    forward: "Forward",
    atacante: "Forward",
    fw: "Forward",
    at: "Forward",
  } as Record<string, Player["position"]>,
  skill: {
    low: "Low",
    baixa: "Low",
    l: "Low",
    b: "Low",
    medium: "Medium",
    média: "Medium",
    m: "Medium",
    high: "High",
    alta: "High",
    h: "High",
    a: "High",
  } as Record<string, Player["skill"]>,
};
