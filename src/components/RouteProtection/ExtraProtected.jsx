import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import storageService from "../../appwrite/storage";
import { useSelector } from "react-redux";
import Loader from "../Loader";

function ExtraProtected() {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const [eligible, setEligible] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const post = await storageService.getPost(id);

        if (post.userId === user.$id) {
          setEligible(true);
        } else {
          setEligible(false);
        }
      } catch (error) {
        alert("error occured: " + error.message);
      } finally {
        setLoader(false);
      }
    }

    if (user && id) fetchPost();
  }, [id, user, isLoggedIn]);

  if (loader) {
    return <Loader />;
  } else {
    if (!isLoggedIn || !eligible) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }
}

export default ExtraProtected;
