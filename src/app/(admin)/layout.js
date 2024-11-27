import AdminNavbar from "@/components/custom/AdminNavbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children, metadata }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <main>
          <AdminNavbar />
          {children}
        </main>
      </body>
    </html>
  );
}

export const metadata = {
  title: "MilteHe. | Admin Panel",
  description: "This is a custom description for the page.",
  // Add other metadata here (e.g., Open Graph, Twitter card)
};
