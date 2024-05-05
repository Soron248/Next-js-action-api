import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const AllTopics = ({ topicsData }) => {
  return (
    <>
      {topicsData &&
        topicsData.map((t) => (
          <div className="flex" key={t._id}>
            <div className="w-5/6">
              <h1 className="text-teal-800 font-bold text-2xl">{t.title}</h1>
              <p className="text-gray-400 text-lg">{t.description}</p>
            </div>

            <div className="w-1/6 flex justify-end gap-5">
              <MdDeleteForever size={25} className="text-red-600" />
              <MdEdit size={25} className="text-blue-600" />
            </div>
          </div>
        ))}
    </>
  );
};

export default AllTopics;
