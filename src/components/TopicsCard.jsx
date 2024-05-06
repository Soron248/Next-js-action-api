import Link from "next/link";
import React from "react";
import { MdEdit } from "react-icons/md";
import Remove from "./Remove";

const getAllTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/topics`, {
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

const TopicsCard = async () => {
  const { topics } = await getAllTopics();
  return (
    <>
      {topics.reverse().map((t) => (
        <div
          className="max-w-5xl mx-auto shadow-md p-5 rounded-md flex mb-5"
          key={t._id}
        >
          <div className="w-5/6">
            <h1 className="text-teal-800 font-bold text-2xl">{t.title}</h1>
            <p className="text-gray-400 text-lg">{t.description}</p>
          </div>

          <div className="w-1/6 flex justify-end items-start gap-5">
            <Remove id={t._id} />
            <Link href={`update_topic/${t._id}`}>
              <MdEdit size={25} className="text-blue-600" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicsCard;
