"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.replace("/login");
        return;
      }

      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("token", token)
        .single();

      if (error || !user) {
        router.replace("/login");
      } else {
        setUser(user);
        setName(user.name || "");
        setInstagram(user.instagram || "");
        setEmail(user.email || "");
        setWhatsapp(user.whatsapp || "");
        setTelegram(user.telegram || "");
        setAvatar(user.avatar_url || null);
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("users")
      .update({ name, instagram, whatsapp, telegram })
      .eq("id", user.id);

    if (error) {
      setMessage("Gagal memperbarui profil. Coba lagi!");
    } else {
      setMessage("Profil berhasil diperbarui!");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${user.id}.${fileExt}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Error uploading file:", error.message);
      setMessage(`Gagal mengunggah foto profil: ${error.message}`);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    const avatarUrl = urlData.publicUrl;

    const { error: updateError } = await supabase
      .from("users")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    if (updateError) {
      setMessage("Gagal memperbarui foto profil di database.");
      return;
    }

    setAvatar(avatarUrl);
    setMessage("Foto profil diperbarui!");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>
        {message && (
          <p className="text-center text-green-500 dark:text-green-400 mb-4">
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <img
              src={avatar || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border"
            />
            <input
              type="file"
              onChange={handleAvatarChange}
              className="mt-3 text-sm"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Nama:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Email:
              </label>
              <input
                type="text"
                value={email}
                disabled
                className="w-full px-4 py-2 rounded-lg border bg-gray-300 dark:bg-gray-700 dark:text-white cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Sosial Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Instagram:
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@username"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                WhatsApp:
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+6281234567890"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Telegram:
              </label>
              <input
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@telegram_user"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleUpdateProfile}
          className="w-full mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
