"use client";

import * as React from "react";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Search,
  PlusSquare,
  Star,
  ArrowDownUp,
  Plus,
  Undo,
  History,
  Users,
  UserPlus,
  List,
  Activity,
  BarChart,
  FileText,
  LineChart,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { NavMain } from "@/components/navMain/nav-main";
import { NavUser } from "@/components/navUser/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Mapeo de iconos del backend (en string) a componentes LucideIcon.
const iconMapping: Record<string, LucideIcon> = {
  home: Home,
  dashboard: LayoutDashboard,
  book: BookOpen,
  search: Search,
  new: PlusSquare,
  star: Star,
  exchange: ArrowDownUp,
  plus: Plus,
  undo: Undo,
  history: History,
  users: Users,
  "user-plus": UserPlus,
  "user-list": List,
  activity: Activity,
  "chart-bar": BarChart,
  "file-alt": FileText,
  "chart-line": LineChart,
  cogs: Settings,
};

// Tipado de la respuesta del backend.
type BackendMenu = {
  id: number;
  label: string;
  icon: string;
  submenus: {
    label: string;
    url: string;
    icon: string;
  }[];
};

// Ejemplo de data recibida del backend.
const backendMenus: BackendMenu[] = [
  {
    id: 1,
    label: "Inicio",
    icon: "home",
    submenus: [
      {
        label: "Bienvenida",
        url: "/inicio/bienvenida",
        icon: "dashboard",
      },
    ],
  },
  {
    id: 2,
    label: "Catálogo de Libros",
    icon: "book",
    submenus: [
      { label: "Buscar Libros", url: "/catalogo/buscar", icon: "search" },
      { label: "Nuevos Arribos", url: "/catalogo/nuevos", icon: "new" },
      { label: "Libros Populares", url: "/catalogo/populares", icon: "star" },
    ],
  },
  {
    id: 3,
    label: "Préstamos y Devoluciones",
    icon: "exchange",
    submenus: [
      { label: "Nuevo Préstamo", url: "/prestamos/nuevo", icon: "plus" },
      { label: "Devolver Libro", url: "/prestamos/devolver", icon: "undo" },
      { label: "Historial de Préstamos", url: "/prestamos/historial", icon: "history" },
    ],
  },
  {
    id: 4,
    label: "Usuarios",
    icon: "users",
    submenus: [
      { label: "Registrar Usuario", url: "/usuarios/registrar", icon: "user-plus" },
      { label: "Listado de Usuarios", url: "/usuarios/listado", icon: "user-list" },
      { label: "Actividades del Usuario", url: "/usuarios/actividades", icon: "activity" },
    ],
  },
  {
    id: 5,
    label: "Reportes",
    icon: "chart-bar",
    submenus: [
      { label: "Reporte de Préstamos", url: "/reportes/prestamos", icon: "file-alt" },
      { label: "Reporte de Usuarios", url: "/reportes/usuarios", icon: "file-alt" },
      { label: "Estadísticas Generales", url: "/reportes/estadisticas", icon: "chart-line" },
    ],
  },
  {
    id: 6,
    label: "Configuración",
    icon: "cogs",
    submenus: [
      // Agrega aquí los submenus de configuración según la respuesta.
    ],
  },
];

// Función para transformar la data del backend en el formato que espera NavMain.
function mapBackendMenus(menus: BackendMenu[]) {
  return menus.map((menu) => ({
    title: menu.label,         // label → title
    url: "#",                  // Asigna una URL por defecto para el menú padre (ajústalo si lo requieres)
    icon: iconMapping[menu.icon] || Home, // Mapea el icono; si no existe, usa Home.
    isActive: false,           // Aquí puedes ajustar la lógica para marcar algún menú activo.
    items: menu.submenus.map((sub) => ({
      title: sub.label,
      url: sub.url,
    })),
  }));
}

const adaptedNavMain = mapBackendMenus(backendMenus);

// Datos de usuario de ejemplo.
const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Aquí puedes incluir tu logo o título */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adaptedNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
