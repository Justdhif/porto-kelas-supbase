"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Send, Users } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function ContactForm({ onMessageSent }) {
  const [userName, setUserName] = useState("");
  const [recipient, setRecipient] = useState(""); // ID penerima
  const [recipientsList, setRecipientsList] = useState([]); // List penerima
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Cek apakah user sudah login dan ambil nama user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data: user, error } = await supabase.auth.getUser();
      if (error || !user) return;

      setUserName(user.user_metadata?.name || "User");
      setIsLoggedIn(true);
    };

    fetchUser();
  }, []);

  // ✅ Ambil daftar nama dari `list_name`
  useEffect(() => {
    const fetchNames = async () => {
      const { data, error } = await supabase
        .from("list_name")
        .select("id, name");
      if (error) {
        console.error("Gagal mengambil daftar nama:", error);
      } else {
        setRecipientsList(data);
        if (data.length > 0) {
          setRecipient(data[0].id); // Default ke ID pertama
        }
      }
    };

    fetchNames();
  }, []);

  // ✅ Fungsi untuk mengirim pesan
  const sendMessage = async () => {
    if (!message) {
      alert("Pesan tidak boleh kosong!");
      return;
    }

    const newMessage = {
      sender: userName,
      recipient_id: recipient,
      message,
      timestamp: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("secret_messages")
      .insert([newMessage]);

    if (error) {
      console.error("Gagal mengirim pesan:", error);
      alert("Gagal mengirim pesan: " + error.message);
    } else {
      alert("Pesan berhasil dikirim!");
      setMessage("");
      onMessageSent(); // Refresh pesan yang ditampilkan
    }
  };

  // ✅ Jika belum login, tampilkan pesan
  if (!isLoggedIn) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4 text-center text-red-500">
          Anda harus login untuk mengirim pesan!
        </h2>
        <Link
          href="/login"
          className="bg-blue-500 dark:bg-purple-500 text-white px-4 py-2 rounded"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users size={20} /> Kirim Pesan Rahasia
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-3">
        Nama Anda: <strong>{userName}</strong>
      </p>
      <select
        className="w-full p-2 border rounded-md mb-3 bg-gray-100 dark:bg-gray-700"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      >
        {recipientsList.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </select>
      <textarea
        className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700"
        rows="4"
        placeholder="Tulis pesanmu di sini..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <motion.button
        onClick={sendMessage}
        className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Send size={18} className="mr-2" /> Kirim Pesan
      </motion.button>
    </motion.div>
  );
}
