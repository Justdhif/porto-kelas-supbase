"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex items-center justify-center px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 py-20"
    >
      <div className="w-full max-w-3xl p-8 rounded-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          Selamat Datang di XI RPL 4
        </h1>
        <p className="mt-4 text-white text-sm sm:text-base">
          Temukan informasi lengkap tentang kelas kami, struktur, dan kegiatan
          yang kami lakukan.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md w-full sm:w-auto">
            Jelajahi Sekarang
          </button>
          <button className="border border-white text-white font-semibold py-2 px-4 rounded-lg w-full sm:w-auto">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </motion.div>
  );
}
