import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, StopCircle, Copy, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const VoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const { toast } = useToast();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording 
        ? "Your voice recording has been stopped" 
        : "Speak clearly into your microphone",
    });
  };

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
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Voice to Text</h1>
          </div>
          <div className="grid gap-6">
            <Card className="p-6">
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative">
                  <div className={`absolute -inset-1 rounded-full ${isRecording ? 'animate-pulse bg-red-500/20' : ''}`} />
                  <Button
                    size="lg"
                    className="relative rounded-full h-16 w-16"
                    onClick={toggleRecording}
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
            </Card>
            <Card className="p-6">
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
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Your transcription will appear here..."
                className="min-h-[200px]"
                readOnly
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VoiceToText;