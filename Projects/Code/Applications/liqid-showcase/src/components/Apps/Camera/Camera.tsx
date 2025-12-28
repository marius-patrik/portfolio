import { IconCamera as IconCam, IconCapture } from '@tabler/icons-react';
import { Window } from 'liqid';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CameraProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Camera = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      setError('Unable to access camera. Please grant permission.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setPhoto(dataUrl);
      }
    }
  }, []);

  const clearPhoto = useCallback(() => {
    setPhoto(null);
  }, []);

  // Start camera when window opens
  useEffect(() => {
    if (isOpen && !stream) {
      startCamera();
    }
    return () => {
      if (!isOpen && stream) {
        stopCamera();
      }
    };
  }, [isOpen, stream, startCamera, stopCamera]);

  // Reconnect video to stream when returning from photo view
  useEffect(() => {
    if (!photo && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [photo, stream]);

  // Stop camera when window closes
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setPhoto(null);
    }
  }, [isOpen, stopCamera]);

  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconCam size={18} /> Camera
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full flex flex-col gap-2">
        {error ? (
          <div className="flex items-center justify-center h-full">{error}</div>
        ) : photo ? (
          <div className="flex flex-col gap-2 h-full">
            <img
              src={photo}
              alt="Captured"
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="flex gap-2">
              <button
                onClick={clearPhoto}
                className="glass rounded-xl p-1 flex-1"
              >
                Retake
              </button>
              <a
                href={photo}
                download="photo.png"
                className="glass rounded-xl p-1 flex-1 text-center"
              >
                Save
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 h-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg bg-black"
            />
            <button
              onClick={capturePhoto}
              className="glass rounded-xl p-1 flex items-center justify-center gap-2"
            >
              <IconCapture size={20} /> Capture
            </button>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </Window>
  );
};
