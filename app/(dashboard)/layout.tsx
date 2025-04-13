import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <main>
                {children}
            </main>
        </SidebarProvider>
    );
}