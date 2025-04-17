/**
 * Constants for abbreviations and normalization maps.
 */

// Importing necessary types
import { Player } from "@/app/types/entityTypes";

/**
 * abbreviations mapping and getAbbreviation function
 */
export const abbreviations: Record<string, string> = {
  // Positions
  Goalkeeper: "GK",
  Defender: "DF",
  Midfielder: "MF",
  Forward: "FW",

  // Skills
  Low: "L",
  Medium: "M",
  High: "H",
};

/**
 * Normalization Maps
 * Maps possible input variations (including abbreviations) to their normalized forms.
 */
export const normalizationMaps = {
  position: {
    any: "Any",
    goalkeeper: "Goalkeeper",
    gk: "Goalkeeper",
    defender: "Defender",
    df: "Defender",
    midfielder: "Midfielder",
    mf: "Midfielder",
    forward: "Forward",
    fw: "Forward",
  } as Record<string, Player["position"]>,
  skill: {
    low: "Low",
    l: "Low",
    medium: "Medium",
    m: "Medium",
    high: "High",
    h: "High",
  } as Record<string, Player["skill"]>,
};
