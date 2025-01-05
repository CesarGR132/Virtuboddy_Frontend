export const startAudioRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    return { recorder, stream };
  } catch (error) {
    console.error('Error accessing microphone:', error);
    throw new Error('No se pudo acceder al micrófono. Por favor, verifica los permisos.');
  }
};

export const stopAudioRecording = (recorder: MediaRecorder, stream: MediaStream) => {
  recorder.stop();
  stream.getTracks().forEach(track => track.stop());
};