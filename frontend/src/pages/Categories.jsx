import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const cat = [
    {
      name: "Comedy",
      color: "bg-purple-200",
      to: "/categories/Comedy",
      img: "https://as2.ftcdn.net/v2/jpg/04/32/11/41/1000_F_432114162_e5iBypBOrZXv2fvlaJ1RqydMXXFxVXc0.jpg",
    },
    {
      name: "Business",
      color: "bg-green-200",
      to: "/categories/Business",
      img: "https://as2.ftcdn.net/v2/jpg/03/03/44/83/1000_F_303448308_m1DFu5bUwIGNJiLRYLcuJzxqkQXzshzU.jpg",
    },
    {
      name: "Education",
      color: "bg-red-200",
      to: "/categories/Education",
      img: "https://as1.ftcdn.net/v2/jpg/02/94/31/06/1000_F_294310625_NiUfqb3Ejs6y6nUfNnyjg1j26UKyfQes.jpg",
    },
    {
      name: "Hobbies",
      color: "bg-zinc-200",
      to: "/categories/Hobbies",
      img: "https://as1.ftcdn.net/v2/jpg/01/21/76/80/1000_F_121768097_k0LdUnck6qUcLlK8JBzvow3gJklbgOdH.jpg",
    },
    {
      name: "Politics",
      color: "bg-indigo-200",
      to: "/categories/Politics",
      img: "https://as2.ftcdn.net/v2/jpg/08/04/85/51/1000_F_804855190_WXjNiSe2LCIVWL7wE2TFQPDiHzaO5TDC.jpg",
    },
    {
      name: "Sports",
      color: "bg-orange-200",
      to: "/categories/Sports",
      img: "https://as1.ftcdn.net/v2/jpg/02/78/42/76/1000_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg",
    },
  ];

  return (
    <div className="h-screen lg:h-[78vh] flex items-center justify-center pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 lg:px-12 py-6   w-full max-w-screen-xl">
        {cat.map((items, i) => (
          <Link
            key={i}
            to={items.to}
            className={`flex flex-col items-center justify-center rounded-lg p-4 hover:scale-105 shadow-lg transition-transform duration-300 ${items.color}`}
          >
            <img src={items.img} alt={items.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <div className="text-center text-lg font-semibold">{items.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
