import React from "react";

const Home = () => {
  return (
    <div className="bg-green-100 min-h-screen lg:h-[89vh] flex flex-col justify-center p-6 md:p-12">
      <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:px-12">
        <div className="w-full lg:w-5/6 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Create & listen the <br />
            <span className="flex justify-center lg:justify-start items-end">
              p
              <img
                src="https://cdn-icons-png.flaticon.com/128/2113/2113324.png"
                alt="headphone"
                className="h-8 md:h-12 lg:h-20 mx-2"
              />
              dcast
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-semibold mt-4">
            Listen to the most popular podcasts on just one platform -{" "}
            <b>PODCASTER</b>
          </p>
          <button className="px-4 py-3 md:px-6 md:py-4 bg-green-900 text-white font-semibold rounded-full mt-8">
            Login to listen
          </button>
        </div>
        <div className="-rotate-90 text-center hidden lg:block">
          <div className="border border-black text-sm md:text-lg lg:text-xl font-semibold rounded-full w-24 md:w-32 lg:w-36 h-10 md:h-12 lg:h-14 flex items-center justify-center bg-gray-100">
            Scroll Down
          </div>
        </div>
      </div>
      <div className="lg:px-12 mt-12">
        <p className="text-zinc-600 text-center lg:text-left">
          Our app contains more than 2000 podcasts for you
        </p>
      </div>
    </div>
  );
};

export default Home;
