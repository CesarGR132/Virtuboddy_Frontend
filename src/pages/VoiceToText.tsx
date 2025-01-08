import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { RecordingButton } from "@/components/voice/RecordingButton";
import { TranscriptionDisplay } from "@/components/voice/TranscriptionDisplay";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

const VoiceToText = () => {
<<<<<<< HEAD
  const [isBrowserSupported, setIsBrowserSupported] = useState(false);
  const [validator, setValidator] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const { toast } = useToast();
  const recordingStatus = document.getElementById('recording-status');
  const recordingStatusRef = useRef(null);
  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isSupported = () => {
    if (!speechRecognition) {
      setIsBrowserSupported(false);
      recordingStatusRef.current.textContent = 'Speech recognition is not supported in your browser';
      return false;
    } else {
      setIsBrowserSupported(true);
      return true;
    }
  }

  useEffect(() => {
    const initialize = () => {
      if (isSupported()) {
        if (recordingStatusRef.current) {
          recordingStatusRef.current.textContent = 'Click to start recording';
        }
      } else {
        if (recordingStatusRef.current) {
          recordingStatusRef.current.textContent = 'Speech recognition is not supported in your browser';
          alert('Speech recognition is not supported in your browser');
        }
        toast({
          title: "Browser not supported",
          description: "Speech recognition is not supported in your browser",
        });
      }
    };

    // Call the initialize function
    initialize();
  }, [isSupported, toast]);

  

  const toggleRecording = () => {
    const recognition = new speechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsRecording(true);
    }

    recognition.onend = () => {
      setIsRecording(false);
    }

    recognition.onresult = (event) => {
      setTranscription(event.results[0][0].transcript);
    }

    recognition.onerror = (event) => {
      console.log(event.error);
    }
=======
  const {
    isRecording,
    transcription,
    startRecording,
    stopRecording,
    isBrowserSupported
  } = useSpeechRecognition();
>>>>>>> e07ea4f9f12ac3c3cb22e906645f180eefef52d1

  const handleToggleRecording = () => {
    if (isRecording) {
<<<<<<< HEAD
      recognition.stop();
    } else {
      recognition.start();
=======
      stopRecording();
    } else {
      startRecording();
>>>>>>> e07ea4f9f12ac3c3cb22e906645f180eefef52d1
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