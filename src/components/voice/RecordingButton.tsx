import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";

interface RecordingButtonProps {
  isRecording: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const RecordingButton = ({ isRecording, onToggle, disabled }: RecordingButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className={`absolute -inset-1 rounded-full ${isRecording ? 'animate-pulse bg-red-500/20' : ''}`} />
        <Button
          size="lg"
          className="relative rounded-full h-16 w-16"
          onClick={onToggle}
          disabled={disabled}
        >
          {isRecording ? (
            <StopCircle className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        {isRecording ? "Recording... Click to stop" : "Click to start recording"}
      </p>
    </div>
  );
};