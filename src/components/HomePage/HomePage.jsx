"use client";
import React, { useEffect, useState } from "react";
import "./homepage.css";
import Link from "next/link";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/app/firebase";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [name, setName] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accessToken = process.env.NEXT_PUBLIC_REACT_APP_BITLY_TOKEN;
      const apiUrl = `https://api-ssl.bitly.com/v4/shorten`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ long_url: longUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.link);

        if (user) {
          await saveLinkToFirestore(user.uid, name, longUrl, data.link);
        }
        toast.success(name + " is successfuly generated.");
      } else {
        console.error("Failed to shorten URL");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const saveLinkToFirestore = async (userId, name, longUrl, shortUrl) => {
    await addDoc(collection(db, "links"), {
      userId,
      name,
      longUrl,
      shortUrl,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="homepage">
      <h1>URL shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="Paste your URL here..."
          className="secondInput"
          required
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit">GO</button>
      </form>
      {shortUrl && (
        <>
          <h4>Result</h4>
          <Link href={shortUrl} target="_blank">
            {shortUrl}
          </Link>
        </>
      )}
      <Toaster />
    </div>
  );
};

export default HomePage;
