"use client";

import { motion } from "framer-motion";
import { LogOut, UserCircle, Settings, Star, ShieldCheck, ShoppingBag, CreditCard, History } from "lucide-react";
import { Button, Card, CardBody, Divider, Avatar } from "@nextui-org/react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PerfilPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [userData] = useState({
    name: "Usuário",
    email: "usuario@gmail.com",
    joinDate: new Date().getUTCFullYear(), 
    orders: 5,
    favorites: 12
  });

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const menuItems = [
    { icon: <Settings className="w-5 h-5" />, label: "Configurações", color: "text-blue-400" },
    { icon: <ShoppingBag className="w-5 h-5" />, label: "Meus Pedidos", color: "text-purple-400" },
    { icon: <Star className="w-5 h-5" />, label: "Favoritos", color: "text-yellow-400", count: userData.favorites },
    { icon: <CreditCard className="w-5 h-5" />, label: "Pagamentos", color: "text-green-400" },
    { icon: <History className="w-5 h-5" />, label: "Histórico", color: "text-gray-400" },
    { icon: <ShieldCheck className="w-5 h-5" />, label: "Segurança", color: "text-emerald-400" }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Meu <span className="bg-clip-text">Perfil</span>
          </h1>
          <p className="text-gray-400 max-w-md text-center">
            Gerencie suas informações, pedidos e preferências
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="bg-zinc-900/80 backdrop-blur-lg border border-white/10 p-6 h-full">
                <CardBody className="flex flex-col items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                    className="relative"
                  >
                    <Avatar
                      icon={<UserCircle className="w-20 h-20" />}
                      className="w-32 h-32 text-red-500 bg-zinc-800/50 border-2 border-red-500/30"
                    />
                    {isHovering && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
                      >
                        <span className="text-xs font-semibold text-white">Alterar</span>
                      </motion.div>
                    )}
                  </motion.div>

                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                    <p className="text-gray-400 text-sm">{userData.email}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Membro desde {userData.joinDate}
                    </p>
                  </div>

                  <div className="flex gap-4 w-full justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{userData.orders}</div>
                      <div className="text-xs text-gray-400">Pedidos</div>
                    </div>
                    <Divider orientation="vertical" className="h-10 bg-gray-700" />
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{userData.favorites}</div>
                      <div className="text-xs text-gray-400">Favoritos</div>
                    </div>
                  </div>

                  <Divider className="my-2 bg-gray-700" />

                  <Button
                    onPress={handleLogout}
                    color="danger"
                    variant="ghost"
                    className="w-full font-medium"
                    startContent={<LogOut className="w-5 h-5" />}
                  >
                    Sair da Conta
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-zinc-900/80 backdrop-blur-lg border border-white/10">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Minha Conta</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="flat"
                        className={`h-16 justify-start bg-zinc-800/50 hover:bg-zinc-700/50 ${item.color}`}
                        startContent={
                          <div className={`p-2 rounded-full ${item.color.replace('text', 'bg')}/20`}>
                            {item.icon}
                          </div>
                        }
                        onPress={() => router.push(`/`)}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.label}</span>
                          {item.count && (
                            <span className="text-xs text-gray-400">{item.count} itens</span>
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Card className="bg-zinc-900/80 backdrop-blur-lg border border-white/10">
                <CardBody className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Atividade Recente</h3>
                    <Button size="sm" variant="light" className="text-red-400">
                      Ver tudo
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2].map((item) => (
                      <div key={item} className="flex items-center gap-4 p-3 hover:bg-zinc-800/50 rounded-lg transition-colors">
                        <div className="bg-red-500/10 p-3 rounded-full">
                          <ShoppingBag className="w-5 h-5 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">Pedido #{1000 + item}</h4>
                          <p className="text-xs text-gray-400">{(new Date()).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">R$ {(150 * item).toFixed(2)}</p>
                          <p className={`text-xs ${item === 1 ? 'text-green-400' : 'text-yellow-400'}`}>
                            {item === 1 ? 'Entregue' : 'Em transporte'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}