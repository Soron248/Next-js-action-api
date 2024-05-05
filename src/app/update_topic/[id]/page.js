import EditForm from "@/components/EditForm";
import React from "react";

const getTopic = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function page({ params }) {
  const { id } = params;

  const { topic } = await getTopic(id);

  return (
    <div>
      <EditForm id={id} oldT={topic.title} oldD={topic.description} />
    </div>
  );
}
