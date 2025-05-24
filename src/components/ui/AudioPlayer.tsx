'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className = '' }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Web Audio API refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const startVisualization = useCallback(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      const analyser = analyserRef.current;
      const dataArray = dataArrayRef.current;
      
      if (!canvas || !analyser || !dataArray) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw bars (use first 12 frequency bins)
      const barCount = 12;
      const barWidth = 4;
      const barSpacing = 1;
      
      if (isMuted) {
        // When muted, show static minimal bars
        for (let i = 0; i < barCount; i++) {
          const x = i * (barWidth + barSpacing);
          const y = canvas.height - 2; // Minimal height
          
          ctx.fillStyle = '#9CA3AF'; // gray-400
          ctx.fillRect(x, y, barWidth, 2);
        }
        // Don't continue animation when muted
        return;
      } else {
        // When unmuted, get real frequency data and animate
        analyser.getByteFrequencyData(dataArray);
        
        for (let i = 0; i < barCount && i < dataArray.length; i++) {
          const value = dataArray[i];
          // Better frequency mapping for more responsive visualization
          const barHeight = Math.max(2, (value / 255) * canvas.height * 1.2);
          const x = i * (barWidth + barSpacing);
          const y = canvas.height - barHeight;
          
          ctx.fillStyle = '#FFFFFF'; // white
          ctx.fillRect(x, y, barWidth, barHeight);
        }
        
        // Continue animation only when unmuted
        animationIdRef.current = requestAnimationFrame(draw);
      }
    };
    
    draw();
  }, [isMuted]);

  const stopVisualization = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  };

  // Initialize audio on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to play immediately (will work because it's muted)
    audio.play().catch((error) => {
      console.log('Initial autoplay failed:', error.message);
    });

    // Setup event listeners
    const handleLoadedData = () => {
      console.log('Audio loaded');
      setIsLoaded(true);
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsLoaded(true);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Initialize Web Audio API for visualization
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    try {
      // Create audio context and analyser
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audio);
      
      // Configure analyser
      analyser.fftSize = 128; // Better frequency resolution
      analyser.smoothingTimeConstant = 0.8;
      
      // Connect audio nodes
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      // Store references
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      
      // Start visualization
      startVisualization();
      
      console.log('Web Audio API initialized');
    } catch (error) {
      console.error('Failed to initialize Web Audio API:', error);
    }

    return () => {
      stopVisualization();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [isLoaded, startVisualization]);

  // Restart visualization when mute state changes
  useEffect(() => {
    if (isLoaded && analyserRef.current) {
      stopVisualization();
      startVisualization();
    }
  }, [isMuted, isLoaded, startVisualization]);

  const toggleMute = () => {
    const audio = audioRef.current;
    const audioContext = audioContextRef.current;
    
    if (!audio) return;

    // Resume audio context if suspended (required for user interaction)
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        console.log('Audio context resumed');
      });
    }

    // Toggle mute using native muted property (as recommended in article)
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
    
    console.log('Audio muted:', audio.muted);
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* HTML5 Audio Element - muted for autoplay compliance */}
      <audio
        ref={audioRef}
        src="/music/mw-music.mp3"
        autoPlay
        loop
        muted // Start muted for autoplay compliance
        preload="auto"
      />
      
      {/* Visualizer Button - No hover effects */}
      <button
        onClick={toggleMute}
        className="flex items-center justify-center p-3"
        aria-label={
          !isLoaded 
            ? 'Audio loading...' 
            : isMuted 
              ? 'Unmute background music' 
              : 'Mute background music'
        }
      >
        {/* Canvas for visualization */}
        <canvas
          ref={canvasRef}
          width={60} // 12 bars * (4px width + 1px spacing)
          height={24}
          className="h-6"
        />
      </button>
    </div>
  );
};

export default AudioPlayer; 