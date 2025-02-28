"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturesSection() {
  const features = [
    {
      title: "Informasi Kelas",
      description:
        "Dapatkan informasi lengkap tentang struktur kelas, jadwal, dan materi pembelajaran.",
      color: "text-blue-600 dark:text-blue-400",
      link: "/about",
    },
    {
      title: "Gallery Kami",
      description:
        "Lihat berbagai kegiatan siswa yang telah dilakukan selama masa pembelajaran.",
      color: "text-purple-600 dark:text-purple-400",
      link: "/gallery",
    },
    {
      title: "Kontak Kami",
      description:
        "Hubungi kami untuk informasi lebih lanjut atau pertanyaan seputar kelas.",
      color: "text-pink-600 dark:text-pink-400",
      link: "/contact",
    },
  ];

  return (
    <div className="container mx-auto py-16 px-5">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
      >
        Fitur Kami
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={feature.link} className="block">
              <h3 className={`text-2xl font-bold ${feature.color} mb-4`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
