"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import "./Created.css";

import { db, auth } from "@/app/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import Pagination from "../Pagination/Pagination";
import toast, { Toaster } from "react-hot-toast";

const Created = () => {
  const [createdLinks, setCreatedLinks] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const db = getFirestore();
        const currentUser = auth.currentUser;

        if (currentUser) {
          setUser(currentUser);

          const q = query(
            collection(db, "links"),
            where("userId", "==", currentUser.uid)
          );
          const linksSnapshot = await getDocs(q);

          const linksData = linksSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCreatedLinks(linksData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteLink = async (linkId, linkName) => {
    try {
      await deleteDoc(doc(db, "links", linkId));
      toast.success(`${linkName} is successfully deleted.`);
      setCreatedLinks(createdLinks.filter((link) => link.id !== linkId));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const indexOfLastLink = currentPage * 10;
  const indexOfFirstLink = indexOfLastLink - 10;
  const currentLinks = createdLinks.slice(indexOfFirstLink, indexOfLastLink);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mylinks">
      <h1>My created links</h1>
      {currentLinks.length > 0 ? (
        <>
          <div className="total">
            <p>Total:</p>
            <p className="totalCount">{createdLinks.length}</p>
          </div>
          <div className="allLinks">
            {currentLinks.map((link) => (
              <div className="singleLink" key={link.id}>
                <p className="LinkName">{link.name}</p>
                <div className="flexLink RealUrl">
                  <p className="longUrlP">Real URL:</p>
                  <Link href={link.longUrl} className="longUrl" target="_blank">
                    {link.longUrl}
                  </Link>
                </div>
                <div className="flexLink">
                  <p>Shortened URL:</p>
                  <Link href={link.shortUrl} target="_blank">
                    {link.shortUrl}
                  </Link>
                </div>
                <div className="delete">
                  <AiFillDelete
                    onClick={() => handleDeleteLink(link.id, link.name)}
                  />
                </div>
              </div>
            ))}
          </div>
          <Pagination
            totalItems={createdLinks.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="noLinks">
          <p>No Links Created Yet.</p>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Created;
