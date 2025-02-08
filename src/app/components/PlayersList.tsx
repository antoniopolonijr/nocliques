"use client";

import * as React from "react";
import { useState } from "react";
import { PlayerItem } from "./PlayerItem";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Define the Player type to ensure type safety
interface Player {
  name: string; // Player name
  position: "" | "goalkeeper" | "defender" | "midfielder" | "forward"; // Player position
  skill: "" | "low" | "medium" | "high"; // Player skill level
}

// Initial player state to avoid redundant object creation
const INITIAL_PLAYER_STATE: Player = {
  name: "",
  position: "",
  skill: "",
};
// Default list of players with 14 empty entries
const INITIAL_PLAYERS: Player[] = Array(14).fill(INITIAL_PLAYER_STATE);

export function PlayersList() {
  // State for storing the list of players
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  // State for managing new player input
  const [newPlayer, setNewPlayer] = useState<Player>(INITIAL_PLAYER_STATE);

  /**
   * Updates an existing player's details.
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
   * Updates the new player input fields.
   * @param updatedFields - The fields to update.
   */
  const handleUpdateNewPlayer = (updatedFields: Partial<Player>) => {
    setNewPlayer((prev) => ({ ...prev, ...updatedFields }));
  };

  /**
   * Deletes a player from the list.
   * @param index - The index of the player to remove.
   */
  const handleDelete = (index: number) => {
    setPlayers((prevPlayers) => prevPlayers.filter((_, i) => i !== index));
  };

  /**
   * Adds a new player to the list and resets the input fields.
   */
  const handleAddPlayer = () => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    setNewPlayer(INITIAL_PLAYER_STATE);
  };

  /**
   * Updates the list of players when the dropdown value changes.
   * @param newLength - The new number of players selected.
   * @param setPlayers - The state setter function to update the players array.
   */
  const handleUpdateNumberOfPlayers = (
    newLength: number,
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
  ): void => {
    setPlayers((prevPlayers) => {
      // Create a shallow copy of the previous players array to maintain immutability
      const updatedPlayers = [...prevPlayers];

      if (newLength > updatedPlayers.length) {
        // Add new player objects if the selected number is greater than the current count
        for (let i = updatedPlayers.length; i < newLength; i++) {
          updatedPlayers.push({ name: "", position: "", skill: "" });
        }
      } else {
        // Trim the array if the selected number is smaller
        updatedPlayers.length = newLength;
      }

      return updatedPlayers;
    });
  };

  return (
    <section
      aria-labelledby="players-list-title"
      className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <header className="flex flex-col gap-3 p-6">
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
              name="numberOfPlayers"
              value={players.length.toString()}
              onValueChange={(value) =>
                handleUpdateNumberOfPlayers(parseInt(value, 10), setPlayers)
              }
            >
              <SelectTrigger
                className="w-16"
                aria-label="Number of Players"
                id="numberOfPlayers"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {/* Generate selectable numbers from 1 to 100 dynamically */}
                {Array.from({ length: 100 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
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
        <ul className="flex flex-col gap-2">
          {players.map((player, index) => (
            <PlayerItem
              wrapper="li"
              key={index}
              displayNumber={index + 1}
              {...player}
              onDelete={() => handleDelete(index)}
              onUpdate={(updatedFields) =>
                handleUpdatePlayer(index, updatedFields)
              }
            />
          ))}
        </ul>
      </div>

      <footer className="flex gap-1 items-center w-full p-6 pt-0">
        {/* Input fields for adding a new player */}
        <PlayerItem
          wrapper="div"
          {...newPlayer}
          onUpdate={handleUpdateNewPlayer}
          onAdd={handleAddPlayer}
        />
      </footer>
    </section>
  );
}
