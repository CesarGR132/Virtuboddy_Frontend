import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Extend Window interface to include SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const { toast } = useToast();
  
  const checkBrowserSupport = useCallback(() => {
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!speechRecognition) {
      toast({
        title: "Browser not supported",
        description: "Speech recognition is not supported in your browser",
      });
      return false;
    }
    return true;
  }, [toast]);

  const startRecording = useCallback(() => {
    if (!checkBrowserSupport()) return;

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsRecording(true);
      console.log('Recording started');
    };

    recognition.onend = () => {
      setIsRecording(false);
      console.log('Recording ended');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setTranscription(transcript);
      console.log('Transcription:', transcript);
    };

    recognition.onerror = (event: Event) => {
      console.error('Speech recognition error:', event);
      toast({
        title: "Error",
        description: "An error occurred during recording. Please try again.",
        variant: "destructive",
      });
    };

    recognition.start();
  }, [checkBrowserSupport, toast]);

  const stopRecording = useCallback(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.stop();
    setIsRecording(false);
  }, []);

  return {
    isRecording,
    transcription,
    startRecording,
    stopRecording,
    isBrowserSupported: checkBrowserSupport(),
  };
};