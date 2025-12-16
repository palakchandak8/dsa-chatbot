import { explanationLevels, ExplanationLevel } from "@/data/dsaTopics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LevelSelectorProps {
  currentLevel: ExplanationLevel;
  onLevelChange: (level: ExplanationLevel) => void;
}

export function LevelSelector({ currentLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-lg">
      {explanationLevels.map((level) => (
        <Button
          key={level.id}
          variant={currentLevel === level.id ? "levelActive" : "level"}
          size="sm"
          onClick={() => onLevelChange(level.id)}
          className={cn(
            "text-xs px-3 py-1 h-7",
            currentLevel === level.id && "shadow-sm"
          )}
          title={level.description}
        >
          {level.label}
        </Button>
      ))}
    </div>
  );
}
