import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { RecordingButton } from "@/components/voice/RecordingButton";
import { TranscriptionDisplay } from "@/components/voice/TranscriptionDisplay";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

const VoiceToText = () => {
  const {
    isRecording,
    transcription,
    startRecording,
    stopRecording,
    isBrowserSupported
  } = useSpeechRecognition();

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
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
              <RecordingButton
                isRecording={isRecording}
                onToggle={handleToggleRecording}
                disabled={!isBrowserSupported}
              />
            </Card>
            <Card className="p-6">
              <TranscriptionDisplay transcription={transcription} />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VoiceToText;