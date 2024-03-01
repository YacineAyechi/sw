"use client";

import { useState } from "react";
import { db } from "@/app/firebase";
import "./contact.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const dataWithTimestamp = {
            ...formData,
            timestamp: serverTimestamp(),
          }; // Add timestamp
          const docRef = await addDoc(
            collection(db, "contacts"),
            dataWithTimestamp
          );
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          resolve("Message sent successfully!");
        } catch (error) {
          console.error("Error adding document: ", error);
          reject(error.message || "Failed to send message");
        }
      }),
      {
        loading: "Sending...",
        success: (msg) => msg,
        error: (err) => err,
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="subject"
          placeholder="Enter Your Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Enter Your Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
      <Toaster />
    </div>
  );
};

export default ContactForm;
