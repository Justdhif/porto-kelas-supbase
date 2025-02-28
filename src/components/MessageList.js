"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

export default function MessageList() {
  const [messages, setMessages] = useState([]);

  // ✅ Ambil pesan dari `secret_messages`
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("secret_messages")
        .select("id, sender, message, timestamp, recipient_id, list_name(name)")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Gagal mengambil pesan:", error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();
  }, []);

  return (
    <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Pesan Rahasia Terkirim</h3>
      <div className="max-h-60 overflow-y-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="p-3 border-b">
              <p>
                {msg.sender} → {msg.list_name?.name || "Tidak diketahui"}
              </p>
              <p>{msg.message}</p>
            </div>
          ))
        ) : (
          <p>Belum ada pesan.</p>
        )}
      </div>
    </motion.div>
  );
}
