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

import { PlayerInputList } from "./PlayerInputList";
import { TeamInputList } from "./TeamInputList";

export function TeamGeneratorInputCard() {
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
          <PlayerInputList />
          <TeamInputList />
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
