import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import InputPodcast from "../components/AddPodcast/InputPodcast";
const AddPodcast = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
  <>
  {
  isLoggedIn ? 
  <InputPodcast/>
  : <ErrorPage />}
  </>);
};

export default AddPodcast;
