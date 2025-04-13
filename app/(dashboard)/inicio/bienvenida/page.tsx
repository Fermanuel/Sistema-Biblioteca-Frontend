'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

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
      <div className="flex items-center justify-center h-screen">
        <Skeleton className="w-[300px] h-[100px] rounded-xl" />
      </div>
    );
  }

  // 👇 Aquí forzamos a que `user` tenga la forma esperada
  const user = (data?.user as { data: UserType })?.data;

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            ¡Bienvenido, {user?.first_name}!
          </h1>
          <p className="text-gray-600">
            Te has autenticado correctamente como:
          </p>
          <Badge variant="outline" className="text-sm">
            {user?.role}
          </Badge>
          <p className="text-sm text-gray-500 mt-4">
            Correo: {user?.email}
          </p>
          <Button className="mt-6 w-full">Ir al Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
}
