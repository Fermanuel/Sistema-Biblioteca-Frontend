import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <SidebarTrigger />
            <main className="flex flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }
  