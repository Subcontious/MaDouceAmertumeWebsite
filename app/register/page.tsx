"use client";

import { useState } from "react";
import { Input, Button, Card, CardBody, Divider, Spinner } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { usuariosFake } from "../lib/users";
import Link from "next/link";
import { Toast } from "../../components/Toast";
import { useRouter } from "next/navigation";
import { UserIcon, MailIcon, LockIcon } from "lucide-react";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!nome || !email || !senha || !confirmarSenha) {
      showToast("❌ Todos os campos são obrigatórios.", "error");
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(email.trim())) {
      showToast("❌ Email inválido: formato incorreto.", "error");
      setIsLoading(false);
      return;
    }

    if (senha !== confirmarSenha) {
      showToast("❌ As senhas não coincidem.", "error");
      setIsLoading(false);
      return;
    }

    const existe = usuariosFake.find((u) => u.email === email);
    if (existe) {
      showToast("❌ Email já cadastrado.", "error");
      setIsLoading(false);
      return;
    }

    usuariosFake.push({ email, senha });
    showToast("✅ Conta criada com sucesso! Redirecionando...", "success");
    
    setTimeout(() => {
      router.push("/login");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-black/80 to-black/90"></div>
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
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
      </div>

      <AnimatePresence>
        {toast && (
          <Toast 
            key={toast.message} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      <section className="relative flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card 
            className="bg-zinc-900/80 backdrop-blur-lg border border-red-900/50 shadow-2xl"
            isBlurred
          >
            <CardBody className="p-8">
              <div className="flex flex-col items-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg">
                    <UserIcon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                
                <h1 className="text-3xl font-bold text-white mb-2">Criar Nova Conta</h1>
                <p className="text-gray-400 text-sm">Preencha seus dados para se registrar</p>
              </div>

              <form className="flex flex-col gap-6" onSubmit={handleRegister}>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  labelPlacement="outside"
                  startContent={<UserIcon className="w-5 h-5 text-gray-400" />}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  classNames={{
                    input: "text-white",
                    label: "text-gray-300",
                  }}
                />

                <Input
                  type="email"
                  placeholder="Seu email"
                  labelPlacement="outside"
                  startContent={<MailIcon className="w-5 h-5 text-gray-400" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  classNames={{
                    input: "text-white",
                    label: "text-gray-300",
                  }}
                />

                <Input
                  placeholder="Sua senha secreta"
                  labelPlacement="outside"
                  startContent={<LockIcon className="w-5 h-5 text-gray-400" />}
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  classNames={{
                    input: "text-white",
                    label: "text-gray-300",
                  }}
                />

                <Input
                  placeholder="Digite a senha secreta novamente"
                  labelPlacement="outside"
                  startContent={<LockIcon className="w-5 h-5 text-gray-400" />}
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  classNames={{
                    input: "text-white",
                    label: "text-gray-300",
                  }}
                />

                <Button
                  type="submit"
                  className="h-12 bg-gradient-to-r from-red-600 to-red-800 text-lg font-semibold"
                  isLoading={isLoading}
                  spinner={<Spinner color="white" size="sm" />}
                >
                  {isLoading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </form>

              <Divider className="my-6 bg-gray-700" />

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Já tem uma conta?{" "}
                  <Link 
                    href="/login" 
                    className="text-red-400 font-medium hover:text-red-300 transition-colors"
                  >
                    Faça login
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}