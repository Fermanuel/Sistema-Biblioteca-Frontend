import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        console.log({credentials});

        const res = await fetch(

          `${process.env.NEXTAUTH_URL}api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        
        const user = await res.json();

        console.log(user);

        if (user.error) throw user;

        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };