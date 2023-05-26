// COMPONENTS
import SessionProvider from "~/components/contexts/sessionProvider";

// STYLES
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tasks by Neffrey",
  description: "Lil task manager I made for me and you <3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
