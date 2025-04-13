"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  console.log({session, status});

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p>Signed in as {session.user?.email}</p>
        <Button onClick={() => signOut()} variant="destructive">
          Sign out
        </Button>
      </div>
    );
  }
}
