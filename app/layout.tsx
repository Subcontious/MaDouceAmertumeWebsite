import "../styles/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { CartProvider } from "./context/cartContext";
import { AuthProvider } from "./context/authContext";
import { User } from "lucide-react";
import HeaderNavigation from "../components/HeaderNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ma Douce Amertume",
  description: "Ma Douce Amertume Official Website!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} text-white bg-gradient-to-t from-red-900/60 via-black to-black`}>
        <AuthProvider>
          <CartProvider>
            <header className="p-4 bg-black/30 backdrop-blur-md rounded-b-2xl">
              <HeaderNavigation />
            </header>

            <main className="min-h-screen">{children}</main>

            <footer className="p-4 bg-transparent-800 text-center">
              &copy; {new Date().getFullYear()} @Ma Douce Amertume. All right's reserved.
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
