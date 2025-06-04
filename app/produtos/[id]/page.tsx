"use client";

import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../context/cartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";

interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  descricao: string;
  descricaoLonga: string;
  materiais: string;
  dimensoes: string;
  peso: string;
}

interface ProdutoNoCarrinho extends Produto {
  quantity: number;
}

const produtos: Produto[] = [
  { 
    id: 1, 
    nome: "Camiseta Exclusiva", 
    preco: "R$ 79,90", 
    imagem: "/ModeloPlusSize.png",
    descricao: "Camiseta premium com estampa exclusiva do jogo",
    descricaoLonga: "Camiseta 100% algodão com estampa em serigrafia. Edição limitada assinada pelos criadores.",
    materiais: "100% Algodão",
    dimensoes: "Tamanho único",
    peso: "200g"
  },
  { 
    id: 2, 
    nome: "Caneca Colecionável", 
    preco: "R$ 39,90", 
    imagem: "/CanecaLys.png",
    descricao: "Caneca de alta qualidade da artwork oficial",
    descricaoLonga: "Caneca maravilhosa para tomar café.",
    materiais: "Cêramica",
    dimensoes: "42cm x 59cm",
    peso: "100g"
  },
  { 
    id: 3, 
    nome: "Chaveiro Temático", 
    preco: "R$ 24,90", 
    imagem: "/ChaveiroLys.png",
    descricao: "Chaveiro metálico com a protagonista programando MDA",
    descricaoLonga: "Chaveiro em metal fundido com pintura esmaltada e detalhes em relevo. Resistente à oxidação.",
    materiais: "Metal e esmalte",
    dimensoes: "5cm x 3cm",
    peso: "50g"
  },
];

export default function ProdutoPage() {
  const { id } = useParams();
  const { addToCart, getQuantityInCart } = useCart();
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const produto = produtos.find(p => p.id === Number(id));

  useEffect(() => {
    if (!produto) {
      router.push("/produtos");
    }
  }, [produto, router]);

  if (!produto) return null;

  const handleAddToCart = () => {
    const produtoNoCarrinho: ProdutoNoCarrinho = {
      ...produto,
      quantity
    };
    addToCart(produtoNoCarrinho);
    setToast(`✅ ${produto.nome} adicionado ao carrinho!`);
    setTimeout(() => setToast(null), 2000);
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-red-900/20 to-black">
      <nav className="p-4 flex justify-between items-center border-b border-red-900/30">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Heart fill={isFavorite ? 'currentColor' : 'none'} size={20} />
          </button>
          <button 
            onClick={() => router.push('/checkout')}
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getQuantityInCart(produto.id)}
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 50, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-6 py-3 rounded-xl shadow-lg text-white z-50 bg-gradient-to-r from-green-600 to-green-700 flex items-center gap-2"
          >
            <span>{toast}</span>
            <button onClick={() => router.push('/checkout')} className="underline">
              Ver Carrinho
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-12"
        >
          <div className="lg:w-1/2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square bg-black rounded-xl overflow-hidden border border-white/10"
            >
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">{produto.nome}</h1>
              <p className="text-2xl font-semibold text-red-400 mb-6">{produto.preco}</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Descrição</h2>
                <p className="text-gray-300 mb-4">{produto.descricao}</p>
                <p className="text-gray-400">{produto.descricaoLonga}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h3 className="text-sm text-gray-500">Materiais</h3>
                  <p className="text-white">{produto.materiais}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Dimensões</h3>
                  <p className="text-white">{produto.dimensoes}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Peso</h3>
                  <p className="text-white">{produto.peso}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 bg-gray-800 text-white hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 bg-gray-900 text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 bg-gray-800 text-white hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Adicionar ao Carrinho
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}