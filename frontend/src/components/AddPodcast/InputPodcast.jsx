import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //toast css
const InputPodcast = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [audioFile, setaudioFile] = useState(null);
  // this state is for setting the inputs title,desc,cat
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setFrontImage(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFrontImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAudioFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setaudioFile(file);
  };
  // console.log(audioFile);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmitPodcast = async () => {
    // console.log(input,frontImage,audioFile);
    const data = new FormData();
    data.append("title", input.title);
    data.append("description", input.description);
    data.append("category", input.category);
    data.append("frontImage", frontImage);
    data.append("audioFile", audioFile);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/add-podcast",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      // console.log(res);
      toast.success("Podcast Created");
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      //reset the inputs runs in succes as well as error
      setInput({ title: "", description: "", category: "" });
      setFrontImage(null);
      setaudioFile(null);
    }
  };
  return (
    <div className="my-4 px-4 lg:px-12">
      <ToastContainer position="top-center" draggable />
      <h1 className="text-2xl font-semibold">Create your podcast</h1>
      <div className="mt-5 flex flex-col lg:flex-row items-start justify-between gap-4">
        {/* Thumbnail Upload Section */}
        <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-start mr-6">
          <div
            className="h-[400px] w-[200px] lg:w-full flex items-center justify-center transition-all duration-300 bg-slate-50"
            style={{ border: "1px dashed black" }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              name="front-image"
              id="file"
              className="hidden"
              onChange={handleChangeImage} // to show the image after it is added
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="thumbnail"
                className="h-[100%] w-[100%] object-cover"
              />
            ) : (
              <label
                htmlFor="file"
                className={`h-full w-full p-4 hover:cursor-pointer flex items-center justify-center text-center text-xl ${
                  dragging ? "bg-blue-200" : ""
                } hover:bg-zinc-200 transition-all duration-300`}
              >
                Drag and drop the thumbnail or Click to browse
              </label>
            )}
          </div>
        </div>
        {/* Title Input Section */}
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title for your podcast"
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded w-full"
              value={input.title}
              onChange={onChangeInput}
            />
          </div>
          {/* Description */}
          <div className="flex flex-col mt-4">
            <label htmlFor="description" className="text-lg">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description for your podcast"
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded w-full"
              rows={4}
              value={input.description}
              onChange={onChangeInput}
            />
          </div>
          {/* Audio */}
          <div className="flex mt-4">
            <div className="flex flex-col w-2/6">
              <label htmlFor="audioFile" className="text-lg">
                Select Audio
              </label>
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.ogg"
                id="audioFile"
                className="mt-4"
                onChange={handleAudioFile}
              />
            </div>
            <div className="flex flex-col w-4/6">
              <label htmlFor="category">Select Category</label>
              <select
                name="category"
                id="category"
                className="border border-zinc-900 rounded mt-4 outline-none px-4 py-2"
                value={input.category}
                onChange={onChangeInput}
              >
                <option value="">Select Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Politics">Politics</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>
          <div className="mt-8 lg:mt-6 flex">
            <button
              onClick={handleSubmitPodcast}
              className="bg-zinc-900 w-full text-white rounded px-8 py-2 font-semibold hover:bg-zinc-800 transition-all duration-300"
            >
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
