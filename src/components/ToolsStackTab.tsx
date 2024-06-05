import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

import {
  AndroidstudioOriginal,
  FigmaOriginal,
  IllustratorLine,
  NotionOriginal,
  PostmanOriginal,
  PremiereproOriginal,
  VscodeOriginal,
} from "devicons-react";

const ICON_SIZE = 38;

const toolsStackList = [
  {
    id: "figma",
    label: "Figma",
    description: "Collabrative Design",
    icon: <FigmaOriginal size={ICON_SIZE} />,
  },
  {
    id: "vscode",
    label: "VS Code",
    description: "Code Editor",
    icon: <VscodeOriginal size={ICON_SIZE} />,
  },
  {
    id: "notion",
    label: "Notion",
    description: "Note taking application",
    icon: <NotionOriginal size={ICON_SIZE} />,
  },

  {
    id: "androidstudio",
    label: "Android Studio",
    description: "Android app development",
    icon: <AndroidstudioOriginal size={ICON_SIZE} />,
  },
  {
    id: "postman",
    label: "Postman",
    description: "API Testing",
    icon: <PostmanOriginal size={ICON_SIZE} />,
  },
  {
    id: "illustration",
    label: "Adobe Illustrator",
    description: "Sketching & Illustration",
    icon: <IllustratorLine size={ICON_SIZE} />,
  },
  {
    id: "adobePremierPro",
    label: "Adobe Premier Pro",
    description: "Video Editing",
    icon: <PremiereproOriginal size={ICON_SIZE} />,
  },
];

const ToolsStackTab = () => {
  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl p-4    border-gray-300 bg-white">
      {/* <p className="text-xl md:text-4xl font-bold ">Tools</p> */}
      <ul className=" flex flex-wrap gap-6">
        {toolsStackList.map((toolsStack) => (
          <li key={`${toolsStack.id}-tools-stack-card`}>
            <Card className="w-max p-0 shadow-none overflow-hidden ">
              <CardHeader className="m-0 p-4 py-2  flex flex-row items-center gap-2 lg:gap-4">
                {toolsStack.icon}
                <div className="w-max flex flex-col gap-1">
                  <CardTitle>{toolsStack.label}</CardTitle>
                  <CardDescription>{toolsStack.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsStackTab;
