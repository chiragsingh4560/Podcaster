import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PodcastCard from "../components/PodcastCard/PodcastCard";
import { BackendContext } from "../context/BackendContext";
const AllPodcasts = () => {
  const [podcasts, setPodcasts] = useState();
  const { backendUrl } = useContext(BackendContext);
  useEffect(() => {
    const fetch = async () => {
      // route to get all podcasts
      const res = await axios.get(`${backendUrl}/api/v1/get-podcasts`);
      // console.log(res.data.data);
      setPodcasts(res.data.data);
    };
    fetch();
  }, []);
  // console.log(podcasts);
  return (
    <div>
      <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {podcasts &&
          podcasts.map((items, i) => (
            <div key={i}>
              <PodcastCard items={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllPodcasts;
