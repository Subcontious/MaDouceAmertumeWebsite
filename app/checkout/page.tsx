"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { Button, Card, CardBody, Divider, Image, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Toast } from "../../components/Toast";

export default function CarrinhoPage() {
  const { cart, removeFromCart, addToCart, removeAllFromCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{message: string, type: "success" | "error"} | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(logged === "true");
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const calcularTotalItem = (preco: string, quantidade: number) => {
    const precoNumerico = parseFloat(preco.replace("R$", "").replace(",", ".").trim());
    return precoNumerico * quantidade;
  };

  const calcularTotalCarrinho = () => {
    return cart.reduce((total, item) => total + calcularTotalItem(item.produto.preco, item.quantidade), 0);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      showToast("⚠️ Você precisa estar logado para finalizar a compra!", "error");
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showToast("✅ Compra realizada com sucesso!", "success");
    cart.forEach((item) => removeAllFromCart(item.produto));
    
    setTimeout(() => {
      router.push("/");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black overflow-hidden">
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      <header className="p-4 border-a border-red-900/30">
        <div className="container mx-auto flex justify-between items-center">
          <Button
            isIconOnly
            variant="light"
            className="text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft size={24} />
          </Button>
          
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag size={24} />
            Meu Carrinho
          </h1>
          
          <div className="w-8"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <ShoppingBag size={48} className="text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-400 mb-6">Adicione itens para começar a comprar</p>
            <Button
              color="danger"
              variant="shadow"
              onClick={() => router.push("/produtos")}
              className="font-medium"
            >
              Ver Produtos
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.produto.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-zinc-900/80 backdrop-blur-sm border border-white/10">
                    <CardBody className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={item.produto.imagem}
                            alt={item.produto.nome}
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-white">{item.produto.nome}</h3>
                          <p className="text-red-400 font-medium">{item.produto.preco}</p>
                          
                          <div className="flex items-center mt-3 gap-4">
                            <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                              <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                onClick={() => removeFromCart(item.produto)}
                                className="text-white hover:bg-gray-800"
                              >
                                <Minus size={16} />
                              </Button>
                              <span className="px-4 text-white">{item.quantidade}</span>
                              <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                onClick={() => addToCart(item.produto)}
                                className="text-white hover:bg-gray-800"
                              >
                                <Plus size={16} />
                              </Button>
                            </div>
                            
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onClick={() => removeAllFromCart(item.produto)}
                              className="text-red-500 hover:text-red-400 ml-auto"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <Card className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 sticky top-4">
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">
                        R$ {calcularTotalCarrinho().toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Frete</span>
                      <span className="text-white">Grátis</span>
                    </div>
                    
                    <Divider className="my-4 bg-gray-700" />
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Total</span>
                      <span className="text-xl font-bold text-white">
                        R$ {calcularTotalCarrinho().toFixed(2)}
                      </span>
                    </div>
                    
                    <Button
                      color="danger"
                      size="lg"
                      className="w-full mt-6 font-bold"
                      onPress={handleCheckout}
                      isLoading={isLoading}
                      spinner={<Spinner color="white" size="sm" />}
                    >
                      {isLoading ? "Processando..." : "Finalizar Compra"}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}