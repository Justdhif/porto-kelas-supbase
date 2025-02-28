"use client";

import { motion } from "framer-motion";
import ContactForm from "../../components/ContactForm";
import MessageList from "../../components/MessageList";
import SocialLinks from "../../components/SocialLinks";

export default function ContactPage() {
  return (
    <motion.div
      className="mx-auto pt-24 py-10 px-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg text-black dark:text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Hubungi Kami</h1>

      <SocialLinks />

      <div className="grid md:grid-cols-2 gap-6">
        <ContactForm onMessageSent={() => {}} />
        <MessageList />
      </div>
    </motion.div>
  );
}
