import React from "react";

import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";

import Header from "@/src/components/Header";
import AppSidebar from "@/src/components/AppSidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
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
