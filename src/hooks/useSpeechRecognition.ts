import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useSpeechRecognition = () => {
  const { toast } = useToast();
  const [isSupported, setIsSupported] = useState(false);

  const checkBrowserSupport = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: "Error",
        description: "El reconocimiento de voz no está soportado en este navegador. Por favor, utiliza Chrome o Edge.",
        variant: "destructive",
      });
      setIsSupported(false);
      return null;
    }
    setIsSupported(true);
    return new SpeechRecognition();
  };

  const createRecognition = () => {
    const recognition = checkBrowserSupport();
    if (!recognition) return null;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'es-ES'; // Set Spanish as the default language

    return recognition;
  };

  return {
    isSupported,
    createRecognition,
  };
};