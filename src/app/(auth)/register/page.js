"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import zxcvbn from "zxcvbn";
import { motion } from "framer-motion"; // Import Framer Motion untuk animasi

export default function Register() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  // Fungsi untuk mengevaluasi kekuatan password
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = zxcvbn(newPassword);
    setPasswordStrength(strength.score); // Score dari 0 (lemah) sampai 4 (sangat kuat)
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (passwordStrength < 3) {
      setMessage(
        "Password terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol."
      );
      return;
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const { error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword }]);

    if (error) {
      setMessage(`Registrasi gagal: ${error.message}`);
      return;
    }

    setMessage("Registrasi berhasil!");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  // Warna berdasarkan tingkat keamanan password
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
  ];
  const strengthLabels = [
    "Sangat Lemah",
    "Lemah",
    "Cukup",
    "Kuat",
    "Sangat Kuat",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          🔷 Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {/* Password Strength Bar dengan Animasi */}
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <motion.div
                className={`h-2 rounded-full ${strengthColors[passwordStrength]}`}
                initial={{ width: "0%" }}
                animate={{ width: `${(passwordStrength + 1) * 20}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              ></motion.div>
            </div>
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
              {strengthLabels[passwordStrength]}
            </p>
          </div>

          <button className="w-full p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
            Register
          </button>
          <p className="text-center text-red-500">{message}</p>
        </form>
      </div>
    </div>
  );
}
