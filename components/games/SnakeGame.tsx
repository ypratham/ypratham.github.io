"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ValButton } from "../UI";
import { Play, RotateCcw } from "lucide-react";
import { useSounds } from "@/hooks/useSounds";

// Game Constants
const GRID_SIZE = 20;
const INITIAL_SPEED = 100;

interface SnakeGameProps {
  onBack?: () => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onBack }) => {
  const { playEat, playDefeat, playStart } = useSounds();
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">(
    "RIGHT"
  );
  const [nextDirection, setNextDirection] = useState<
    "UP" | "DOWN" | "LEFT" | "RIGHT"
  >("RIGHT");
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const justAteRef = useRef(false);

  // Initialize Food
  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  // Handle Focus for keyboard events
  useEffect(() => {
    if (isPlaying && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isPlaying]);

  // Game Over sound effect
  useEffect(() => {
    if (gameOver) {
      playDefeat();
    }
  }, [gameOver, playDefeat]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = setInterval(() => {
      setSnake((prev) => {
        const newHead = { ...prev[0] };

        // Update actual direction from buffer
        setDirection(nextDirection);

        switch (nextDirection) {
          case "UP":
            newHead.y -= 1;
            break;
          case "DOWN":
            newHead.y += 1;
            break;
          case "LEFT":
            newHead.x -= 1;
            break;
          case "RIGHT":
            newHead.x += 1;
            break;
        }

        // Check Collisions (Walls)
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prev;
        }

        // Check Collisions (Self)
        if (
          prev.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Eat Food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 100);
          setFood(generateFood());
          justAteRef.current = true;
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED);

    return () => clearInterval(moveSnake);
  }, [isPlaying, gameOver, nextDirection, food, generateFood]);

  // Play eat sound when food is consumed
  useEffect(() => {
    if (justAteRef.current) {
      playEat();
      justAteRef.current = false;
    }
  }, [score, playEat]);

  // Key Controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      // Prevent scrolling
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setNextDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setNextDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setNextDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setNextDirection("RIGHT");
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying, direction]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    setFood(generateFood());
    if (score > highScore) setHighScore(score);
  };

  const startGame = () => {
    playStart();
    setIsPlaying(true);
    setGameOver(false);
    containerRef.current?.focus();
  };

  return (
    <div
      className="flex flex-col items-center justify-center outline-none"
      tabIndex={0}
      ref={containerRef}
    >
      {/* Game Container */}
      <div className="relative p-1 bg-[#ECE8E1]/5 border border-[#ECE8E1]/20 backdrop-blur-sm shadow-2xl">
        {/* The Grid Board */}
        <div
          className="bg-[#0F1923] relative grid"
          style={{
            width: "min(65vw, 400px)",
            height: "min(65vw, 400px)",
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {/* Grid Lines Overlay */}
          <div
            className="absolute inset-0 grid pointer-events-none opacity-5"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
              <div key={i} className="border border-[#ECE8E1]"></div>
            ))}
          </div>

          {/* Snake */}
          {snake.map((segment, i) => (
            <div
              key={`${segment.x}-${segment.y}`}
              className={`absolute border border-[#0F1923] transition-all duration-75 ${
                i === 0
                  ? "bg-[#FF4655] z-10 shadow-[0_0_15px_rgba(255,70,85,0.8)]"
                  : "bg-white/80"
              }`}
              style={{
                left: `${(segment.x / GRID_SIZE) * 100}%`,
                top: `${(segment.y / GRID_SIZE) * 100}%`,
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute bg-[#4ade80] shadow-[0_0_15px_#4ade80] animate-pulse rounded-sm rotate-45 scale-75"
            style={{
              left: `${(food.x / GRID_SIZE) * 100}%`,
              top: `${(food.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
            }}
          />

          {/* Start Overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
              <div className="bg-[#0F1923] p-8 border border-[#FF4655] text-center">
                <h3 className="text-3xl font-header font-bold text-white mb-4">
                  SNAKE PROTOCOL
                </h3>
                <ValButton onClick={startGame}>
                  <div className="flex items-center gap-2">
                    <Play size={16} fill="currentColor" /> START
                  </div>
                </ValButton>
                <p className="mt-4 text-[#ECE8E1]/40 text-xs uppercase tracking-widest font-mono">
                  Controls: Arrow Keys
                </p>
              </div>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-[#FF4655]/90 flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
              <h3 className="text-5xl font-header font-bold text-white mb-2 tracking-tighter">
                DEFEAT
              </h3>
              <p className="text-white/80 font-bold tracking-widest mb-4">
                SIMULATION FAILED
              </p>
              <div className="mb-4 text-center bg-black/20 p-3 w-40 mx-auto">
                <div className="text-xs uppercase text-white/50 font-bold">
                  Final Score
                </div>
                <div className="text-3xl font-header font-bold text-white">
                  {score}
                </div>
              </div>
              <ValButton variant="secondary" onClick={resetGame}>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} /> RESTART
                </div>
              </ValButton>
            </div>
          )}
        </div>
      </div>

      {/* Score Footer */}
      <div className="mt-4 flex justify-between w-full max-w-md text-xs text-[#ECE8E1]/40 uppercase font-bold tracking-widest px-2">
        <span>Score: {score}</span>
        <span>Best: {Math.max(score, highScore)}</span>
      </div>
    </div>
  );
};

export default SnakeGame;
