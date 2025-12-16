"use client";

import { useCallback, useEffect, useRef } from "react";

interface SoundRefs {
  hover: HTMLAudioElement | null;
  click: HTMLAudioElement | null;
  eat: HTMLAudioElement | null;
  defeat: HTMLAudioElement | null;
  start: HTMLAudioElement | null;
  hit: HTMLAudioElement | null;
  move: HTMLAudioElement | null;
}

type SoundName = keyof SoundRefs;

const SOUND_PATHS: Record<SoundName, string> = {
  hover: "/sounds/hover.mp3",
  click: "/sounds/click.mp3",
  eat: "/sounds/eat.mp3",
  defeat: "/sounds/defeat.mp3",
  start: "/sounds/start.mp3",
  hit: "/sounds/hit.mp3",
  move: "/sounds/move.mp3",
};

// Global audio cache to prevent multiple instances
const audioCache: Partial<SoundRefs> = {};

export const useSounds = () => {
  const soundsRef = useRef<Partial<SoundRefs>>({});

  useEffect(() => {
    // Preload sounds
    Object.entries(SOUND_PATHS).forEach(([name, path]) => {
      if (!audioCache[name as SoundName]) {
        const audio = new Audio(path);
        audio.preload = "auto";
        audio.volume = 0.3;
        if ((name as SoundName) === "click") {
          audio.volume = 0.04;
        }
        audioCache[name as SoundName] = audio;
      }
      soundsRef.current[name as SoundName] = audioCache[name as SoundName];
    });
  }, []);

  const play = useCallback((name: SoundName) => {
    const audio = soundsRef.current[name];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  const stop = useCallback((name: SoundName) => {
    const audio = soundsRef.current[name];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const playHover = useCallback(() => play("hover"), [play]);
  const stopHover = useCallback(() => stop("hover"), [stop]);
  const playClick = useCallback(() => play("click"), [play]);
  const playEat = useCallback(() => play("eat"), [play]);
  const playDefeat = useCallback(() => play("defeat"), [play]);
  const playStart = useCallback(() => play("start"), [play]);
  const playHit = useCallback(() => play("hit"), [play]);
  const playMove = useCallback(() => play("move"), [play]);

  return {
    play,
    stop,
    playHover,
    stopHover,
    playClick,
    playEat,
    playDefeat,
    playStart,
    playHit,
    playMove,
  };
};

export default useSounds;
