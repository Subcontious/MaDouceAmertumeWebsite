"use client";

import { motion } from "framer-motion";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 mx-auto top-15 w-max px-6 py-3 rounded-xl shadow-lg text-white z-50 cursor-pointer ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      onClick={onClose}
    >
      {message}
    </motion.div>
  );
}