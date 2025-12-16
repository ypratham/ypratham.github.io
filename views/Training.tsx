"use client";

import React, { useState } from "react";
import { Crosshair, Monitor, Target, Zap, Gamepad2 } from "lucide-react";
import SnakeGame from "@/components/games/SnakeGame";
import AimTrainer from "@/components/games/AimTrainer";
import ReflexTest from "@/components/games/ReflexTest";
import { useSounds } from "@/hooks/useSounds";

type GameType = "snake" | "aim" | "reflex";

interface GameOption {
  id: GameType;
  name: string;
  protocol: string;
  icon: React.ElementType;
  description: string;
}

const GAMES: GameOption[] = [
  {
    id: "snake",
    name: "Snake",
    protocol: "Snake.exe",
    icon: Gamepad2,
    description: "Classic snake game. Collect food, grow longer, avoid walls.",
  },
  {
    id: "aim",
    name: "Aim Lab",
    protocol: "AimTrainer.exe",
    icon: Target,
    description: "Click targets as fast as you can. Train your accuracy.",
  },
  {
    id: "reflex",
    name: "Reflex",
    protocol: "ReflexTest.exe",
    icon: Zap,
    description: "Test your reaction time. Wait for green, then click!",
  },
];

const Training: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>("snake");
  const { playHover, playClick } = useSounds();

  const currentGame = GAMES.find((g) => g.id === selectedGame)!;
  const GameIcon = currentGame.icon;

  return (
    <div className="grow flex flex-col items-center justify-start p-6 bg-[#0F1923] h-full overflow-auto">
      {/* HUD Header */}
      <div className="w-full max-w-2xl flex justify-between items-end mb-6 border-b-2 border-[#ECE8E1]/10 pb-4">
        <div>
          <h1 className="text-4xl font-header font-bold text-white uppercase flex items-center gap-3">
            <Crosshair className="text-[#FF4655]" size={32} />
            Training Range
          </h1>
          <p className="text-[#ECE8E1]/50 text-sm uppercase tracking-widest flex items-center gap-2">
            <Monitor size={12} />
            Protocol: {currentGame.protocol}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-[#ECE8E1]/50 uppercase tracking-widest">
            Active Module
          </div>
          <div className="text-2xl font-header font-bold text-[#FF4655] flex items-center gap-2 justify-end">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <GameIcon size={20} />
            {currentGame.name}
          </div>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="w-full max-w-2xl flex gap-2 mb-6">
        {GAMES.map((game) => {
          const Icon = game.icon;
          const isActive = selectedGame === game.id;
          return (
            <button
              key={game.id}
              onClick={() => {
                playClick();
                setSelectedGame(game.id);
              }}
              onMouseEnter={playHover}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-header font-bold text-sm uppercase tracking-wider transition-all duration-200 border-b-2 ${
                isActive
                  ? "bg-[#FF4655]/20 text-[#FF4655] border-[#FF4655]"
                  : "bg-[#ECE8E1]/5 text-[#ECE8E1]/60 border-transparent hover:bg-[#ECE8E1]/10 hover:text-[#ECE8E1]"
              }`}
            >
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Icon size={16} />
              {game.name}
            </button>
          );
        })}
      </div>

      {/* Game Container */}
      <div className="flex-1 flex items-center justify-center w-full">
        {selectedGame === "snake" && <SnakeGame />}
        {selectedGame === "aim" && <AimTrainer />}
        {selectedGame === "reflex" && <ReflexTest />}
      </div>

      {/* Game Description */}
      <div className="mt-6 w-full max-w-2xl text-center">
        <p className="text-[#ECE8E1]/40 text-sm">{currentGame.description}</p>
      </div>
    </div>
  );
};

export default Training;
