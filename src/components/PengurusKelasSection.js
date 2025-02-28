"use client";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Send } from "lucide-react";

export default function PengurusKelasSection() {
  const pengurus = [
    {
      name: "Shova al marwah",
      role: "Wali Kelas",
      image: "/images/bu_shova.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Adrian",
      role: "Ketua Kelas",
      image: "/images/student/1.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Nadhif",
      role: "Wakil Ketua",
      image: "/images/student/28.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Dimas",
      role: "Sekretaris",
      image: "/images/student/13.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Nazzua",
      role: "Sekretaris",
      image: "/images/student/30.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Alisa",
      role: "Bendahara",
      image: "/images/student/5.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Rajendra",
      role: "Bendahara",
      image: "/images/student/33.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Zahra",
      role: "Bendahara",
      image: "/images/student/40.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Refalina",
      role: "Kebersihan",
      image: "/images/student/34.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Vito",
      role: "Kebersihan",
      image: "/images/student/21.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Ridwan",
      role: "Keamanan",
      image: "/images/student/35.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
    {
      name: "Damar",
      role: "Keamanan",
      image: "/images/student/10.jpg",
      whatsapp: "",
      instagram: "",
      telegram: "",
    },
  ];

  return (
    <div className="py-16 px-5 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
        >
          Pengurus Kelas
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pengurus.map((pengurus, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center"
            >
              <img
                src={pengurus.image}
                alt={pengurus.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-500"
              />
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-4">
                {pengurus.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {pengurus.role}
              </p>

              {/* Social Media Icons */}
              <div className="flex justify-center gap-3 mt-4 px-2">
                <a
                  href={pengurus.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
                <a
                  href={pengurus.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition flex items-center gap-2"
                >
                  <Instagram size={20} />
                  Instagram
                </a>
                <a
                  href={pengurus.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <Send size={20} />
                  Telegram
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
