"use client";

import { useCallback, useEffect, useRef } from 'react';

export const useSoundEffects = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize context on first user interaction to comply with autoplay policies
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };

    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  const playThemeClick = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    // High-tech UI "Beep"
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Quick frequency envelope
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    // Quick volume envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }, []);

  const playKeystroke = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    // Subtle mechanical keyboard "clack"
    const duration = 0.03;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; 
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1000;
    bandpass.Q.value = 1;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);
    noise.start(ctx.currentTime);
  }, []);

  const playEnterKey = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    // Heavier mechanical "thunk"
    const duration = 0.05;
    
    // Noise component
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; 
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 800;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    // Thump component
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + duration);
    
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.3, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noise.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start(ctx.currentTime);
    osc.start(ctx.currentTime);
    
    osc.stop(ctx.currentTime + duration);
  }, []);

  return { playThemeClick, playKeystroke, playEnterKey };
};
