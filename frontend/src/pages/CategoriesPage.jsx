import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PodcastCard from "../components/PodcastCard/PodcastCard";
const CategoriesPage = () => {
  const [podcasts, setPodcasts] = useState();
  // get the cat from params
  const { cat } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        // route to get only those podcasts that were created by current user
        `http://localhost:3000/api/v1/category/${cat}`,
        { withCredentials: true }
      );
      // console.log(res.data.data);
      setPodcasts(res.data.data);
    };
    fetch();
  }, []);

  //   loading state
  if (!podcasts) {
    return <div>Loading!!!!!</div>;
  }
  return (
    <div className="px-4 py-4 lg:px-12">
      <h1 className="text-xl font-semibold mb-4">{cat}</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {podcasts.length > 0 ? (
          podcasts.map((items, i) => (
            <div key={i}>
              <PodcastCard items={items} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-96">
            <p className="text-3xl font-bold text-zinc-700 text-center">
              No Podcast Under this category as of now
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
