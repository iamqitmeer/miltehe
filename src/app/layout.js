import { Inter } from "next/font/google";
import "./globals.css";
import UserNavbar from "@/components/custom/UserNavbar";
const inter = Inter({ subsets: ["latin"] });
import { LazyMotion, domAnimation } from 'framer-motion'
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Event",
  description: 'Discover and join exciting events',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <LazyMotion features={domAnimation}>

        <UserNavbar />
        {children}
        <Toaster />
        </LazyMotion>

        </body>
    </html>
  );
}
