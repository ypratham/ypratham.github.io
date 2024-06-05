"use client";

import { Code2Icon } from "lucide-react";
import React, { useRef } from "react";
import { Tabs } from "@/components/ui/acTabs";
import DevelopmentStackTab from "./DevelopmentStackTab";
import ToolsStackTab from "./ToolsStackTab";
import { BrowserView, MobileView } from "react-device-detect";
import MobileStack from "./MobileStack";
const Stack = () => {
  const tabs = [
    {
      title: "Development",
      value: "dev",
      content: <DevelopmentStackTab />,
    },
    {
      title: "Tools",
      value: "tools",
      content: <ToolsStackTab />,
    },
  ];

  return (
    <section className="lg:container w-full flex flex-col gap-12 ">
      <div className="flex items-center  gap-2">
        <Code2Icon size={28} />
        <h2 className="   text-3xl font-semibold tracking-wider ">Stack</h2>
      </div>

      <BrowserView>
        <div
          className={`relative h-[40em]  flex flex-col [perspective:1000px]   mx-auto w-full sd  items-start justify-start `}
        >
          <Tabs activeTabClassName="bg-blue-400" tabs={tabs} />
        </div>
      </BrowserView>
      <MobileView>
        <MobileStack />
      </MobileView>
    </section>
  );
};

export default Stack;
