"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ValButton } from "../UI";
import { Play, RotateCcw, Target } from "lucide-react";
import { useSounds } from "@/hooks/useSounds";

const GAME_DURATION = 30; // seconds
const TARGET_SIZE = 60; // pixels

interface AimTrainerProps {
  onBack?: () => void;
}

const AimTrainer: React.FC<AimTrainerProps> = ({ onBack }) => {
  const { playHit, playDefeat, playStart } = useSounds();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [highScore, setHighScore] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const spawnTarget = useCallback(() => {
    // Random position within bounds
    const x = Math.random() * 80 + 10; // 10-90%
    const y = Math.random() * 80 + 10; // 10-90%
    setTargetPos({ x, y });
  }, []);

  // Timer
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setIsPlaying(false);
          playDefeat();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver, playDefeat]);

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;

    playHit();
    setHits((h) => h + 1);
    setScore((s) => s + 100);
    spawnTarget();
  };

  const handleMiss = () => {
    if (!isPlaying) return;
    setMisses((m) => m + 1);
    setScore((s) => Math.max(0, s - 25));
  };

  const startGame = () => {
    playStart();
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setHits(0);
    setMisses(0);
    setTimeLeft(GAME_DURATION);
    spawnTarget();
  };

  const resetGame = () => {
    if (score > highScore) setHighScore(score);
    startGame();
  };

  const accuracy =
    hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center outline-none">
      {/* Game Area */}
      <div className="relative p-1 bg-[#ECE8E1]/5 border border-[#ECE8E1]/20 backdrop-blur-sm shadow-2xl">
        <div
          ref={gameAreaRef}
          className="bg-[#0F1923] relative cursor-crosshair overflow-hidden"
          style={{
            width: "min(65vw, 400px)",
            height: "min(65vw, 400px)",
          }}
          onClick={handleMiss}
        >
          {/* Crosshair overlay pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#ECE8E1]" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#ECE8E1]" />
          </div>

          {/* Target */}
          {isPlaying && !gameOver && (
            <button
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 group"
              style={{
                left: `${targetPos.x}%`,
                top: `${targetPos.y}%`,
                width: TARGET_SIZE,
                height: TARGET_SIZE,
              }}
              onClick={handleTargetClick}
            >
              {/* Target circles */}
              <div className="absolute inset-0 rounded-full border-4 border-[#FF4655] animate-ping opacity-30" />
              <div className="absolute inset-0 rounded-full border-2 border-[#FF4655]" />
              <div className="absolute inset-[25%] rounded-full bg-[#FF4655]" />
              <div className="absolute inset-[40%] rounded-full bg-white" />
            </button>
          )}

          {/* Start Overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
              <div className="bg-[#0F1923] p-8 border border-[#FF4655] text-center">
                <h3 className="text-3xl font-header font-bold text-white mb-2">
                  AIM TRAINER
                </h3>
                <p className="text-[#ECE8E1]/50 text-sm mb-4">
                  Click the targets as fast as you can!
                </p>
                <ValButton onClick={startGame}>
                  <div className="flex items-center gap-2">
                    <Target size={16} /> START
                  </div>
                </ValButton>
                <p className="mt-4 text-[#ECE8E1]/40 text-xs uppercase tracking-widest font-mono">
                  Duration: {GAME_DURATION}s
                </p>
              </div>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-[#FF4655]/90 flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
              <h3 className="text-4xl font-header font-bold text-white mb-2 tracking-tighter">
                TIME&apos;S UP
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                <div className="bg-black/20 p-3">
                  <div className="text-xs uppercase text-white/50 font-bold">
                    Score
                  </div>
                  <div className="text-2xl font-header font-bold text-white">
                    {score}
                  </div>
                </div>
                <div className="bg-black/20 p-3">
                  <div className="text-xs uppercase text-white/50 font-bold">
                    Accuracy
                  </div>
                  <div className="text-2xl font-header font-bold text-white">
                    {accuracy}%
                  </div>
                </div>
                <div className="bg-black/20 p-3">
                  <div className="text-xs uppercase text-white/50 font-bold">
                    Hits
                  </div>
                  <div className="text-2xl font-header font-bold text-white">
                    {hits}
                  </div>
                </div>
                <div className="bg-black/20 p-3">
                  <div className="text-xs uppercase text-white/50 font-bold">
                    Misses
                  </div>
                  <div className="text-2xl font-header font-bold text-white">
                    {misses}
                  </div>
                </div>
              </div>
              <ValButton variant="secondary" onClick={resetGame}>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} /> PLAY AGAIN
                </div>
              </ValButton>
            </div>
          )}

          {/* HUD */}
          {isPlaying && !gameOver && (
            <div className="absolute top-2 left-2 right-2 flex justify-between text-white font-header font-bold">
              <span className="bg-black/50 px-3 py-1 text-sm">{score} pts</span>
              <span
                className={`bg-black/50 px-3 py-1 text-sm ${
                  timeLeft <= 5 ? "text-[#FF4655] animate-pulse" : ""
                }`}
              >
                {timeLeft}s
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Score Footer */}
      <div className="mt-4 flex justify-between w-full max-w-md text-xs text-[#ECE8E1]/40 uppercase font-bold tracking-widest px-2">
        <span>Hits: {hits}</span>
        <span>Best: {Math.max(score, highScore)}</span>
      </div>
    </div>
  );
};

export default AimTrainer;
