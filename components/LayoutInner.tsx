"use client";

import Link from "next/link";
import { CarrinhoButton } from "./CarrinhoButton";
import { MiniCart } from "./MiniCart";
import { useState } from "react";

export function LayoutInner({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <nav className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/produtos">Produtos</Link>
          <Link href="/login">Login</Link>
          <Link href="/contato">Contato</Link>
        </nav>

        <CarrinhoButton onClick={() => setIsCartOpen(true)} />
      </header>

      {isCartOpen && <MiniCart onClose={() => setIsCartOpen(false)} />}

      <main className="min-h-screen">{children}</main>

      <footer className="p-4 bg-gray-800 text-center">
        &copy; {new Date().getFullYear()} Site do Jogo. Todos os direitos reservados.
      </footer>
    </>
  );
}
