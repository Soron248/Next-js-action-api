"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EditForm = ({ id, oldT, oldD }) => {
  const [newTitle, setNewTitle] = useState(oldT);
  const [newDescription, setNewDesciption] = useState(oldD);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to update topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        required
        type="text"
        placeholder="Title.."
        className="border border-teal-800 w-full px-3 py-2 rounded-md outline-none mb-5"
      />

      <textarea
        onChange={(e) => setNewDesciption(e.target.value)}
        value={newDescription}
        required
        placeholder="Description..."
        rows="5"
        className="border border-teal-800 w-full px-3 py-2 rounded-md outline-none mb-5"
      ></textarea>

      <button
        type="submit"
        className="bg-teal-800 px-4 py-2 rounded-md text-white font-semibold"
      >
        UPDATE
      </button>
    </form>
  );
};

export default EditForm;
