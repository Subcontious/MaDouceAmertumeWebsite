"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Produto as CartProduto } from "../app/context/cartContext";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useAuth } from "../app/context/authContext";

interface ProdutoCardProps {
  produto: CartProduto & { descricao?: string };
  onAddToCart: (produto: CartProduto) => void;
  onRemoveFromCart: (produto: CartProduto) => void;
  quantidadeNoCarrinho: number;
}

export function ProdutoCard({
  produto,
  onAddToCart,
  onRemoveFromCart,
  quantidadeNoCarrinho,
}: ProdutoCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleNavigate = () => {
    router.push(`/produtos/${produto.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    const cartProduto: CartProduto = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem
    };
    onAddToCart(cartProduto);
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartProduto: CartProduto = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem
    };
    onRemoveFromCart(cartProduto);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={handleNavigate}
      className="bg-black p-6 rounded-xl shadow-lg flex flex-col items-center cursor-pointer 
                border border-white/10 hover:border-white/20 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red-900/40 to-transparent z-0" />
      
      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="mb-4 rounded-lg overflow-hidden border border-white/10"
        >
          <img 
            src={produto.imagem} 
            alt={produto.nome} 
            className="w-40 h-40 object-cover"
          />
        </motion.div>

        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-white mb-1">{produto.nome}</h2>
          <p className="text-red-400 font-semibold">{produto.preco}</p>
          {'descricao' in produto && produto.descricao && (
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {produto.descricao}
            </p>
          )}
        </div>

        <div className="mt-auto w-full">
          {quantidadeNoCarrinho === 0 ? (
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="w-full py-2 bg-gradient-to-r from-red-700 to-red-800 text-white 
                        rounded-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Adicionar
            </motion.button>
          ) : (
            <div className="flex items-center justify-between bg-gray-900/80 rounded-lg p-1">
              <motion.button
                onClick={handleRemoveFromCart}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-red-900/70 rounded-lg text-white"
              >
                <Minus size={16} />
              </motion.button>

              <span className="font-medium text-white px-2">
                {quantidadeNoCarrinho}
              </span>

              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-green-700/80 rounded-lg text-white"
              >
                <Plus size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}