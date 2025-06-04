"use client";

import { ProdutoCard } from "../../components/ProdutoCard";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { ShoppingCart, LogIn } from "lucide-react";
import { Button } from "@nextui-org/react";

type Produto = {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  descricao?: string;
};

export default function ProdutosPage() {
  const { addToCart, removeFromCart, getQuantityInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const produtos: Produto[] = [
    { 
      id: 1, 
      nome: "Camiseta Exclusiva", 
      preco: "R$ 79,90", 
      imagem: "/ModeloPlusSize.png",
      descricao: "Camiseta premium com estampa exclusiva do jogo"
    },
    { 
      id: 2, 
      nome: "Caneca Colecionável", 
      preco: "R$ 39,90", 
      imagem: "/CanecaLys.png",
      descricao: "Caneca de alta qualidade da artwork oficial"
    },
    { 
      id: 3, 
      nome: "Chaveiro Temático", 
      preco: "R$ 24,90", 
      imagem: "/ChaveiroLys.png",
      descricao: "Chaveiro metálico com símbolo do jogo"
    },
  ];

  const handleAddToCart = (produto: Produto) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    const cartProduct = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem
    };
    addToCart(cartProduct);
  };

  const handleRemoveFromCart = (produto: Produto) => {
    const cartProduct = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem
    };
    removeFromCart(cartProduct);
  };

  return (
    <div className="min-h-screen bg-gradient-to-a from-red-900/20 via-black to-red p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Produtos Exclusivos
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Itens colecionáveis para os verdadeiros fãs de Ma Douce Amertume
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {produtos.map((produto, index) => (
          <motion.div
            key={produto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-red-900/30 transition-all hover:border-white/20">
              <ProdutoCard
                produto={produto}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                quantidadeNoCarrinho={getQuantityInCart(produto.id)}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-6 right-6"
      >
      </motion.div>
    </div>
  );
}