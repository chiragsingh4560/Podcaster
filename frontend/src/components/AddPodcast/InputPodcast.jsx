import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackendContext } from "../../context/BackendContext";
import { useNavigate } from "react-router-dom";

const InputPodcast = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(BackendContext);

  const [frontImage, setFrontImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleChangeImage = (e) => setFrontImage(e.target.files[0]);

  const handleAudioFile = (e) => setAudioFile(e.target.files[0]);

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitPodcast = async () => {
    if (
      !input.title ||
      !input.description ||
      !input.category ||
      !frontImage ||
      !audioFile
    ) {
      toast.error("Please fill all fields and upload both image & audio.");
      return;
    }

    setLoading(true); // ✅ Set loading to true
    toast.info("Uploading podcast..."); // ✅ Show upload start toast

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("frontImage", frontImage);
    formData.append("audioFile", audioFile);

    try {
      await axios.post(`${backendUrl}/api/v1/add-podcast`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Podcast Uploaded!"); // ✅ Show success toast after upload

      // Redirect after 1 second
      setTimeout(() => {
        navigate("/all-podcasts");
        setLoading(false); // ✅ Reset loading state
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed.");
      setLoading(false); // ✅ Reset loading state on error
    }
  };

  return (
    <div className="my-4 px-4 lg:px-12">
      <ToastContainer position="top-center" draggable />

      {loading ? (
        // ✅ Show loading message while uploading
        <div className="flex justify-center items-center h-60 text-2xl font-semibold">
          Uploading podcast, please wait...
        </div>
      ) : (
        // ✅ Show the form when not loading
        <div>
          <h1 className="text-2xl font-semibold">Create your podcast</h1>
          <div className="mt-5 flex flex-col lg:flex-row items-start justify-between gap-4">
            {/* Thumbnail Upload Section */}
            <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-start mr-6">
              <div className="h-[400px] w-[200px] lg:w-full flex items-center justify-center transition-all duration-300 bg-slate-50 border border-dashed border-black">
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  className="hidden"
                  onChange={handleChangeImage}
                />
                {frontImage ? (
                  <img
                    src={URL.createObjectURL(frontImage)}
                    alt="thumbnail"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <label
                    htmlFor="file"
                    className="h-full w-full p-4 cursor-pointer flex items-center justify-center text-center text-xl hover:bg-zinc-200 transition-all duration-300"
                  >
                    Drag & drop or click to upload thumbnail
                  </label>
                )}
              </div>
            </div>

            {/* Title & Description Section */}
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

              {/* Audio Upload & Category */}
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

              {/* Submit Button */}
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
      )}
    </div>
  );
};

export default InputPodcast;
