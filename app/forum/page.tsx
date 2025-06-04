'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { forumPosts } from "../../data/forum";
import { Input, Textarea, Button, Card, CardBody, Avatar, Divider, Chip } from "@nextui-org/react";
import { useAuth } from "../context/authContext";
import { MessageSquare, Heart, Bookmark, Share2, User, Send } from "lucide-react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ForumPost {
  id: number;
  titulo: string;
  autor: string;
  data: string;
  conteudo: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  avatar?: string;
}

interface UserData {
  username: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user?: UserData;
}

export default function ForumPage() {
  const { isAuthenticated, user } = useAuth() as AuthContextType;
  const [posts, setPosts] = useState<ForumPost[]>(() => 
    forumPosts.map(post => ({
      ...post,
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
      avatar: ""
    }))
  );
  
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [activeTab, setActiveTab] = useState<"recentes" | "populares">("recentes");
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handlePost = () => {
    if (!titulo || !conteudo) return;
    
    const novoPost: ForumPost = {
      id: Date.now(),
      titulo,
      autor: user?.username || "Usuário",
      avatar: user?.avatar,
      data: new Date().toLocaleDateString('pt-BR'),
      conteudo,
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false
    };
    
    setPosts([novoPost, ...posts]);
    setTitulo("");
    setConteudo("");
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.likes + (post.isLiked ? -1 : 1),
            isLiked: !post.isLiked 
          } 
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked } 
        : post
    ));
  };

  const filteredPosts = activeTab === "recentes" 
    ? [...posts].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    : [...posts].sort((a, b) => b.likes - a.likes);

  return (
    <section className="min-h-screen bg-gradient-to-t from-red-900/60 via-black to-black px-4 py-12 sm:px-6 lg:px-8">
      {isClient && (
        <div className="fixed inset-0 overflow-hidden opacity-10 pointer-events-none">
          {[...Array(10)].map((_, i) => {
            const size = Math.random() * 10 + 5;
            return (
              <motion.div
                key={i}
                className="absolute bg-red-600 rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.3, 0],
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
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 relative">
              <Image 
                src="/LysForum.png" 
                alt="Lys emote" 
                fill
                className="object-contain"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold from-white mb-4">
              Fórum da Comunidade
            </h1>
            
            <div className="w-10 h-10 relative">
              <Image 
                src="/LysForum.png" 
                alt="Lys emote" 
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Converse com outros jogadores, compartilhe teorias e faça parte da comunidade Ma Douce Amertume
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex space-x-1 bg-gray-900/80 rounded-lg p-1 backdrop-blur-md border border-gray-800">
            <button
              onClick={() => setActiveTab("recentes")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "recentes" 
                  ? "bg-red-900/50 text-white shadow-sm shadow-red-900/30" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Mais Recentes
            </button>
            <button
              onClick={() => setActiveTab("populares")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "populares" 
                  ? "bg-red-900/50 text-white shadow-sm shadow-red-900/30" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Mais Populares
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <Card className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden">
            <CardBody className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="text-red-400" size={20} />
                Criar Novo Tópico
              </h2>
              
              {isAuthenticated ? (
                <>
                  <Input 
                    placeholder="Título do tópico" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    className="mb-4"
                    classNames={{
                      input: "text-white placeholder-gray-500",
                      inputWrapper: "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                    }}
                  />
                  <Textarea 
                    placeholder="Escreva seu post aqui..." 
                    value={conteudo} 
                    onChange={(e) => setConteudo(e.target.value)} 
                    minRows={4}
                    className="mb-4"
                    classNames={{
                      input: "text-white placeholder-gray-500",
                      inputWrapper: "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                    }}
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handlePost}
                      className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-medium"
                      endContent={<Send size={18} />}
                      isDisabled={!titulo || !conteudo}
                    >
                      Publicar
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-red-400 mb-4">⚠️ Você precisa estar logado para criar um tópico</p>
                  <Button 
                    className="bg-red-900/80 hover:bg-red-800 text-white font-medium"
                    onClick={() => router.push('/login')}
                  >
                    Fazer Login
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>

        <div className="space-y-6">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-gray-900/50 border border-gray-800 rounded-xl h-40 animate-pulse" />
              </motion.div>
            ))
          ) : (
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar
                          src={post.avatar}
                          icon={!post.avatar && <User className="text-gray-400" />}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-bold text-white">{post.titulo}</h3>
                            <Chip size="sm" variant="flat" color="danger" className="text-xs">
                              {post.data}
                            </Chip>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">Por {post.autor}</p>
                          <p className="text-gray-300 mb-4">{post.conteudo}</p>
                          
                          <Divider className="my-3 bg-gray-800" />
                          
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-4">
                              <button 
                                onClick={() => handleLike(post.id)}
                                className={`flex items-center space-x-1 text-sm ${post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
                              >
                                <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} />
                                <span>{post.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white">
                                <MessageSquare size={16} />
                                <span>{post.comments}</span>
                              </button>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleBookmark(post.id)}
                                className={`p-1 rounded-md ${post.isBookmarked ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`}
                              >
                                <Bookmark size={16} fill={post.isBookmarked ? 'currentColor' : 'none'} />
                              </button>
                              <button className="p-1 rounded-md text-gray-400 hover:text-white">
                                <Share2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}