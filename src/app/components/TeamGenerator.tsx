import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { PlayersList } from "./PlayersList";
import { TeamsList } from "./TeamsList";

export function TeamGenerator() {
  return (
    <section aria-labelledby="team-generator-input-card">
      <Card>
        <CardHeader>
          <CardTitle>Team Generator</CardTitle>
          <CardDescription>
            Input player details and team names.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlayersList />
          <TeamsList />
        </CardContent>
        <CardFooter className="flex flex-row justify-between items-center">
          <Button aria-label="Reset" type="button" variant="outline">
            Reset
          </Button>
          <Button aria-label="Generate Teams" type="submit">
            Generate Teams
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
