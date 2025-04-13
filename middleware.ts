export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/catalogo/:path*", 
    "/inicio/:path*", 
    "/prestamos/:path*",
    "/reportes/:path*",
    "/usuarios/:path*",
  ],
};