import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts, setSelectedPost } from "../store/postSlice";
import storageService from "../appwrite/storage";
import { Button } from "./index";
import { setImages } from "../store/imageSlice";
import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";

function PostGallery() {
  const dispatch = useDispatch();
  let posts = useSelector((state) => state.post.posts);
  let images = useSelector((state) => state.image.images);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initialFetch() {
      try {
        const page = await storageService.getInitialPosts();

        if (page) {
          dispatch(setPosts(page.rows));

          const images = page.rows.map((row) => {
            return storageService.getFilePreview(row.featuredImage);
          });

          dispatch(setImages(images));
          // console.log(images);
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      } finally{
        setLoading(false);
      }
    }

    initialFetch();
  }, [dispatch]);

  async function loadMorePosts() {
    try {
      const page = await storageService.getMorePosts();

      if (page) {
        dispatch(setPosts([...posts, ...page.rows]));

        const moreImages = page.rows.map((row) => {
          return storageService.getFilePreview(row.featuredImage);
        });

        dispatch(setImages([...images, ...moreImages]));
      }

    } catch (error) {
      setError(error);
    }

  }

  if (posts.length > 0) {

    return (
      <>
        <div className="scrollbar-thin flex max-h-[75vh] flex-col gap-6 overflow-y-auto pr-1 sm:pr-3">
          {posts.map((post, index) => (
            <article
              key={post.$id || index}
              className="group flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] sm:flex-row"
            >
              <div className="h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-72">
                <img
                  src={images[index]}
                  alt="Featured"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
                <p className="line-clamp-3 text-base leading-7 text-slate-300 sm:text-lg">
                  {post.title}
                </p>

                <Link
                  to={`/posts/${post.$id}`}
                  onClick={() => dispatch(setSelectedPost(post))}
                  className="inline-flex w-fit items-center text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={loadMorePosts}
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-8 py-3 text-cyan-300 transition-all duration-300 hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]"
          >
            See More
          </Button>
        </div>
      </>
    )

  }

  if (!loading && posts.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40">
        <p className="text-lg text-slate-400">No posts available.</p>
      </div>
    )
  }

  if (loading && posts.length === 0) {
    return (
      <div className="flex h-72 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-20 w-20 rounded-full bg-sky-500/10 blur-xl"></div>

          <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-slate-700 border-t-sky-400 border-r-cyan-300"></div>
        </div>

        <h3 className="mt-6 text-xl font-semibold text-white">
          Loading Posts
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Please wait...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-72 flex-col items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/[0.06] px-6 text-center backdrop-blur-xl">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.12)]">
          <TriangleAlert className="h-8 w-8 text-red-400" />
        </div>

        <h3 className="text-xl font-semibold text-white">
          Unable to load posts
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
          {error.message || "Something went wrong while fetching posts."}
        </p>
      </div>
    )
  }
}

export default PostGallery;
