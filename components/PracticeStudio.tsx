
import React, { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, RefreshCw, Play, Pause, AlertCircle, CheckCircle2, Maximize2, Sparkles, X, Activity } from 'lucide-react';
import * as api from '../lib/api';

declare var Pose: any;
declare var Camera: any;
declare var drawConnectors: any;
declare var drawLandmarks: any;
declare var POSE_CONNECTIONS: any;

export const PracticeStudio: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const poseRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    // Inicializar MediaPipe Pose
    if (typeof Pose !== 'undefined') {
      const pose = new Pose({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      pose.onResults(onResults);
      poseRef.current = pose;
    }

    return () => {
      if (cameraRef.current) cameraRef.current.stop();
    };
  }, []);

  const onResults = (results: any) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Dibujar la imagen del video si queremos (opcional, aquí solo el esqueleto)
    // canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
        { color: '#2dd4bf', lineWidth: 4 });
      drawLandmarks(canvasCtx, results.poseLandmarks,
        { color: '#ffffff', lineWidth: 2, radius: 3 });
    }
    canvasCtx.restore();
  };

  const startCamera = async () => {
    if (!videoRef.current || !poseRef.current) return;

    try {
      const camera = new (window as any).Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await poseRef.current.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480
      });
      camera.start();
      cameraRef.current = camera;
      setIsCameraActive(true);
      setCameraError(null);
      setError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("No pudimos acceder a tu cámara.");
    }
  };

  const stopCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      setIsCameraActive(false);
    }
    const canvasCtx = canvasRef.current?.getContext('2d');
    canvasCtx?.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
  };

  const handlePostureAnalysis = async () => {
    if (!videoRef.current) return;

    setIsAnalyzing(true);
    setError(null);

    // Capturar frame actual para Gemini
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = videoRef.current.videoWidth;
    tempCanvas.height = videoRef.current.videoHeight;
    const ctx = tempCanvas.getContext('2d');
    ctx?.drawImage(videoRef.current, 0, 0);

    const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.8);
    const base64Data = dataUrl.split(',')[1];

    try {
      const result = await api.analyzePosture(base64Data);
      setFeedback(result.feedback);
    } catch (err) {
      console.error('Error analyzing posture:', err);
      setError(err instanceof Error ? err.message : 'Error al analizar postura');
      setFeedback("El Maestro está meditando. Reintenta en un momento.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-stone-950 text-stone-100 overflow-hidden">
      {/* HUD Header */}
      <div className="p-4 bg-black/40 backdrop-blur-md border-b border-stone-800 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Activity className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-serif text-white">Estudio de Visión TaoFlow</h2>
            <p className="text-[10px] text-teal-500 font-mono tracking-widest uppercase">Motor IA: MediaPipe Pose v1.0</p>
          </div>
        </div>

        <button
          onClick={isCameraActive ? stopCamera : startCamera}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${isCameraActive
            ? 'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white'
            : 'bg-teal-600 text-white hover:bg-teal-500 shadow-xl shadow-teal-600/20'
            }`}
        >
          {isCameraActive ? <X size={18} /> : <CameraIcon size={18} />}
          {isCameraActive ? 'Detener IA' : 'Iniciar Espejo IA'}
        </button>
      </div>

      <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
        {/* Instructor Frame */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518310952931-b1de32eac88e?auto=format&fit=crop&q=80&w=1200"
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
            alt="Instructor"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="z-10 text-center">
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all"
              >
                <Play fill="white" className="text-white ml-1" size={32} />
              </button>
            )}
          </div>

          <div className="absolute bottom-8 left-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">En Vivo: Maestro Li</span>
            </div>
            <p className="font-serif italic text-2xl text-white">Movimiento 1: El Comienzo</p>
          </div>
        </div>

        {/* User IA Frame */}
        <div className="w-full lg:w-[450px] bg-stone-900 border-l border-stone-800 flex flex-col">
          <div className="flex-1 relative bg-stone-950 overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 opacity-50"
              style={{ display: isCameraActive ? 'block' : 'none' }}
            />
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 pointer-events-none"
            />

            {!isCameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-4 text-stone-500">
                  <CameraIcon size={32} />
                </div>
                <h3 className="text-lg font-serif text-white mb-2">Cámara Inactiva</h3>
                <p className="text-stone-500 text-sm">Inicia la IA para ver tu flujo de energía.</p>
              </div>
            )}

            {/* AI HUD OVERLAY */}
            {isCameraActive && (
              <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-teal-400 border border-teal-500/20">
                  BODY_TRACKING: ACTIVE
                </div>
                <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-white/50 border border-white/10">
                  60 FPS
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-stone-900 border-t border-stone-800">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">Corrección en Tiempo Real</h4>
              {isCameraActive && (
                <button
                  onClick={handlePostureAnalysis}
                  disabled={isAnalyzing}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-full transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isAnalyzing ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  Analizar Postura
                </button>
              )}
            </div>

            {feedback ? (
              <div className="bg-teal-950/20 border border-teal-500/30 p-4 rounded-2xl animate-in slide-in-from-bottom-2">
                <p className="text-stone-200 italic font-serif leading-relaxed">"{feedback}"</p>
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-stone-800 rounded-2xl">
                <p className="text-stone-500 text-sm italic">Esperando que inicies tu movimiento...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
