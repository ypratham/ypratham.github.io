import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  Link2Icon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const LandingHome = () => {
  return (
    <section className="lg:container  flex flex-col-reverse md:flex-row justify-between items-start lg:gap-24 gap-4">
      <div className="lg:w-1/2 flex flex-col items-start gap-6  leading-relaxed">
        <Badge
          variant={"secondary"}
          className="bg-green-300 hover:bg-green-300"
        >
          Available for work
        </Badge>
        <h1 className="lg:text-5xl text-4xl tracking-wider font-bold font-sans">
          Hey, I&apos;m Pratham
        </h1>
        <p className="lg:text-3xl text-2xl font-medium text-gray-500">
          Software Engineer from India
        </p>

        <p className="tracking-wide">
          With over four years of experience in software development, I have
          successfully built software products across various domains. As a
          full-stack developer, I excel in collaborating with diverse teams to
          deliver high-quality, innovative solutions. Let&apos;s work together
          to bring your next project to life.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button
            variant={"expandIcon"}
            Icon={LinkedInLogoIcon}
            iconPlacement="left"
            className="rounded-full text-black border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            asChild
          >
            <Link href={"https://www.linkedin.com/in/ypratham"} target="_blank">
              LinkedIn
            </Link>
          </Button>
          <Button
            variant={"expandIcon"}
            Icon={GitHubLogoIcon}
            iconPlacement="left"
            className="rounded-full text-black border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            asChild
          >
            <Link href={"https://www.github.com/ypratham"} target="_blank">
              GitHub
            </Link>
          </Button>
          <Button
            className="rounded-full text-black border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            asChild
          >
            <Link href={"mailto:yprathamcode@gmail.com"}>
              yprathamcode@gmail.com
            </Link>
          </Button>
          <Button
            variant={"expandIcon"}
            Icon={Link2Icon}
            iconPlacement="left"
            className="rounded-full text-black border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            asChild
          >
            <Link
              href={"https://rxresu.me/outcast/pratham-yadav"}
              target="_blank"
            >
              CV
            </Link>
          </Button>
        </div>

        <div className="flex justify-between w-full">
          <div>
            <p className="text-3xl font-bold">2.6+ years</p>
            <p className="font-medium">of experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold">5+ clients</p>
            <p className="font-medium">worked with</p>
          </div>
        </div>
      </div>

      <Image
        src={"/assets/images/profile_pic.png"}
        alt="Pratham Yadav"
        width={300}
        height={300}
        className="w-1/2 md:w-1/4 object-cover"
        priority
      />
    </section>
  );
};

export default LandingHome;
