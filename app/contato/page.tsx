"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contactMethods = [
    {
      icon: <Mail className="text-red-400" size={24} />,
      title: "Email",
      value: "contatomadouce@gmail.com",
    },
    {
      icon: <Phone className="text-red-400" size={24} />,
      title: "Telefone",
      value: "+55 11 94002-8922",
    },
    {
      icon: <MapPin className="text-red-400" size={24} />,
      title: "Endereço",
      value: "Avenida Thomas Edison, 849, São Paulo-SP",
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/contato/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao enviar');
      }

      setStatus('success');
      setFormData({ nome: '', email: '', mensagem: '' });

    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro desconhecido'
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 overflow-hidden opacity-10 pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, i) => {
          return (
            <motion.div
              key={i}
              animate={{
                opacity: [0, 0.4, 0],
                transition: {
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-8 text-white"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                Fale Conosco
              </span>
            </motion.h1>

            <p className="text-lg text-gray-300 mb-12">
              Tem alguma dúvida, sugestão ou feedback? Entre em contato conosco através dos canais abaixo ou preencha o formulário.
            </p>

            <div className="space-y-6 mb-12">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }} 
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-zinc-900/50 transition-colors border border-white/5 hover:border-red-900/30 group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="p-3 bg-red-900/20 rounded-full group-hover:bg-red-900/30 transition-colors">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">{method.title}</h3>
                    <p className="text-white text-lg">{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="bg-zinc-900/70 backdrop-blur-sm p-6 rounded-xl border border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="text-red-500" size={24} />
                <h2 className="text-2xl font-bold text-white">Envie uma mensagem</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-zinc-800/50 text-white border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 focus:outline-none transition-all"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-zinc-800/50 text-white border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 focus:outline-none transition-all"
                  required
                />

                <textarea
                  name="mensagem"
                  rows={5}
                  placeholder="Sua mensagem..."
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-zinc-800/50 text-white border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 focus:outline-none transition-all"
                  required
                />

                <Button
                  type="submit"
                  endContent={<Send className="w-5 h-5" />}
                  className={`w-full py-2 text-lg font-bold ${status === 'loading' ? 'bg-red-500/50' : 'bg-gradient-to-r from-red-700 to-red-800'}`}
                  isDisabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>

                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-green-500 text-sm"
                  >
                    Mensagem enviada com sucesso!
                  </motion.p>
                )}

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-red-500 text-sm"
                  >
                    {errorMessage || 'Erro ao enviar mensagem.'}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hidden lg:block w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[720px] w-full">
              <Image
                src="/LysThinking.png"
                alt="Lys pensativa"
                fill
                className="object-contain object-right"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
