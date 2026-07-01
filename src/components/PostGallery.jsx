import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts, setSelectedPost } from "../store/postSlice";
import storageService from "../appwrite/storage";
import { Button } from "./index";
import { setImages } from "../store/imageSlice";
import { Link } from "react-router-dom";

function PostGallery() {
  const dispatch = useDispatch();
  let posts = useSelector((state) => state.post.posts);
  let images = useSelector((state) => state.image.images);

  useEffect(() => {
    async function initialFetch() {
      const page = await storageService.getInitialPosts();

      if (page) {
        dispatch(setPosts(page.rows));

        const images = page.rows.map((row) => {
          return storageService.getFilePreview(row.featuredImage);
        });

        dispatch(setImages(images));
        console.log(images);
      }
    }

    initialFetch();
  }, []);

  async function loadMorePosts() {
    const page = await storageService.getMorePosts();

    if (page) {
      dispatch(setPosts([...posts, ...page.rows]));

      const moreImages = page.rows.map((row) => {
        return storageService.getFilePreview(row.featuredImage);
      });

      dispatch(setImages([...images, ...moreImages]));
    }
  }

  return (
    <>
      {posts.length > 0 ? (
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
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
                  <p className="line-clamp-3 text-base leading-7 text-slate-300 sm:text-lg">
                    {post.title}
                  </p>

                  <Link
                    to={`/posts/${post.$id}`}
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
      ) : (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40">
          <p className="text-lg text-slate-400">No posts available.</p>
        </div>
      )}
    </>
  );
}

export default PostGallery;