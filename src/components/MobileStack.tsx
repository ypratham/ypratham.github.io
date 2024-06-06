import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DevelopmentStackTab from "./DevelopmentStackTab";
import ToolsStackTab from "./ToolsStackTab";

const MobileStack = () => {
  return (
    <Tabs defaultValue="development" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="development">Development</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
      </TabsList>
      <TabsContent value="development">
        <DevelopmentStackTab />
      </TabsContent>
      <TabsContent value="tools">
        <ToolsStackTab />
      </TabsContent>
    </Tabs>
  );
};

export default MobileStack;
