import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      console.log(pathname);
      if (pathname.startsWith("/note/edit")) return !!auth;
      return true;
    },
  },
});

// @/auth.ts
// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";

// export const {
//   handlers,
//   auth: nextAuth, // 重命名避免命名冲突
//   signIn,
//   signOut,
// } = NextAuth({
//   providers: [
//     GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: "/login", // 自定义登录页路径
//     error: "/auth/error",
//   },
//   callbacks: {
//     authorized({ auth, request }) {
//       // 权限校验逻辑（网页4方案优化）
//       const protectedPaths = ["/note/edit", "/dashboard"];
//       const isProtected = protectedPaths.some((path) =>
//         request.nextUrl.pathname.startsWith(path)
//       );
//       return isProtected ? !!auth?.user : true;
//     },
//   },
// });
