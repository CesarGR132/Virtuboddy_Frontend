import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TranscriptionDisplayProps {
  transcription: string;
}

export const TranscriptionDisplay = ({ transcription }: TranscriptionDisplayProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
    toast({
      title: "Copied to clipboard",
      description: "The transcription has been copied to your clipboard",
    });
  };

  const downloadTranscription = () => {
    const blob = new Blob([transcription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Download started",
      description: "Your transcription file is being downloaded",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Transcription</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            disabled={!transcription}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadTranscription}
            disabled={!transcription}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      <Textarea
        value={transcription}
        placeholder="Your transcription will appear here..."
        className="min-h-[200px]"
        readOnly
      />
    </div>
  );
};