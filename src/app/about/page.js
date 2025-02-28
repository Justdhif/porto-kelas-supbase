"use client";

import { motion, useInView } from "framer-motion";
import { Instagram, MessageCircle, Send } from "lucide-react";
import { useRef } from "react";
import StudentSection from "../../components/StudentSection";

export default function About() {
  // Gunakan useRef untuk referensi elemen
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-center px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 py-20"
      >
        <div className="w-full max-w-3xl p-8 rounded-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Tentang Kelas XI RPL 4
          </h1>
          <p className="mt-4 text-white text-sm sm:text-base">
            Kami adalah kelas yang penuh semangat dalam belajar dan berkembang
            bersama.
          </p>
        </div>
      </motion.div>

      {/* Siapa Kami? */}
      <div
        ref={sectionRef}
        className="w-full flex flex-col md:flex-row items-center justify-around px-6 md:px-20 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Siapa Kami?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base text-justify">
            Kami adalah kumpulan siswa yang antusias dalam mengeksplorasi dunia
            teknologi. Dengan semangat inovasi, kami berkolaborasi dalam
            berbagai proyek untuk mengembangkan keterampilan dan pengetahuan
            kami.
          </p>

          {/* Contact Icons */}
          <div className="mt-4 flex justify-center md:justify-start space-x-6">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 hover:bg-pink-700 text-white py-2 px-3 rounded-lg flex items-center gap-1 transition-all text-sm"
            >
              <Instagram size={16} /> Instagram
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded-lg flex items-center gap-1 transition-all text-sm"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-lg flex items-center gap-1 transition-all text-sm"
            >
              <Send size={16} /> Telegram
            </a>
          </div>
        </motion.div>

        {/* Logo Kelas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-2 space-x-5"
        >
          <img
            src="/images/gallery/1.jpg"
            alt="Logo XI RPL 4"
            className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-2 border-blue-600 shadow-md"
          />
          <img
            src="/images/gallery/2.jpg"
            alt="Logo XI RPL 4"
            className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-2 border-blue-600 shadow-md"
          />
        </motion.div>
      </div>

      {/* Student Section */}
      <StudentSection />
    </div>
  );
}
