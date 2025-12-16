export interface Project {
  id: string;
  title: string;
  category: "Duelist" | "Initiator" | "Sentinel" | "Controller";
  description: string;
  tech: string[];
  image: string;
  link?: string;
  highlights: string[];
  role: string;
  duration: string;
}

export interface AgentStats {
  role: string;
  specialty: string;
  biography: string;
  abilities: {
    name: string;
    desc: string;
    icon: string;
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  category: "workshop" | "hackathon" | "school" | "course";
}

export interface SkillCategory {
  name: string;
  type: "Primary" | "Sidearm" | "Tactical" | "Ultimate";
  skills: {
    name: string;
    level: number;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: "Full-time" | "Contract";
  location: string;
}

export enum PageState {
  LOBBY = "LOBBY",
  CAREER = "CAREER",
  PROJECTS = "PROJECTS",
  PROJECT_DETAIL = "PROJECT_DETAIL",
  AGENTS = "AGENTS",
  LOADOUT = "LOADOUT",
  AWARDS = "AWARDS",
  TRAINING = "TRAINING",
}
