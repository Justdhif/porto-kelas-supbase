"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Send, Search } from "lucide-react";

const teacher = {
  name: "Bu Shova al Marwah",
  role: "Wali Kelas",
  image: "/images/bu_shova.jpg",
  whatsapp: "https://wa.me/628123456789",
  instagram: "https://instagram.com/bu.guru",
  telegram: "https://t.me/buguru",
};

const students = [
  "Adrian Fatih Nur Muhammad",
  "Ahmad Radhwa Supriyadi",
  "Ahza Rafif Kamal",
  "Ali Zavier Haikel Alkatiri",
  "Alisa Normalinda",
  "Andini Azzahra Puspita",
  "Andyto Murti Pangudi Hudianto",
  "Anugrah Luhur P",
  "Arief Dwi Wicaksono",
  "Damar Raditya",
  "Darrel Dzakwan",
  "Dhaniswara Fadhlurahman",
  "Dimas Dwi Ananda Putra",
  "Hanif M Yasfa",
  "Hendra",
  "Ibnu Tidar Pamungkas",
  "Kafka Sutikno",
  "Keisha Aurelia Rifai",
  "Keysha Al Hidayah",
  "M. Fathir Abdul Salam",
  "M. Vito Devara Ramadhan",
  "Maizza Raflee Arviansyah",
  "Muhammad Fahri Ramadhan",
  "Muhammad Farrell Raziq",
  "Muhammad Fattah Q.J",
  "Muhammad Gifari",
  "Muhammad Kemal Yahya",
  "Nadhif Ararya",
  "Nafisah Yulia Rahmah",
  "Nazzua Aqillah",
  "Pasha Maulana Akbar",
  "Rai Handitya Musopan",
  "Rajendra Mahadana W.D",
  "Refalina Cahaya Kamilah",
  "Ridwan Hamid Siregar",
  "Rifqi Agus Pratama",
  "Rizky Oryza Rahmanekha",
  "Tiara Azita Safitri",
  "Syadza",
  "Zahrah Nur Aini",
].map((name, index) => ({
  name,
  role: `Absen ${index + 1}`,
  image: `/images/student/${index + 1}.jpg`, // Pastikan file gambar tersedia
  whatsapp: "",
  instagram: "",
  telegram: "",
}));

export default function StudentCards() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-12 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8"
      >
        Struktur Kelas XI RPL 4
      </motion.h2>

      {/* Guru */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700 max-w-sm mx-auto mb-8"
      >
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-32 h-32 rounded-full mx-auto shadow-md border-2 border-blue-600 object-cover"
        />
        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
          {teacher.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{teacher.role}</p>

        {/* Kontak Button */}
        <div className="flex justify-center gap-2 mt-4">
          <a
            href={teacher.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-lg flex items-center gap-1 transition-all text-sm"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a
            href={teacher.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 hover:bg-pink-700 text-white py-1 px-3 rounded-lg flex items-center gap-1 transition-all text-sm"
          >
            <Instagram size={16} /> Instagram
          </a>
          <a
            href={teacher.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-lg flex items-center gap-1 transition-all text-sm"
          >
            <Send size={16} /> Telegram
          </a>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Cari siswa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <Search
          size={20}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
        />
      </div>

      {/* Grid Siswa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden p-6 text-center border border-gray-200 dark:border-gray-700"
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-28 h-28 rounded-full mx-auto shadow-md border-2 border-blue-600 object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                {student.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{student.role}</p>

              {/* Kontak Button */}
              <div className="flex justify-center gap-2 mt-4">
                <a
                  href={student.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-lg flex items-center gap-1 transition-all text-sm"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href={student.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-500 hover:bg-pink-700 text-white py-1 px-3 rounded-lg flex items-center gap-1 transition-all text-sm"
                >
                  <Instagram size={16} /> Instagram
                </a>
                <a
                  href={student.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-lg flex items-center gap-1 transition-all text-sm"
                >
                  <Send size={16} /> Telegram
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Tidak ada siswa yang ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}
