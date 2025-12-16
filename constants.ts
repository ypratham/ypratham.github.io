import {
  Project,
  AgentStats,
  Certificate,
  SkillCategory,
  Experience,
} from "@/types";

export const VAL_RED = "#FF4655";
export const VAL_DARK = "#0F1923";
export const VAL_WHITE = "#ECE8E1";

export const MY_STATS: AgentStats = {
  role: "SENIOR FRONTEND ENGINEER",
  specialty: "CREATIVE DEVELOPER",
  biography:
    "Pratham is a high-ranking creative developer from India. He specializes in crafting pixel-perfect, interactive web experiences that disrupt the meta. With a diverse arsenal of modern web technologies, he enters every project ready to frag bugs and plant scalable architecture.",
  abilities: [
    {
      name: "Pixel Perfect",
      desc: "Deploys UI with 100% fidelity to design specs.",
      icon: "Crosshair",
    },
    {
      name: "State Flow",
      desc: "Manages complex application state with Redux/Zustand.",
      icon: "Activity",
    },
    {
      name: "Rapid Deploy",
      desc: "Ships production-ready code at lightning speed.",
      icon: "Zap",
    },
    {
      name: "Vision Haze",
      desc: "Optimizes rendering performance for maximum FPS.",
      icon: "Eye",
    },
  ],
};

export const SKILLS: SkillCategory[] = [
  {
    name: "FRONTEND ARSENAL",
    type: "Primary",
    skills: [
      { name: "React / Next.js", level: 98 },
      { name: "TypeScript", level: 95 },
      { name: "React Native", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Three.js / R3F", level: 85 },
      { name: "Framer Motion", level: 92 },
    ],
  },
  {
    name: "BACKEND SIDEARMS",
    type: "Sidearm",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "MongoDB", level: 88 },
      { name: "Firebase", level: 88 },
      { name: "Supabase", level: 88 },
      { name: "NeonDB", level: 88 },
      { name: "PostgreSQL", level: 80 },
      { name: "GraphQL", level: 85 },
      { name: "Python", level: 75 },
    ],
  },
  {
    name: "TACTICAL TOOLS",
    type: "Tactical",
    skills: [
      { name: "Railway", level: 90 },
      { name: "Digital Ocean", level: 90 },
      { name: "Azure", level: 90 },
      { name: "Docker", level: 82 },
      { name: "AWS Services", level: 78 },
      { name: "Figma", level: 90 },
      { name: "Git / CI/CD", level: 95 },
    ],
  },
];

export const CERTIFICATE_CATEGORIES = [
  {
    id: "course",
    name: "COURSES",
    description: "Online Learning",
  },
  {
    id: "workshop",
    name: "WORKSHOPS",
    description: "Conducted Technical Sessions",
  },
  { id: "hackathon", name: "HACKATHONS", description: "Competition Victories" },
  { id: "school", name: "SCHOOL", description: "Early Achievements" },
] as const;

export const CERTIFICATES: Certificate[] = [
  // Online Course Certificates
  {
    id: "c1",
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    date: "Dec 2021",
    image: "/certificates/Web Development - Udemy - Dec 2021.jpg",
    category: "course",
  },
  // Workshop Certificates (Appreciation Letters for Conducting)
  {
    id: "w1",
    title: "AR/VR using JavaScript",
    issuer: "Alegria Festival",
    date: "March 2024",
    image: "/certificates/AR VR using JavaScript - Alegria - March 2024.jpg",
    category: "workshop",
  },
  {
    id: "w2",
    title: "Decoding Backend",
    issuer: "CSI Chapter",
    date: "Feb 2024",
    image: "/certificates/Decoding Backend - CSI - Feb 2024.jpg",
    category: "workshop",
  },
  {
    id: "w3",
    title: "Git and Github",
    issuer: "Alegria Festival",
    date: "Jan 2024",
    image: "/certificates/Git and Github - Alegria - Jan 2024.jpg",
    category: "workshop",
  },
  {
    id: "w4",
    title: "Prompt Engineering",
    issuer: "Alegria Festival",
    date: "Feb 2024",
    image: "/certificates/Prompt Engineering - Alegria - Feb 2024.jpg",
    category: "workshop",
  },
  // Hackathon/Competition Certificates
  {
    id: "h1",
    title: "Business Plan Winner",
    issuer: "B.Tech College",
    date: "2024",
    image: "/certificates/Business Plan Winner - B Tech - 2024.jpg",
    category: "hackathon",
  },
  {
    id: "h2",
    title: "Hackathon Winner",
    issuer: "B.Tech College",
    date: "March 2023",
    image: "/certificates/Hachathon - B Tech - March 2023.jpg",
    category: "hackathon",
  },
  {
    id: "h3",
    title: "Smart India Hackathon",
    issuer: "B.Tech College",
    date: "2023",
    image: "/certificates/SIH - B Tech - 2023.jpg",
    category: "hackathon",
  },
  {
    id: "h4",
    title: "Smart India Hackathon",
    issuer: "B.Tech College",
    date: "2024",
    image: "/certificates/SIH - BTech - 2024.jpg",
    category: "hackathon",
  },
  // School Certificates
  {
    id: "s1",
    title: "Origami Competition",
    issuer: "School",
    date: "July 2017",
    image: "/certificates/Origami - School - July 2017.jpg",
    category: "school",
  },
  {
    id: "s2",
    title: "Quiz Competition",
    issuer: "School",
    date: "August 2016",
    image: "/certificates/Quiz - School - August 2016.jpg",
    category: "school",
  },
  {
    id: "s3",
    title: "Rangoli Making",
    issuer: "School",
    date: "Sep 2014",
    image: "/certificates/Rangoli Making - School - Sep 2014.jpg",
    category: "school",
  },
  {
    id: "s4",
    title: "Science Exhibition",
    issuer: "School",
    date: "Jan 2017",
    image: "/certificates/Science Exhibition - School - Jan 2017.jpg",
    category: "school",
  },
  {
    id: "s5",
    title: "Tattoo Making",
    issuer: "School",
    date: "July 2016",
    image: "/certificates/Tatto Making - School - July 2016.jpg",
    category: "school",
  },
];

// projects.ts
export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Surfaced",
    category: "Duelist",
    description:
      "SEO for ChatGPT, Perplexity and Google AI overview with SEO content engine for websites.",
    tech: ["Next.js", "Python", "Azure", "Docker", "LLM"],
    image: "https://i.ibb.co/N2vVTHVq/image.png",
    link: "https://www.surfaced.in",
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
    title: "Agency Directory",
    category: "Sentinel",
    description:
      "A directory of marketing agencies, designed for programmatic SEO.",
    tech: ["Next.js", "Railway", "Python", "PostgreSQL"],
    image: "https://i.ibb.co/4w7xfLY1/image.png",
    link: "https://www.marketingmonk.so/agency-directory",
    role: "Full Stack Developer",
    duration: "1 month",
    highlights: [
      "Built a web scraper to collect agency data and display it in a user-friendly way.",
      "Deployed the entire system on Railway with a simple, reliable setup.",
    ],
  },
  {
    id: "p3",
    title: "Innovacio Technologies",
    category: "Initiator",
    description:
      "Designed and developed the official website for Innovacio Technologies as a frontend developer.",
    tech: ["Next.js", "SEO", "Resend", "Vercel"],
    image: "https://i.ibb.co/5WD2pkvs/image.png",
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
    id: "p4",
    title: "NexaSub",
    category: "Sentinel",
    description: "Open-source subscription management app built with Next.js.",
    tech: ["Next.js"],
    image: "https://picsum.photos/600/400?random=10",
    link: "https://github.com/ypratham/nexa-sub",
    role: "Full Stack Developer",
    duration: "5 months",
    highlights: [
      "Designed and implemented the entire UI with clear, simple navigation.",
      "Track all subscriptions and view detailed analytics for each one.",
    ],
  },
  {
    id: "p5",
    title: "Invoice Generator",
    category: "Sentinel",
    description: "Open-source invoice builder created for Hacktoberfest 2024.",
    tech: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    image: "https://picsum.photos/600/400?random=2",
    link: "https://github.com/ypratham/invoice-generator",
    role: "Full Stack Developer",
    duration: "1 month",
    highlights: [
      "Supports multiple themes so users can style their invoices easily.",
      "Reviewed pull requests and merged community contributions to improve the project.",
    ],
  },
  {
    id: "p6",
    title: "Unbabel",
    category: "Sentinel",
    description:
      "Final-year B.Tech project: a speech-to-speech translation mobile app.",
    tech: ["React Native", "Expo"],
    image: "https://picsum.photos/600/400?random=1",
    link: "https://github.com/ypratham/roster",
    role: "Mobile App Developer",
    duration: "1 week",
    highlights: [
      "Auto-detects spoken language and dialect in real time.",
      "Built a speech-to-speech translation engine for quick communication.",
    ],
  },
  {
    id: "p7",
    title: "Roster",
    category: "Sentinel",
    description:
      "A React Native learning app built to practice mobile development.",
    tech: ["React Native", "Expo"],
    image: "https://picsum.photos/600/400?random=4",
    link: "https://github.com/ypratham/roster",
    role: "Mobile App Developer",
    duration: "1 week",
    highlights: [
      "Learned core concepts of React Native and Expo.",
      "Handled keyboard and touch events for a smooth mobile UX.",
    ],
  },
];

// experience.ts
export const EXPERIENCE: Experience[] = [
  {
    id: "e1",
    role: "Product Growth Developer",
    company: "Moonshot Technologies",
    period: "June 2025 - PRESENT",
    type: "Full-time",
    location: "Goa, IN",
    description:
      "I help the company grow its products. I built a big website that gets about 1,000,000 search impressions every day with a 0.4% click rate, which means many people click and explore. I am also helping make new products. I learned how to plan, measure results, and ship features people like.",
  },
  {
    id: "e2",
    role: "Software Engineer",
    company: "Altarium Technologies",
    period: "December 2024 - April 2025",
    type: "Contract",
    location: "Delhi, IN",
    description:
      "I worked directly with clients like Amazon and MortgageFinder. For Amazon, I made a playground using the Amazon Location Service API for maps and places. For MortgageFinder, I built their new UI.",
  },
  {
    id: "e3",
    role: "Frontend Developer",
    company: "Innovacio Technologies",
    period: "Feb 2022 - October 2025",
    type: "Full-time",
    location: "Kolkata, IN",
    description:
      "I built the company website and many small client projects. I owned my work end-to-end: making the UI and connecting it to the APIs. I often worked alone as the only frontend developer. I learned how to manage projects, lead tasks, and work with a team to finish on time.",
  },
];
