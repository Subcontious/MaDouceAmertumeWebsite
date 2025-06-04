"use client";

import { MenuItem } from "@nextui-org/react";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
}

interface CartItem {
  produto: Produto;
  quantidade: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (produto: Produto) => void;
  removeFromCart: (produto: Produto) => void;
  getQuantityInCart: (produtoId: number) => number;
  removeAllFromCart: (produto: Produto) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (produto: Produto) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.produto.id === produto.id);
      if (existingItem) {
        return prev.map(item =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const removeFromCart = (produto: Produto) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.produto.id === produto.id);
      if (existingItem) {
        if (existingItem.quantidade === 1) {
          return prev.filter(item => item.produto.id !== produto.id);
        } else {
          return prev.map(item =>
            item.produto.id === produto.id
              ? { ...item, quantidade: item.quantidade - 1 }
              : item
          );
        }
      }
      return prev;
    });
  };

  const removeAllFromCart = (produto: Produto) => {
    setCart((prev) => {
      return prev.map(item =>
        item.produto.id === produto.id
          ? { ...item, quantidade: 0 }  
          : item 
      ).filter(item => item.quantidade > 0);
    });
  };


  const getQuantityInCart = (produtoId: number) => {
    const item = cart.find(item => item.produto.id === produtoId);
    return item ? item.quantidade : 0;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getQuantityInCart, removeAllFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
