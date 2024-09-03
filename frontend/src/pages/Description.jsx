import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Description = () => {
  const [podcast, setPodcast] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        // route to get the podcast by podcast_id
        `http://localhost:3000/api/v1/get-podcast/${id}`,
        { withCredentials: true }
      );
      // console.log(res.data.data);
      setPodcast(res.data.data);
    };
    fetch();
  }, []);
  if (!podcast) {
    return <div>Loading!!!!</div>;
  }
  return (
    <div className="px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start justify-between gap-4">
      <div className="w-2/6 flex items-center justify-center md:justify-start md:items-start">
        <img
          src={`http://localhost:3000/${podcast.frontImage}`}
          alt="thumbnail"
          className="rounded w-full h-[70vh] object-cover"
        />
      </div>
      <div className="w-4/6">
        <div className="text-4xl font-semibold">{podcast.title}</div>
        <h4 className="mt-4">{podcast.description}</h4>
        <div className="mt-2 w-fit bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
          {podcast.category.categoryName}
        </div>
      </div>
    </div>
  );
};

export default Description;
