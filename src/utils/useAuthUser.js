"use client";

export const useAuthUser = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    let res = await fetch(`${baseUrl}/api/auth/me`, {
      credentials: "include", 
    });
    let data = await res.json();

    if (!data.success) {
      await fetch(`${baseUrl}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      res = await fetch(`${baseUrl}/api/auth/me`, {
        credentials: "include", 
      });
      data = await res.json();
      
    }

    return data;
  } catch (err) {
    console.error("Auth hydration failed:", err);
    return { success: false, message: "Auth failed", data: null };
  }
};
