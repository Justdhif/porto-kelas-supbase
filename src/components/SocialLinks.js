"use client";

import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <motion.a
        href="#"
        className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Instagram size={20} /> Instagram
      </motion.a>
      <motion.a
        href="#"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Mail size={20} /> Email
      </motion.a>
    </div>
  );
}
