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

// Define the Player type to ensure type safety
interface Player {
  name: string; // Player's name
  position: "any" | "goalkeeper" | "defender" | "midfielder" | "forward"; // Player's position
  skill: "low" | "medium" | "high"; // Player's skill level
}

// Function to create a new player with default values (avoids shared object references)
const createDefaultPlayer = (): Player => ({
  name: "",
  position: "any",
  skill: "medium",
});

// Default list of players
const INITIAL_PLAYERS: Player[] = Array.from(
  { length: 16 },
  createDefaultPlayer
);

export function PlayersList() {
  // State for storing the list of players
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);

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
            {/* Dropdown to select the number of players */}
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
          </div>
          <Button aria-label="Import Players" type="button" variant="secondary">
            Import Players
          </Button>
        </div>
        {/* This div is hidden intentionally to be shown later when Import Players button is clicked */}
        <div className="hidden flex flex-col gap-2">
          <Label className="text-sm text-gray-600" htmlFor="import-players">
            Insert or paste a list of players. One player per line. Optionally,
            add position and skill separated by commas.
          </Label>
          <Textarea
            placeholder="e.g., Ronaldo, Forward, High"
            rows={7}
            id="import-players"
            name="import-players"
          />
          <div className="flex gap-2 items-center justify-between">
            <Button
              type="button"
              aria-label="Cancel Import Players"
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="button" aria-label="Confirm Import Players">
              Confirm Import
            </Button>
          </div>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Choose the number of players, then enter each player's name, position,
          and skill level. Optionally, import a list of players.
        </p>
      </header>

      <div className="flex flex-col gap-4 p-6 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Skill</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                    aria-label={`Player Name ${index + 1}`}
                    placeholder={`Player ${index + 1}`}
                    id={`player-name-${index + 1}`}
                    name={`player-name-${index + 1}`}
                    required
                  />
                </TableCell>

                {/* Select dropdown for player position */}
                <TableCell className="px-0.5">
                  <Select
                    required
                    name={`player-position-${index + 1}`}
                    value={player.position}
                    onValueChange={(value) =>
                      handleUpdatePlayer(index, {
                        position: value as Player["position"],
                      })
                    }
                  >
                    <SelectTrigger
                      id={`player-position-${index + 1}`}
                      aria-label={`Player Position ${index + 1}`}
                    >
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="any"
                        aria-label={`Select Any position`}
                      >
                        Any
                      </SelectItem>
                      <SelectItem
                        value="goalkeeper"
                        aria-label={`Select Goalkeeper position`}
                      >
                        Goalkeeper
                      </SelectItem>
                      <SelectItem
                        value="defender"
                        aria-label={`Select Defender position`}
                      >
                        Defender
                      </SelectItem>
                      <SelectItem
                        value="midfielder"
                        aria-label={`Select Midfielder position`}
                      >
                        Midfielder
                      </SelectItem>
                      <SelectItem
                        value="forward"
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
                    name={`player-skill-${index + 1}`}
                    value={player.skill}
                    onValueChange={(value) =>
                      handleUpdatePlayer(index, {
                        skill: value as Player["skill"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Skill"
                        id={`player-skill-${index + 1}`}
                        aria-label={`Player Skill ${index + 1}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="low"
                        aria-label={`Select Low position`}
                      >
                        Low
                      </SelectItem>
                      <SelectItem
                        value="medium"
                        aria-label={`Select Medium position`}
                      >
                        Medium
                      </SelectItem>
                      <SelectItem
                        value="high"
                        aria-label={`Select High position`}
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
                    aria-label="Delete Player"
                  >
                    Delete
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
                className={
                  players.length <= 0
                    ? "text-center pt-6 px-0.5"
                    : "text-right pt-6 px-0.5"
                }
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
      </div>
    </section>
  );
}
