import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const askForMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (error) {
      toast({
        title: "Microphone permission denied",
        description: "Please allow microphone access to use speech recognition",
      });
      return false;
    }
  };

  const startRecording =  useCallback(async () => {
    if (!checkBrowserSupport()) return;
    if (!await askForMicrophonePermission()) return;

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

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error('Speech recognition error:', event.error);
      toast({
        title: "Error",
        description: "An error occurred during recording. Please try again.",
        variant: "destructive",
      });
    };

    recognition.start();
  }, [checkBrowserSupport, toast, askForMicrophonePermission]);

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