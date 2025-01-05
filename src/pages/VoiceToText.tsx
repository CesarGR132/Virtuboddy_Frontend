import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, StopCircle, Copy, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { startAudioRecording, stopAudioRecording } from "@/services/audioRecorder";
import type { SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../types/speech-recognition';

const VoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const { toast } = useToast();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const { isSupported, createRecognition } = useSpeechRecognition();

  const startRecording = async () => {
    try {
      const { recorder, stream } = await startAudioRecording();
      setMediaRecorder(recorder);

      const recognition = createRecognition();
      if (!recognition) return;

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        recognition.start();
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        setTranscription(prevTranscription => prevTranscription + finalTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Error de reconocimiento:", event.error);
        toast({
          title: "Error",
          description: "No se pudo transcribir el audio. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      };

      recorder.start();
      setIsRecording(true);
      toast({
        title: "Grabación iniciada",
        description: "Habla claramente al micrófono",
      });
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al iniciar la grabación",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      stopAudioRecording(mediaRecorder, mediaRecorder.stream);
      setIsRecording(false);
      toast({
        title: "Grabación detenida",
        description: "Procesando el audio...",
      });
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
    toast({
      title: "Copiado",
      description: "La transcripción se ha copiado al portapapeles",
    });
  };

  const downloadTranscription = () => {
    const blob = new Blob([transcription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcripcion.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Descarga iniciada",
      description: "Tu archivo de transcripción se está descargando",
    });
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Voz a Texto</h1>
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
                    disabled={!isSupported}
                  >
                    {isRecording ? (
                      <StopCircle className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isRecording ? "Grabando... Haz clic para detener" : "Haz clic para empezar a grabar"}
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Transcripción</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!transcription}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadTranscription}
                    disabled={!transcription}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
              <Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Tu transcripción aparecerá aquí..."
                className="min-h-[200px]"
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VoiceToText;