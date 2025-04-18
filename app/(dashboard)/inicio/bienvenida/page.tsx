'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

type UserType = {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
};

export default function BienvenidaPage() {
  const { data, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] w-full">
        <Skeleton className="w-[300px] h-[100px] rounded-xl" />
      </div>
    );
  }

  const user = (data?.user as { data: UserType })?.data;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Bienvenida</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de bienvenida */}
        <Card className="col-span-1 md:col-span-2 shadow-xl">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              ¡Bienvenido, {user?.first_name}!
            </h1>
            <p className="text-gray-600">
              Te has autenticado correctamente como:
            </p>
            <Badge variant="outline" className="text-sm">
              {user?.role}
            </Badge>
            <p className="text-sm text-gray-500">
              Correo: {user?.email}
            </p>
            <Button asChild className="w-full">
              <Link href="/dashboard">Ir al Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Otro bloque bento visual */}
        <Card className="shadow-md">
          <CardContent className="p-4 h-full flex items-center justify-center text-center">
            <p className="text-muted-foreground">Aquí puedes poner estadísticas, accesos rápidos, etc.</p>
          </CardContent>
        </Card>

        {/* Otro bloque visual */}
        <Card className="shadow-md col-span-1 md:col-span-3">
          <CardContent className="p-4">
            <p className="text-muted-foreground">Este espacio es ideal para noticias, logs de actividad o tips.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
