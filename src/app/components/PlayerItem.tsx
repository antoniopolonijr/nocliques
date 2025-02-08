import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for the props of the PlayerItem component
interface PlayerItemProps {
  displayNumber?: number; // Optional display number for the player
  name: string; // Player name
  position: "" | "goalkeeper" | "defender" | "midfielder" | "forward"; // Player position
  skill: "" | "low" | "medium" | "high"; // Player skill level
  onDelete?: (displayNumber: number) => void; // Optional delete callback
  onUpdate: (update: Record<string, string>) => void; // Callback to update player data
  wrapper: React.ElementType; // Wrapper component for styling, e.g., div or custom component
  onAdd?: () => void; // Optional add player callback
}

/**
 * PlayerItem component
 *
 * This component represents a single player item with inputs for name, position, and skill.
 * It also includes a delete button if the onDelete function is provided and an add button if the onAdd function is provided.
 */
export const PlayerItem: React.FC<PlayerItemProps> = ({
  displayNumber,
  name,
  position,
  skill,
  onDelete,
  onUpdate,
  wrapper: Wrapper,
  onAdd,
}) => {
  // Handle input change for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    onUpdate({ [name]: value }); // Update specific field based on input name
  };

  // Handle select change for dropdown fields
  const handleSelectChange = (field: string, value: string): void => {
    onUpdate({ [field]: value });
  };

  return (
    <Wrapper className="flex gap-1 items-center w-full">
      {/* Display player number if provided */}
      {displayNumber && (
        <div className="w-8 text-center p-1">{displayNumber}</div>
      )}

      {/* Input for player name */}
      <Input
        className="flex-1"
        type="text"
        placeholder={displayNumber ? `Player ${displayNumber}` : `New Player`}
        aria-label={
          displayNumber ? `Player Name ${displayNumber}` : `New Player Name`
        }
        name="name"
        id={`playerName${displayNumber}`}
        value={name}
        onChange={handleInputChange}
        required
      />

      {/* Select for player position */}
      <Select
        name="position"
        value={position}
        onValueChange={(value) => handleSelectChange("position", value)}
        required
      >
        <SelectTrigger
          className="w-32"
          aria-label={`Player Position ${displayNumber}`}
          id={`playerPosition${displayNumber}`}
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

      {/* Select for player skill */}
      <Select
        name="skill"
        value={skill}
        onValueChange={(value) => handleSelectChange("skill", value)}
        required
      >
        <SelectTrigger
          className="w-24"
          aria-label={`Player Skill ${displayNumber}`}
          id={`playerSkill${displayNumber}`}
        >
          <SelectValue placeholder="Skill" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      {/* Delete button if onDelete function is provided */}
      {onDelete && (
        <Button
          variant="destructive"
          aria-label="Delete Player"
          type="button"
          onClick={() => onDelete(displayNumber!)} // Assert that displayNumber is not undefined for onDelete
        >
          Delete
        </Button>
      )}

      {/* Add Player button if onAdd function is provided */}
      {onAdd && (
        <Button
          onClick={onAdd}
          variant="default"
          aria-label="Add Player"
          type="button"
        >
          Add Player
        </Button>
      )}
    </Wrapper>
  );
};
