import { Code2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";

const projectList = [
  {
    id: "invoiceGenerator",
    label: "Invoice Generator",
    link: "https://github.com/ypratham/invoice-generator",
    description: "Web app",
    image: "/assets/images/project_thumbnail/invoice_thumbnail.png",
    tags: ["react", "open-source"],
  },
  {
    id: "revive",
    label: "Revive",
    link: "https://github.com/ypratham/revive-flutter",
    description: "Flutter application",
    image: "/assets/images/project_thumbnail/revive_thumbnail.png",
    tags: ["flutter", "google-solution-challenge"],
  },
  {
    id: "roaster",
    label: "Roaster",
    link: "https://github.com/ypratham/roster",
    description: "Mobile application",
    image: "/assets/images/project_thumbnail/roaster_thumbnail.png",
    tags: ["react-native", "todo"],
  },
  {
    id: "aide",
    label: "Aide",
    link: "https://github.com/ypratham/aide",
    description: "Web design",
    image: "/assets/images/project_thumbnail/aide_thumbnail.png",
    tags: ["react", "hackathon"],
  },
  {
    id: "centaur",
    label: "Centaur",
    link: "https://antaur-international.github.io/centaur-web/",
    description: "College",
    image: "/assets/images/project_thumbnail/centaur_thumbnail.png",
    tags: ["react", "meet", "socket"],
  },

  {
    id: "discordBot",
    label: "Discord Bot",
    link: "https://github.com/ypratham/discordBot",
    description: "Automation",
    image: "/assets/images/project_thumbnail/discord_thumbnail.png",
    tags: ["discord", "python"],
  },
  {
    id: "collabDesign",
    label: "Collabrative Canvas",
    link: "https://github.com/ypratham/Collab-Draw",
    description: "Web application",
    image: "/assets/images/project_thumbnail/collab_canvas_thumbnail.png",
    tags: ["socket", "react"],
  },
  {
    id: "githubSearch",
    label: "GitHub Search API",
    link: "https://github.com/ypratham/github-search-api",
    description: "Web Design",
    image: "/assets/images/project_thumbnail/github_search_thumbnail.png",
    tags: ["react", "github"],
  },
];

const Projects = () => {
  return (
    <section className="lg:container w-full flex flex-col gap-12 ">
      <div className="flex items-center  gap-2">
        <Code2Icon size={28} />
        <h2 className="text-3xl font-semibold tracking-wider">Projects</h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {projectList.map((project) => (
            <CarouselItem
              className="md:basis-1/2 lg:basis-1/4"
              key={`${project.id}-project-card`}
            >
              <Card className="md:w-[300px] w-full shadow-none h-full group overflow-hidden">
                <Image
                  src={project.image}
                  alt=""
                  width={500}
                  height={500}
                  className="w-full h-40  group-hover:scale-105 object-cover transition-all"
                />
                <CardHeader>
                  <CardDescription>{project.description}</CardDescription>
                  <Link href={project.link} target="_blank">
                    <CardTitle className="text-xl hover:underline">
                      {project.label}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardFooter>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        className="rounded-full"
                        variant={"outline"}
                        key={`${project.id}-tags-${tag}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        <CarouselNext />
      </Carousel>

      <ul className="flex  flex-wrap items-stretch gap-8"></ul>
    </section>
  );
};

export default Projects;
