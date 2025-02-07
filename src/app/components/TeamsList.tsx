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

export function TeamsList() {
  return (
    <section
      aria-labelledby="teams-list-title"
      className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <header className="flex flex-col gap-3 p-6">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <h3
              id="teams-list-title"
              className="font-semibold leading-none tracking-tight"
            >
              Teams
            </h3>
            <Select name="numberOfTeams" defaultValue="2">
              <SelectTrigger
                className="w-16"
                aria-label="Number of Teams"
                id="numberOfTeams"
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
          <Button aria-label="Import Teams" type="button" variant="secondary">
            Import Teams
          </Button>
        </div>
        {/* This div is hidden intentionally to be shown later when Import Teams button is clicked */}
        <div className="hidden flex flex-col gap-2">
          <Label className="text-sm text-gray-600" htmlFor="import-teams">
            Insert or paste a list of teams. One team per line.
          </Label>
          <Textarea placeholder="e.g., Brazil" rows={7} id="import-teams" />
          <div className="flex flex-row gap-2 items-center justify-between">
            <Button
              type="button"
              aria-label="Cancel Import Teams"
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="button" aria-label="Confirm Import Teams">
              Confirm Import
            </Button>
          </div>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Choose the number of teams, then enter each team's name. Optionally,
          import a list of teams.
        </p>
      </header>
      <div className="flex flex-col gap-4 p-6 pt-0">
        <ul className="flex flex-col gap-1">
          <li className="flex flex-row gap-1 items-center">
            <div className="w-8 text-center p-1">1</div>

            <Input
              className="flex-1"
              type="text"
              placeholder="Team 1"
              defaultValue="Team 1"
              aria-label="Team Name 1"
              name="teamName1"
              id="teamName1"
              required
            />

            <Button
              variant="destructive"
              aria-label="Delete Team"
              type="button"
            >
              Delete
            </Button>
          </li>
          <li className="flex flex-row gap-1 items-center">
            <div className="w-8 text-center p-1">2</div>

            <Input
              className="flex-1"
              type="text"
              placeholder="Team 2"
              defaultValue="Team 2"
              aria-label="Team Name 2"
              name="teamName2"
              id="teamName2"
              required
            />

            <Button
              variant="destructive"
              aria-label="Delete Team"
              type="button"
            >
              Delete
            </Button>
          </li>
        </ul>
      </div>
      <footer className="flex items-center p-6 pt-0">
        <div className="flex flex-row gap-1 items-center w-full">
          <Input
            className="flex-1"
            type="text"
            placeholder="Team Name"
            aria-label="Team Name"
            name="teamName"
            id="teamName"
            required
          />

          <Button variant="default" aria-label="Add Team" type="button">
            Add Team
          </Button>
        </div>
      </footer>
    </section>
  );
}
