"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"; // Import uuid untuk token

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    // Cek user berdasarkan email
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      setMessage("Email atau password salah.");
      return;
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      setMessage("Email atau password salah.");
      return;
    }

    // Generate token baru
    const token = uuidv4();

    // Simpan token ke database
    const { error: updateError } = await supabase
      .from("users")
      .update({ token })
      .eq("email", email);

    if (updateError) {
      setMessage("Gagal menyimpan token.");
      return;
    }

    // Simpan token di localStorage (opsional)
    localStorage.setItem("authToken", token);

    setMessage("Login berhasil!");
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          🔷 Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
            Login
          </button>
          <p className="text-center text-red-500">{message}</p>
        </form>
      </div>
    </div>
  );
}
