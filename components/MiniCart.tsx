"use client";
import { motion, AnimatePresence } from "framer-motion";

export function MiniCart({ cartItems, onRemove, onClose }: any) {
  return (
    <div className="bg-black bg-opacity-80 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl mb-2">Carrinho</h2>
      <AnimatePresence>
        {cartItems.map((item: any) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex justify-between items-center mb-2"
          >
            <span>{item.nome}</span>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-400 hover:text-red-600"
            >
              Remover
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        onClick={onClose}
        className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
      >
        Fechar
      </button>
    </div>
  );
}
