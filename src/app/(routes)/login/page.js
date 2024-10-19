"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user, router]);

  const handleLogin = () => {
    const userData = { username, password };
    setUser(userData);
    // Autenticación API
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-slate-700">
         <div className="bg-white p-16 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl mb-6 text-center text-black">Login</h1>

        <div className="flex flex-col mb-4">
          <input
            className="p-2 border border-gray-300 rounded mb-2 text-black"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="p-2 border border-gray-300 rounded text-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          onClick={handleLogin}
        >
          Summit
        </button>

        {user && <p className="mt-4 text-center text-green-600">Welcome, {user.username}</p>}
      </div>
    </div>
  );
}
