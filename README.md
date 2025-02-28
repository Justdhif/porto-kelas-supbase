This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- ----------------------------------------------------------------------- -->


```
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import ThemeSwitcher from "./ThemeSwitcher";
import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const controls = useAnimation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  // Cek token saat komponen di-mount
  useEffect(() => {
    const fetchUserByToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUser(null);
        return;
      }

      // Ambil user berdasarkan token dari Supabase
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("token", token)
        .single();

      if (error || !user) {
        setUser(null);
        localStorage.removeItem("authToken"); // Hapus token jika tidak valid
      } else {
        setUser(user);
      }
    };

    fetchUserByToken();
  }, []);

  const handleLogout = async () => {
    // Hapus token dari localStorage
    localStorage.removeItem("authToken");

    // Update token di Supabase menjadi null
    if (user) {
      await supabase
        .from("users")
        .update({ token: null })
        .eq("email", user.email);
    }

    // Reset state user dan redirect ke halaman login
    setUser(null);
    router.replace("/login");
  };

  // Fungsi untuk menangani klik pada nama pengguna
  const handleProfileClick = () => {
    if (user && user.role === "siswa") {
      router.push("/profile"); // Arahkan ke halaman profile
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={controls}
      className={`fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-800 shadow-lg"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={controls}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-blue-700 dark:text-purple-300"
        >
          XI RPL 4
        </motion.h1>

        <ul className="hidden md:flex items-center gap-8">
          {["Home", "About", "Gallery", "Contact"].map((item, index) => {
            const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = pathname === href;

            return (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={controls}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link
                  href={href}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-blue-700 text-white dark:bg-blue-500"
                      : "text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {item}
                </Link>
              </motion.li>
            );
          })}

          <ThemeSwitcher />

          {user ? (
            // Jika user sudah login, tampilkan nama dan tombol logout
            <>
              <motion.li
                className="text-gray-900 dark:text-gray-300 font-medium cursor-pointer"
                onClick={handleProfileClick}
              >
                Hello, {user.name} 👋
              </motion.li>
              <motion.li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg transition-all duration-300 bg-red-600 text-white hover:bg-red-500"
                >
                  Logout
                </button>
              </motion.li>
            </>
          ) : (
            // Jika user belum login, tampilkan tombol login dan register
            <>
              <motion.li>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg transition-all duration-300 bg-blue-700 text-white hover:bg-blue-500"
                >
                  Login
                </Link>
              </motion.li>
              <motion.li>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg transition-all duration-300 bg-green-700 text-white hover:bg-green-500"
                >
                  Register
                </Link>
              </motion.li>
            </>
          )}
        </ul>

        {/* Tombol Hamburger untuk Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-900 dark:text-white focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </motion.nav>
  );
};
```
