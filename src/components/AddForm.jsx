"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function AddForm() {
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
        type="text"
        placeholder="Title.."
        className="border border-teal-800 w-full px-3 py-2 rounded-md outline-none mb-5"
      />

      <textarea
        onChange={(e) => setDesciption(e.target.value)}
        value={description}
        required
        placeholder="Description..."
        rows="5"
        className="border border-teal-800 w-full px-3 py-2 rounded-md outline-none mb-5"
      ></textarea>

      <button
        type="submit"
        className="bg-teal-800 px-4 py-2 rounded-md text-white font-semibold"
      >
        SUBMIT
      </button>
    </form>
  );
}

export default AddForm;
