import * as React from "react";

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

export function PlayersList() {
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
            <Select name="numberOfPlayers" defaultValue="3">
              <SelectTrigger
                className="w-16"
                aria-label="Number of Players"
                id="numberOfPlayers"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
        <ul className="flex flex-col gap-1">
          <li className="flex gap-1 items-center">
            <div className="w-8 text-center p-1">1</div>

            <Input
              className="flex-1"
              type="text"
              placeholder="Player 1"
              aria-label="Player Name 1"
              name="playerName1"
              id="playerName1"
              required
            />

            <Select name="playerPosition" required>
              <SelectTrigger
                className="w-32"
                aria-label="Player Position 1"
                id="playerPosition1"
              >
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="defender">Defender</SelectItem>
                <SelectItem value="midfielder">Midfielder</SelectItem>
                <SelectItem value="forward">Forward</SelectItem>
              </SelectContent>
            </Select>
            <Select name="playerSkill1" required>
              <SelectTrigger
                className="w-24"
                aria-label="Player Skill 1"
                id="playerSkill1"
              >
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="destructive"
              aria-label="Delete Player"
              type="button"
            >
              Delete
            </Button>
          </li>
          <li className="flex gap-1 items-center">
            <div className="w-8 text-center p-1">2</div>

            <Input
              className="flex-1"
              type="text"
              placeholder="Player 2"
              aria-label="Player Name 2"
              name="playerName2"
              id="playerName2"
              required
            />

            <Select name="playerPosition2" required>
              <SelectTrigger
                className="w-32"
                aria-label="Player Position 2"
                id="playerPosition2"
              >
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="defender">Defender</SelectItem>
                <SelectItem value="midfielder">Midfielder</SelectItem>
                <SelectItem value="forward">Forward</SelectItem>
              </SelectContent>
            </Select>
            <Select name="playerSkill2" required>
              <SelectTrigger
                className="w-24"
                aria-label="Player Skill 2"
                id="playerSkill2"
              >
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="destructive"
              aria-label="Delete Player"
              type="button"
            >
              Delete
            </Button>
          </li>
          <li className="flex gap-1 items-center">
            <div className="w-8 text-center p-1">3</div>

            <Input
              className="flex-1"
              type="text"
              placeholder="Player 3"
              aria-label="Player Name 3"
              name="playerName3"
              id="playerName3"
              required
            />

            <Select name="playerPosition3" required>
              <SelectTrigger
                className="w-32"
                aria-label="Player Position 3"
                id="playerPosition3"
              >
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="defender">Defender</SelectItem>
                <SelectItem value="midfielder">Midfielder</SelectItem>
                <SelectItem value="forward">Forward</SelectItem>
              </SelectContent>
            </Select>
            <Select name="playerSkill3" required>
              <SelectTrigger
                className="w-24"
                aria-label="Player Skill 3"
                id="playerSkill3"
              >
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="destructive"
              aria-label="Delete Player"
              type="button"
            >
              Delete
            </Button>
          </li>
        </ul>
      </div>
      <footer className="flex items-center p-6 pt-0 ">
        <div className="flex gap-1 items-center w-full">
          <Input
            className="flex-1"
            type="text"
            placeholder="Player Name"
            aria-label="Player Name"
            name="playerName"
            id="playerName"
            required
          />

          <Select name="playerPosition" required>
            <SelectTrigger
              className="w-32"
              aria-label="Player Position"
              id="playerPosition"
            >
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
              <SelectItem value="defender">Defender</SelectItem>
              <SelectItem value="midfielder">Midfielder</SelectItem>
              <SelectItem value="forward">Forward</SelectItem>
            </SelectContent>
          </Select>
          <Select name="playerSkill" required>
            <SelectTrigger
              className="w-24"
              aria-label="Player Skill"
              id="playerSkill"
            >
              <SelectValue placeholder="Skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="default" aria-label="Add Player" type="button">
            Add Player
          </Button>
        </div>
      </footer>
    </section>
  );
}
