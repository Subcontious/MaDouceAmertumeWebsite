"use client";

import { useCart } from "../app/context/cartContext";

interface CarrinhoButtonProps {
  onClick: () => void;
}

export function CarrinhoButton({ onClick }: CarrinhoButtonProps) {
  const { cart } = useCart();

  return (
    <button onClick={onClick} className="relative">
      🛒
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
          {cart.length}
        </span>
      )}
    </button>
  );
}
