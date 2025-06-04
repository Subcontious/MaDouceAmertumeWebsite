"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useAuth } from "../app/context/authContext";

export default function HeaderNavigation() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/produtos">Produtos</Link>
        {!isAuthenticated && <Link href="/login">Login</Link>}
        <Link href="/contato">Contato</Link>
        <Link href="/checkout">Carrinho</Link>
        <Link href="/forum">Fórum</Link>
      </div>

      {isAuthenticated && (
        <Link href="/perfil" className="ml-auto">
          <User className="w-6 h-6 text-white hover:text-red-500" />
        </Link>
      )}
    </nav>
  );
}
