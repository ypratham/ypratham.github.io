export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  highlights: string[];
  role: string;
  duration: string;
}

export interface Skill {
  name: string;
  level: number;
  icon?: string; // tech-stack-icons name
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
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

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "workshop" | "hackathon" | "school" | "course";
}

export const PROFILE = {
  name: "Pratham Yadav",
  role: "Software Engineer",
  location: "India",
  email: "ypratham0014@gmail.com",
  linkedin: "https://linkedin.com/in/ypratham",
  github: "https://github.com/ypratham",
  bio: "Full-stack engineer specializing in high-velocity frontend development. Building pixel-perfect, interactive web experiences with modern technologies.",
  yearsOfExperience: Math.abs(
    new Date("20 Feb,2021").getFullYear() - new Date().getFullYear(),
  ),
};

export const SKILLS: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "Next.js", level: 98, icon: "nextjs2" },
      { name: "TypeScript", level: 95, icon: "typescript" },
      { name: "React Native", level: 80, icon: "reactnative" },
      { name: "Tailwind CSS", level: 90, icon: "tailwindcss" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 90, icon: "nodejs" },
      { name: "MongoDB", level: 88, icon: "mongodb" },
      { name: "Firebase", level: 88, icon: "firebase" },
      { name: "Supabase", level: 88, icon: "supabase" },
      { name: "NeonDB", level: 88, icon: "neon" },
      { name: "PostgreSQL", level: 80, icon: "postgresql" },
      { name: "GraphQL", level: 85, icon: "graphql" },
      { name: "Python", level: 75, icon: "python" },
    ],
  },
  {
    name: "Tools & DevOps",
    skills: [
      { name: "Railway", level: 90, icon: "railway" },
      { name: "Digital Ocean", level: 90, icon: "digitalocean" },
      { name: "Azure", level: 90, icon: "azure" },
      { name: "Docker", level: 82, icon: "docker" },
      { name: "AWS Services", level: 78, icon: "aws" },
      { name: "Figma", level: 90, icon: "figma" },
      { name: "Git / CI/CD", level: 95, icon: "git" },
    ],
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "c1",
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    date: "Dec 2021",
    category: "course",
  },
  {
    id: "w1",
    title: "AR/VR using JavaScript",
    issuer: "Alegria Festival",
    date: "March 2024",
    category: "workshop",
  },
  {
    id: "w2",
    title: "Decoding Backend",
    issuer: "CSI Chapter",
    date: "Feb 2024",
    category: "workshop",
  },
  {
    id: "w3",
    title: "Git and Github",
    issuer: "Alegria Festival",
    date: "Jan 2024",
    category: "workshop",
  },
  {
    id: "w4",
    title: "Prompt Engineering",
    issuer: "Alegria Festival",
    date: "Feb 2024",
    category: "workshop",
  },
  {
    id: "h1",
    title: "Smart India Hackathon",
    issuer: "Pillai College of Engineering",
    date: "2023",
    category: "hackathon",
  },
  {
    id: "h2",
    title: "Smart India Hackathon",
    issuer: "Pillai College of Engineering",
    date: "2024",
    category: "hackathon",
  },
  {
    id: "h3",
    title: "Hackathon Organizer",
    issuer: "Pillai College of Engineering",
    date: "2024",
    category: "hackathon",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Surfaced",
    description:
      "AI-powered SEO engine that optimizes content for ChatGPT, Perplexity, and Google AI Overviews — making websites discoverable in the age of generative search.",
    tech: ["Next.js", "Python", "Azure", "Docker", "LLM"],
    role: "Lead Frontend Engineer",
    duration: "3 months",
    highlights: [
      "Built the content engine that creates high-quality, SEO-friendly articles for websites.",
      "Integrated backend APIs and designed the full UI for a smooth user experience.",
      "Added EventStreams to show live notifications and progress updates.",
      "Optimized the dashboard to load faster and reduce waiting time for users.",
    ],
  },
  {
    id: "p2",
    title: "Job Board",
    description:
      "A 40,000+ page marketing job board built for scale — programmatic SEO meets clean UX, helping marketers find their next role fast.",
    tech: ["Next.js", "Express", "PostgreSQL", "Railway"],
    link: "https://www.marketingmonk.so/jobboard",
    role: "Full Stack Developer",
    duration: "Ongoing",
    highlights: [
      "Architected 40k+ programmatic pages with dynamic routing and ISR for near-instant loads.",
      "Built the backend API layer with Express and PostgreSQL for reliable job data pipelines.",
      "Deployed on Railway with zero-downtime deploys and automated health checks.",
    ],
  },
  {
    id: "p3",
    title: "Product Directory",
    description:
      "A curated directory of marketing tools and products — designed to help teams discover the right stack without the noise.",
    tech: ["Next.js", "Express", "PostgreSQL", "Railway"],
    link: "https://www.marketingmonk.so/products",
    role: "Full Stack Developer",
    duration: "Ongoing",
    highlights: [
      "Built a structured product catalog with filterable categories and search.",
      "Designed for programmatic SEO with clean URLs and metadata per listing.",
      "Shared backend infrastructure with the Job Board for efficient resource usage.",
    ],
  },
  {
    id: "p4",
    title: "Agency Directory",
    description:
      "A directory of marketing agencies built for programmatic SEO — scraped, structured, and served at scale.",
    tech: ["Next.js", "Railway", "Python", "PostgreSQL"],
    link: "https://www.marketingmonk.so/agency-directory",
    role: "Full Stack Developer",
    duration: "1 month",
    highlights: [
      "Built a web scraper to collect agency data and display it in a user-friendly way.",
      "Deployed the entire system on Railway with a simple, reliable setup.",
    ],
  },
  {
    id: "p5",
    title: "Innovacio Technologies",
    description:
      "Designed and developed the official website for Innovacio Technologies as a frontend developer.",
    tech: ["Next.js", "SEO", "Resend", "Vercel"],
    link: "https://www.innovaciotech.com",
    role: "Frontend Engineer",
    duration: "Less than a month",
    highlights: [
      "Improved SEO and performance scores from ~40 to ~90 using best practices.",
      "Set up a contact email system using Resend for reliable communication.",
      "Integrated Cal.com for easy calendar scheduling and invites.",
    ],
  },
  {
    id: "p6",
    title: "NexaSub",
    description: "Open-source subscription management app built with Next.js.",
    tech: ["Next.js"],
    link: "https://github.com/ypratham/nexa-sub",
    role: "Full Stack Developer",
    duration: "5 months",
    highlights: [
      "Designed and implemented the entire UI with clear, simple navigation.",
      "Track all subscriptions and view detailed analytics for each one.",
    ],
  },
  {
    id: "p7",
    title: "Invoice Generator",
    description: "Open-source invoice builder created for Hacktoberfest 2024.",
    tech: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    link: "https://github.com/ypratham/invoice-generator",
    role: "Full Stack Developer",
    duration: "1 month",
    highlights: [
      "Supports multiple themes so users can style their invoices easily.",
      "Reviewed pull requests and merged community contributions to improve the project.",
    ],
  },
  {
    id: "p8",
    title: "Unbabel",
    description:
      "Final-year B.Tech project: a speech-to-speech translation mobile app.",
    tech: ["React Native", "Expo"],
    link: "https://github.com/ypratham/roster",
    role: "Mobile App Developer",
    duration: "1 week",
    highlights: [
      "Auto-detects spoken language and dialect in real time.",
      "Built a speech-to-speech translation engine for quick communication.",
    ],
  },
  {
    id: "p9",
    title: "Roster",
    description:
      "A React Native learning app built to practice mobile development.",
    tech: ["React Native", "Expo"],
    link: "https://github.com/ypratham/roster",
    role: "Mobile App Developer",
    duration: "1 week",
    highlights: [
      "Learned core concepts of React Native and Expo.",
      "Handled keyboard and touch events for a smooth mobile UX.",
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "e1",
    role: "Full Stack Developer",
    company: "Moonshot Technologies",
    period: "June 2025 - Present",
    type: "Full-time",
    location: "Goa, IN",
    description:
      "Created and maintained multiple directories powering the MarketingMonk ecosystem. Built an ad system spanning the entire domain. Shipping features people love while learning to plan, measure results, and iterate.",
  },
  {
    id: "e2",
    role: "Software Engineer",
    company: "Altarium Technologies",
    period: "December 2024 - April 2025",
    type: "Contract",
    location: "Delhi, IN",
    description:
      "Worked with clients like Amazon and MortgageFinder. Built a playground using Amazon Location Service API for maps. Designed and built MortgageFinder's new UI.",
  },
  {
    id: "e3",
    role: "Frontend Developer",
    company: "Innovacio Technologies",
    period: "Feb 2022 - October 2025",
    type: "Full-time",
    location: "Kolkata, IN",
    description:
      "Built the company website and client projects end-to-end. Often the sole frontend developer, managing projects, leading tasks, and delivering on time.",
  },
];
