"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ValButton } from "../UI";
import { Play, RotateCcw, Zap } from "lucide-react";
import { useSounds } from "@/hooks/useSounds";

interface ReflexTestProps {
  onBack?: () => void;
}

type GameState = "waiting" | "ready" | "too-early" | "clicked" | "result";

const ReflexTest: React.FC<ReflexTestProps> = ({ onBack }) => {
  const { playHit, playDefeat, playStart } = useSounds();
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startRound = useCallback(() => {
    playStart();
    setGameState("ready");
    setReactionTime(null);

    // Random delay between 1-4 seconds
    const delay = Math.random() * 3000 + 1000;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setGameState("clicked");
    }, delay);
  }, [playStart]);

  const handleClick = useCallback(() => {
    if (gameState === "waiting") {
      startRound();
    } else if (gameState === "ready") {
      // Clicked too early!
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      playDefeat();
      setGameState("too-early");
    } else if (gameState === "clicked") {
      const time = Date.now() - startTimeRef.current;
      playHit();
      setReactionTime(time);
      setAttempts((prev) => [...prev, time]);

      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }

      setGameState("result");
    } else if (gameState === "too-early" || gameState === "result") {
      startRound();
    }
  }, [gameState, startRound, bestTime, playHit, playDefeat]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getAverageTime = () => {
    if (attempts.length === 0) return null;
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case "waiting":
        return "bg-[#0F1923]";
      case "ready":
        return "bg-[#FF4655]";
      case "clicked":
        return "bg-[#4ade80]";
      case "too-early":
        return "bg-[#ef4444]";
      case "result":
        return "bg-[#0F1923]";
      default:
        return "bg-[#0F1923]";
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case "waiting":
        return { title: "REFLEX TEST", subtitle: "Click anywhere to start" };
      case "ready":
        return { title: "WAIT...", subtitle: "Wait for green" };
      case "clicked":
        return { title: "CLICK!", subtitle: "Click now!" };
      case "too-early":
        return { title: "TOO EARLY!", subtitle: "Click to try again" };
      case "result":
        return {
          title: `${reactionTime}ms`,
          subtitle:
            reactionTime! < 200
              ? "Lightning fast!"
              : reactionTime! < 300
              ? "Great reflexes!"
              : "Keep practicing!",
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  const message = getMessage();
  const avgTime = getAverageTime();

  return (
    <div className="flex flex-col items-center justify-center outline-none">
      {/* Game Area */}
      <div className="relative p-1 bg-[#ECE8E1]/5 border border-[#ECE8E1]/20 backdrop-blur-sm shadow-2xl">
        <button
          className={`relative flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${getBackgroundColor()}`}
          style={{
            width: "min(65vw, 400px)",
            height: "min(65vw, 400px)",
          }}
          onClick={handleClick}
        >
          {/* Zap icon for ready state */}
          {gameState === "clicked" && (
            <Zap
              size={80}
              className="text-[#0F1923] mb-4 animate-pulse"
              fill="currentColor"
            />
          )}

          <h2
            className={`text-5xl font-header font-bold mb-2 ${
              gameState === "ready" || gameState === "clicked"
                ? "text-white"
                : gameState === "result"
                ? "text-[#4ade80]"
                : "text-white"
            }`}
          >
            {message.title}
          </h2>

          <p
            className={`text-lg tracking-widest uppercase ${
              gameState === "ready" || gameState === "clicked"
                ? "text-white/80"
                : "text-[#ECE8E1]/50"
            }`}
          >
            {message.subtitle}
          </p>

          {/* Stats during waiting */}
          {gameState === "waiting" && bestTime !== null && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
              <div className="text-center">
                <div className="text-xs uppercase text-[#ECE8E1]/40 font-bold">
                  Best
                </div>
                <div className="text-xl font-header font-bold text-[#4ade80]">
                  {bestTime}ms
                </div>
              </div>
              {avgTime !== null && (
                <div className="text-center">
                  <div className="text-xs uppercase text-[#ECE8E1]/40 font-bold">
                    Average
                  </div>
                  <div className="text-xl font-header font-bold text-[#ECE8E1]">
                    {avgTime}ms
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stats on result */}
          {gameState === "result" && (
            <div className="mt-8 flex gap-6">
              {bestTime !== null && (
                <div className="text-center bg-[#ECE8E1]/10 px-4 py-2">
                  <div className="text-xs uppercase text-[#ECE8E1]/40 font-bold">
                    Best
                  </div>
                  <div className="text-xl font-header font-bold text-[#4ade80]">
                    {bestTime}ms
                  </div>
                </div>
              )}
              <div className="text-center bg-[#ECE8E1]/10 px-4 py-2">
                <div className="text-xs uppercase text-[#ECE8E1]/40 font-bold">
                  Attempts
                </div>
                <div className="text-xl font-header font-bold text-[#ECE8E1]">
                  {attempts.length}
                </div>
              </div>
            </div>
          )}

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ECE8E1]/30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ECE8E1]/30" />
        </button>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between w-full max-w-md text-xs text-[#ECE8E1]/40 uppercase font-bold tracking-widest px-2">
        <span>Attempts: {attempts.length}</span>
        <span>{bestTime ? `Best: ${bestTime}ms` : "Click to start"}</span>
      </div>
    </div>
  );
};

export default ReflexTest;
