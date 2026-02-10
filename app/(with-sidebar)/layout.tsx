import React from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import Header from "../components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-full flex flex-col overflow-hidden">
        <Header />
        <SidebarTrigger />
        <div className="flex-1 min-h-0 p-5 overflow-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default layout;
