"use client"; // Pastikan komponen ini adalah Client Component
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Send } from "lucide-react";

export default function Footer () {
  const controls = useAnimation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });
  }, [controls]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Terima kasih telah berlangganan dengan email: ${email}`);
    setEmail("");
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-10 border-t border-gray-300 dark:border-gray-700"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Tentang Kelas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-3">Tentang Kelas</h3>
          <p className="text-sm">
            Kami adalah kelas yang penuh semangat dalam belajar dan berkembang
            bersama di dunia teknologi.
          </p>
        </motion.div>

        {/* Navigasi Cepat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-3">Navigasi Cepat</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-500">
                About
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-blue-500">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Form Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-3">Berlangganan</h3>
          <p className="text-sm mb-3">
            Dapatkan update terbaru langsung ke email kamu.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Masukkan email"
              className="p-2 w-full border rounded-md text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            >
              <Send size={20} />
            </button>
          </form>
        </motion.div>

        {/* Sosial Media */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-bold mb-3">Ikuti Kami</h3>
          <div className="flex gap-4">
            <Link
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
            >
              <Facebook size={24} />
            </Link>
            <Link
              href="#"
              className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-md"
            >
              <Twitter size={24} />
            </Link>
            <Link
              href="#"
              className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-md"
            >
              <Instagram size={24} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        transition={{ delay: 1 }}
        className="text-center mt-8 border-t border-gray-300 dark:border-gray-700 pt-4"
      >
        <p>
          © {new Date().getFullYear()} Portofolio Kelas. All Rights Reserved.
        </p>
      </motion.div>
    </motion.footer>
  );
};
