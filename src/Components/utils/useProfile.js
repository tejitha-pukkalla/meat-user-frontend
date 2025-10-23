import { useState, useEffect } from "react";

const useProfile = (isLoggedIn) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch("http://localhost:4000/api/userprofile/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setProfile({
          name: data.profile?.name || "NEWUSER",
          email: data.profile?.email || "",
          phone: data.profile?.userId?.phone || "0000000000",
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLoggedIn]);

  const updateProfile = async (updatedFields) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:4000/api/userprofile/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      setProfile({
        name: data.profile?.name,
        email: data.profile?.email,
        phone: data.profile?.userId?.phone || profile.phone,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return { profile, loading, error, updateProfile };
};

export default useProfile;
