"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

// Define the Player type to ensure type safety
interface Player {
  name: string; // Player's name
  position: "Any" | "Goalkeeper" | "Defender" | "Midfielder" | "Forward"; // Player's position
  skill: "Low" | "Medium" | "High"; // Player's skill level
}

// Function to create a default player object (avoids shared object references)
const createDefaultPlayer = (): Player => ({
  name: "",
  position: "Any",
  skill: "Medium",
});

// Initialize an array with a length of default player objects
const INITIAL_PLAYERS: Player[] = Array.from(
  { length: 16 },
  createDefaultPlayer
);

/**
 * PlayersList component
 * This component alLows users to input and manage a list of players.
 */
export function PlayersList() {
  // State to manage the list of players
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);

  // State to control whether the import section is visible
  const [isImporting, setIsImporting] = useState(false);

  // State to hold the text input for importing players
  const [importText, setImportText] = useState("");

  // Toggles the import section visibility
  const handleImportToggle = () => {
    setIsImporting((prev) => !prev);
  };

  // Updates the import text as the user types
  const handleImportChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setImportText(event.target.value);

  // Mapping for positions: accepts full names and abbreviations (case-insensitive)
  const positionsMap: Record<string, Player["position"]> = {
    any: "Any",
    goalkeeper: "Goalkeeper",
    gk: "Goalkeeper",
    defender: "Defender",
    df: "Defender",
    midfielder: "Midfielder",
    mf: "Midfielder",
    forward: "Forward",
    fw: "Forward",
  };

  // Mapping for skills: accepts full names and abbreviations (case-insensitive)
  const skillsMap: Record<string, Player["skill"]> = {
    low: "Low",
    l: "Low",
    medium: "Medium",
    m: "Medium",
    high: "High",
    h: "High",
  };

  // Parses the imported text and converts it into Player objects
  const parseImportData = (data: string): Player[] => {
    return data
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "") // Remove empty lines
      .map((line) => {
        // Split each non-empty line by comma and trim whitespace
        const [rawName, rawPosition = "Any", rawSkill = "Medium"] = line
          .split(",")
          .map((item) => item.trim());

        // Normalize inputs to lower case for mapping
        const name = rawName || "";
        const normalizedPosition =
          positionsMap[rawPosition.toLowerCase()] || "Any";
        const normalizedSkill = skillsMap[rawSkill.toLowerCase()] || "Medium";

        return {
          name,
          position: normalizedPosition,
          skill: normalizedSkill,
        };
      });
  };

  // Clear the import text
  const handleClearImport = () => {
    setImportText("");
  };

  // Confirms the import process, updates players list, and resets input field
  const handleConfirmImport = () => {
    const newPlayers = parseImportData(importText);
    setPlayers(newPlayers); // Replace existing players with imported ones
    setIsImporting(false);
    setImportText(""); // Clear import text after processing
  };

  /**
   * Update a specific player in the list with new values
   * @param index - The index of the player to update.
   * @param updatedFields - The fields to update.
   */
  const handleUpdatePlayer = (
    index: number,
    updatedFields: Partial<Player>
  ) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) =>
        i === index ? { ...player, ...updatedFields } : player
      )
    );
  };

  /**
   * Deletes a player from the list.
   * @param index - The index of the player to remove.
   */
  const handleDelete = (index: number) => {
    setPlayers((prevPlayers) => prevPlayers.filter((_, i) => i !== index));
  };

  // Adds a new player to the list.
  const handleAddPlayer = () => {
    setPlayers((prevPlayers) => [...prevPlayers, createDefaultPlayer()]);
  };

  // Resets all players to default values
  const handleResetPlayers = (): void => {
    setPlayers((prevPlayers) => prevPlayers.map(() => createDefaultPlayer()));
  };

  /**
   * Updates the list of players when the dropdown value changes.
   * @param newLength - The new number of players selected.
   */
  const handleUpdateNumberOfPlayers = (newLength: number) => {
    setPlayers((prevPlayers) => {
      if (newLength > prevPlayers.length) {
        // Add new player objects if the selected number is greater than the current count
        return [
          ...prevPlayers,
          ...Array.from(
            { length: newLength - prevPlayers.length },
            createDefaultPlayer
          ),
        ];
      }
      // Else trim the array if the selected number is smaller
      return prevPlayers.slice(0, newLength);
    });
  };

  // Maps abbreviations
  const abbreviations: Record<string, string> = {
    // Positions
    Goalkeeper: "GK",
    Defender: "DF",
    Midfielder: "MF",
    Forward: "FW",

    // Skill Levels
    Low: "L",
    Medium: "M",
    High: "H",
  };

  // Function that returns the corresponding abbreviation or the original value if there is no abbreviation
  function getAbbreviation(value: string): string {
    return abbreviations[value] || value;
  }

  return (
    <section
      aria-labelledby="players-list-title"
      className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <header className="flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h3
              id="players-list-title"
              className="font-semibold leading-none tracking-tight"
            >
              Players
            </h3>
            {/* - If isImporting is true, hide the Dropdown */}
            {/* Dropdown to select the number of players */}
            {!isImporting && (
              <Select
                name="number-of-players"
                value={players.length.toString()}
                onValueChange={(value) =>
                  handleUpdateNumberOfPlayers(parseInt(value, 10))
                }
              >
                <SelectTrigger
                  className="w-16"
                  aria-label="Number of Players"
                  id="number-of-players"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {/* Generate selectable numbers from 1 to 100 dynamically */}
                  {Array.from({ length: 100 }, (_, i) => (
                    <SelectItem
                      key={i + 1}
                      value={(i + 1).toString()}
                      aria-label={`Select ${i + 1} players`}
                    >
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          {isImporting ? (
            <Button
              aria-label="Cancel Import Players"
              type="button"
              variant="secondary"
              onClick={handleImportToggle}
            >
              Cancel Import
            </Button>
          ) : (
            <Button
              aria-label="Import Players"
              type="button"
              variant="secondary"
              onClick={handleImportToggle}
            >
              Import Players
            </Button>
          )}
        </div>
      </header>

      {/* 
        Renders either the Import Players or Players Table section based on "isImporting":  
        - true: Shows the import area with textarea and controls.  
        - false: Displays the table for managing players.  
      */}
      {isImporting ? (
        <section
          aria-label="Import Players Section"
          className="flex flex-col gap-6 p-6 pt-0"
        >
          <Label
            className="text-sm text-zinc-500 dark:text-zinc-400 font-normal"
            htmlFor="import-players"
          >
            Insert or paste a list of players. One player per line. Optionally,
            add position and skill level separated by commas. If a position or
            skill level isn't recognized, it will default to{" "}
            <strong>"Any"</strong> for positions and <strong>"Medium"</strong>{" "}
            for skills.
          </Label>
          <Textarea
            placeholder={`Ronaldo\nRonaldo, FORWARD\nRonaldo, Forward, High\nRonaldo, fw, h`}
            rows={6}
            id="import-players"
            name="import-players"
            aria-label="Import Players Textarea"
            value={importText}
            onChange={handleImportChange}
          />
          <div className="flex gap-2 items-center justify-between">
            <Button
              type="button"
              aria-label="Clear Import Text"
              variant="outline"
              onClick={handleClearImport}
            >
              Clear
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default">Import players</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Confirming the import will
                    overwrite your existing list of players.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleConfirmImport}
                    aria-label="Confirm Import Players"
                  >
                    Confirm Import
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>
      ) : (
        <section
          aria-label="Players Table Section"
          className="flex flex-col gap-6 p-6 pt-0"
        >
          <p
            id="players-table-instructions"
            className="text-sm text-zinc-500 dark:text-zinc-400"
          >
            Choose the number of players, then enter each player's name,
            position, and skill level. Optionally, import a list of players.
          </p>
          <Table aria-describedby="players-table-instructions">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Skill</TableHead>
                <TableHead className="text-right">{/* Actions */}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player, index) => (
                <TableRow key={index} className="">
                  {/* Editable input for player name */}
                  <TableCell className="px-0.5">
                    <Input
                      className="truncate"
                      type="text"
                      value={player.name}
                      onChange={(e) =>
                        handleUpdatePlayer(index, { name: e.target.value })
                      }
                      aria-label={`${
                        player.name || `Player ${index + 1}`
                      } Name`}
                      placeholder={`Player ${index + 1}`}
                      id={`player-${index + 1}-name`}
                      name={`player-${index + 1}-name`}
                      required
                    />
                  </TableCell>

                  {/* Select dropdown for player position */}
                  <TableCell className="px-0.5">
                    <Select
                      required
                      name={`player-${index + 1}-position`}
                      value={player.position}
                      onValueChange={(value) =>
                        handleUpdatePlayer(index, {
                          position: value as Player["position"],
                        })
                      }
                    >
                      <SelectTrigger
                        id={`player-${index + 1}-position`}
                        aria-label={`${
                          player.name || `Player ${index + 1}`
                        } Position`}
                      >
                        <SelectValue placeholder="Position">
                          <abbr
                            title={player.position}
                            className="sm:hidden no-underline"
                          >
                            {getAbbreviation(player.position)}
                          </abbr>
                          <span className="hidden sm:inline">
                            {player.position}
                          </span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="Any"
                          aria-label={`Select Any position`}
                        >
                          Any
                        </SelectItem>
                        <SelectItem
                          value="Goalkeeper"
                          aria-label={`Select Goalkeeper position`}
                        >
                          Goalkeeper
                        </SelectItem>
                        <SelectItem
                          value="Defender"
                          aria-label={`Select Defender position`}
                        >
                          Defender
                        </SelectItem>
                        <SelectItem
                          value="Midfielder"
                          aria-label={`Select Midfielder position`}
                        >
                          Midfielder
                        </SelectItem>
                        <SelectItem
                          value="Forward"
                          aria-label={`Select Forward position`}
                        >
                          Forward
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Select dropdown for player skill level */}
                  <TableCell className="px-0.5">
                    <Select
                      required
                      name={`player-${index + 1}-skill`}
                      value={player.skill}
                      onValueChange={(value) =>
                        handleUpdatePlayer(index, {
                          skill: value as Player["skill"],
                        })
                      }
                    >
                      <SelectTrigger
                        id={`player-${index + 1}-skill`}
                        aria-label={`${
                          player.name || `Player ${index + 1}`
                        } Skill`}
                      >
                        <SelectValue placeholder="Skill">
                          <abbr
                            title={player.skill}
                            className="sm:hidden no-underline"
                          >
                            {getAbbreviation(player.skill)}
                          </abbr>
                          <span className="hidden sm:inline">
                            {player.skill}
                          </span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low" aria-label={`Select Low skill`}>
                          Low
                        </SelectItem>
                        <SelectItem
                          value="Medium"
                          aria-label={`Select Medium skill`}
                        >
                          Medium
                        </SelectItem>
                        <SelectItem
                          value="High"
                          aria-label={`Select High skill`}
                        >
                          High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Delete Player button */}
                  <TableCell className="px-0.5 text-right">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleDelete(index)}
                      aria-label={`Delete Player ${
                        player.name || `${index + 1}`
                      }`}
                    >
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
              <TableRow className="border-t border-b-0 hover:bg-transparent">
                {/* Clear Players Data button */}
                <TableCell
                  colSpan={2}
                  className={
                    players.length <= 0 ? "hidden" : "text-left pt-6 px-0.5"
                  }
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetPlayers}
                    aria-label="Reset Players Data"
                  >
                    Reset
                  </Button>
                </TableCell>
                {/* Add Player button */}
                <TableCell
                  colSpan={players.length <= 0 ? 4 : 2}
                  className={`${
                    players.length <= 0 ? `text-center` : `text-right`
                  } pt-6 px-0.5`}
                >
                  <Button
                    type="button"
                    onClick={handleAddPlayer}
                    aria-label="Add Player"
                  >
                    Add Player
                  </Button>
                </TableCell>
              </TableRow>
            </tfoot>
          </Table>
        </section>
      )}
    </section>
  );
}
