import {
  AstroOriginal,
  COriginal,
  CplusplusOriginal,
  Css3Original,
  DigitaloceanOriginal,
  DjangoPlain,
  ExpressOriginal,
  FirebaseOriginal,
  FlutterOriginal,
  Html5Original,
  JavaOriginal,
  JavascriptOriginal,
  MongodbOriginal,
  NextjsOriginal,
  NodejsOriginal,
  PrismaOriginal,
  PythonOriginal,
  ReactOriginal,
  SqliteOriginal,
  SupabaseOriginal,
  SvelteOriginal,
  TailwindcssOriginal,
  TypescriptOriginal,
} from "devicons-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { isMobile } from "react-device-detect";
const ICON_SIZE = isMobile ? 24 : 38;

const developmentStackList = [
  {
    id: "nextjs",
    label: "NextJs",
    description: "JS Framework",
    icon: <NextjsOriginal size={ICON_SIZE} />,
  },
  {
    id: "react",
    label: "React",
    description: "JS Framework",
    icon: <ReactOriginal size={ICON_SIZE} />,
  },
  {
    id: "svelte",
    label: "Svelte",
    description: "JS Framework",
    icon: <SvelteOriginal size={ICON_SIZE} />,
  },
  {
    id: "astro",
    label: "Astro",
    description: "JS Framework",
    icon: <AstroOriginal size={ICON_SIZE} />,
  },
  {
    id: "html5",
    label: "HTML",
    description: "Frontend development",
    icon: <Html5Original size={ICON_SIZE} />,
  },
  {
    id: "css",
    label: "CSS",
    description: "Frontend development",
    icon: <Css3Original size={ICON_SIZE} />,
  },
  {
    id: "tailwind",
    label: "Tailwind",
    description: "CSS Library",
    icon: <TailwindcssOriginal size={ICON_SIZE} />,
  },
  {
    id: "javaScript",
    label: "JavaScript",
    description: "Web development",
    icon: <JavascriptOriginal size={ICON_SIZE} />,
  },
  {
    id: "typeScript",
    label: "TypeScript",
    description: "Web development",
    icon: <TypescriptOriginal size={ICON_SIZE} />,
  },
  {
    id: "prisma",
    label: "Prisma",
    description: "Frontend development",
    icon: <PrismaOriginal size={ICON_SIZE} />,
  },
  {
    id: "flutter",
    label: "Flutter",
    description: "Android development",
    icon: <FlutterOriginal size={ICON_SIZE} />,
  },
  {
    id: "nodeJs",
    label: "NodeJs",
    description: "Backend development",
    icon: <NodejsOriginal size={ICON_SIZE} />,
  },
  {
    id: "express",
    label: "ExpressJs",
    description: "Backend development",
    icon: <ExpressOriginal size={ICON_SIZE} />,
  },
  {
    id: "digitalocean",
    label: "Digital Ocean",
    description: "Cloud service",
    icon: <DigitaloceanOriginal size={ICON_SIZE} />,
  },
  {
    id: "cpp",
    label: "C++",
    description: "Low level programming",
    icon: <CplusplusOriginal size={ICON_SIZE} />,
  },
  {
    id: "c",
    label: "C",
    description: "Low level programming",
    icon: <COriginal size={ICON_SIZE} />,
  },
  {
    id: "java",
    label: "Java",
    description: "Programming language",
    icon: <JavaOriginal size={ICON_SIZE} />,
  },
  {
    id: "python",
    label: "Python",
    description: "Programming language",
    icon: <PythonOriginal size={ICON_SIZE} />,
  },
  {
    id: "mongodb",
    label: "MongoDb",
    description: "Database",
    icon: <MongodbOriginal size={ICON_SIZE} />,
  },
  {
    id: "supabase",
    label: "Supabase",
    description: "Database",
    icon: <SupabaseOriginal size={ICON_SIZE} />,
  },
  {
    id: "firebase",
    label: "Firebase",
    description: "Database",
    icon: <FirebaseOriginal size={ICON_SIZE} />,
  },
  {
    id: "sqllite",
    label: "SQL Lite",
    description: "Database",
    icon: <SqliteOriginal size={ICON_SIZE} />,
  },
  {
    id: "django",
    label: "Django",
    description: "Database",
    icon: <DjangoPlain size={ICON_SIZE} />,
  },
];

const DevelopmentStackTab = () => {
  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl     border-gray-300 bg-white">
      {/* <p className="text-xl md:text-4xl font-bold ">Development</p> */}
      <ul className="flex flex-wrap gap-4 lg:gap-6">
        {developmentStackList.map((developmentStack) => (
          <li key={`${developmentStack.id}-development-stack-card`}>
            <Card className="w-max p-0 shadow-none overflow-hidden ">
              <CardHeader className="m-0 p-4 py-2  flex flex-row items-center gap-2 lg:gap-4">
                {developmentStack.icon}
                <div className="w-max flex flex-col gap-1">
                  <CardTitle>{developmentStack.label}</CardTitle>
                  <CardDescription>
                    {developmentStack.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevelopmentStackTab;
