import Connect from "@/components/Connect";
import LandingHome from "@/components/LandingHome";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-10 lg:gap-24 items-center justify-center p-6 lg:p-24 md:p-14 lg:pb-12 ">
      <LandingHome />
      <Stack />
      <Projects />
      <Connect />
    </main>
  );
}
