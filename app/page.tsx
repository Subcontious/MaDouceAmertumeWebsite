"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      title: "Mundo Aberto Imersivo",
      description: "Explore cada canto da prestigiosa Université Saint Laurent",
    },
    {
      title: "Terror Psicológico Profundo",
      description: "Uma experiência que vai além dos sustos convencionais",
    },
    {
      title: "Narrativa Complexa",
      description: "Personagens com motivações obscuras e segredos sombrios",
    },
    {
      title: "Estética Expressionista",
      description: "Visual inspirado no cinema francês de vanguarda",
    },
    {
      title: "Trilha Sonora Original",
      description: "Composições que elevam a tensão a níveis insuportáveis",
    },
    {
      title: "Escolhas Impactantes",
      description: "Suas decisões alteram permanentemente o curso da história",
    }
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden opacity-10 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 8 + 2;
          return (
            <motion.div
              key={i}
              animate={{
                opacity: [0, 0.4, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
                transition: {
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 5
                }
              }}
            />
          );
        })}
      </div>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-8 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "backOut" }}
          className="w-full max-w-6xl h-[300px] sm:h-[400px] overflow-hidden relative rounded-xl shadow-2xl shadow-red-900/50 border border-red-900/30 mb-12"
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute w-full h-full object-cover"
            style={{ filter: "contrast(1.2) saturate(1.3)" }}
          >
            <source src="/logo.mp4" type="video/mp4" />
            <Image 
              src="/logo.png" 
              alt="Ma Douce Amertune" 
              fill 
              className="object-cover"
              priority
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Vermelho
            </span>{' '}
            <span className="text-white">fica perfeito em você</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Uma experiência imersiva de terror psicológico e paixão obsessiva
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Button
              size="lg"
              className="px-8 py-0 text-lg font-bold bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500"
              endContent={<ArrowRight className="w-5 h-5" />}
              onPress={() => router.push("/produtos")}
            >
              Ver Produtos
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col lg:flex-row gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="lg:w-1/2">
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold mb-8 text-white"
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Ma Douce Amertume</span> - Uma Jornada de Obsessão
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-300 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Iniciado em 2025, <span className="text-red-500 font-medium">Ma Douce Amertume</span> é uma experiência imersiva de terror psicológico que explora o amor obsessivo em sua forma mais crua. Ambientado na prestigiosa Université Saint Laurent, na França, o jogo combina elementos de mundo aberto com uma narrativa profundamente perturbadora.
              </motion.p>
            </div>
            
            <div className="lg:w-1/2 relative">
              <motion.div
                className="relative aspect-video rounded-xl overflow-hidden shadow-2xl shadow-red-900/20 border border-red-900/30"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Image
                  src="/Screenshot.png"
                  alt="Game Screenshot"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Uma Experiência <span className="text-red-600">Única</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Descubra o que torna Ma Douce Amertume diferente de tudo que você já jogou
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-zinc-900/70 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:border-red-900/50 transition-all hover:shadow-lg hover:shadow-red-900/10"
              >
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-red-900/20 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
                transition: {
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Junte-se à nossa comunidade no <span className="text-[#5865F2]">Discord</span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Receba atualizações exclusivas e converse com outros fãs
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="px-10 py-0 text-lg font-bold bg-[#5865F2] hover:bg-[#4752C4] text-white"
              onPress={() => window.open("https://discord.gg/seulink", "_blank")}
              startContent={
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              }
            >
              Entrar no Discord
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}