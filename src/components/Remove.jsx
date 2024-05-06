"use client";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";

const getTopic = async (id) => {
  try {
    const res = await fetch(`/api/topics/${id}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const Remove = ({ id }) => {
  const router = useRouter();

  const removeTopic = async () => {
    const { topic } = await getTopic(id);

    const confirmed = confirm(`Are you sure to delete ${topic.title}`);

    if (confirmed) {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTopic}>
      <MdDeleteForever size={25} className="text-red-600" />
    </button>
  );
};

export default Remove;
