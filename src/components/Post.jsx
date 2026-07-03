import React, { lazy, Suspense, useState } from "react";
import storageService from "../appwrite/storage";
import { Input, Button, Loader, Select } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth.js";

const RTE = lazy(() => import("./RTE.jsx"));

function Post() {
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, control } = useForm();

  async function getCurrentUserId() {
    try {
      const user = await authService.getCurrentUser();
      return user.$id;
    } catch (error) {
      console.error("Error fetching current user ID:", error);
      return null;
    }
  }

  async function handler(data) {
    if (data) {
      try {
        const uid = await getCurrentUserId();

        const img = await storageService.uploadFile(data.featuredImage[0]);

        try {
          const post = await storageService.createPost({
            ...data,
            featuredImage: img.$id,
            userId: uid,
          });

          if (post) {
            dispatch(setSelectedPost(post));
            navigate("/allposts");
          }
        } catch (error) {
          await storageService.deleteFile(img.$id);
          throw error;
        }
      } catch (error) {
        setErrorMsg(`Error Occured: ${error.message}`);
      }
    }
  }

  return (
    <div className="w-full min-w-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Create New Post
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Share your thoughts with the world.
        </p>
      </div>

      {errorMsg && (
        <p className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </p>
      )}

      <form
        onSubmit={handleSubmit(handler)}
        className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-8"
      >
        <div className="min-w-0 space-y-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4 shadow-xl sm:p-6 lg:col-span-2">
          <Input
            label="Title:"
            {...register("title", { required: true })}
            placeholder="Enter post title..."
          />

          <Input
            label="Slug"
            {...register("slug", { required: true })}
            placeholder="your-post-slug"
          />

          <Suspense fallback={<Loader />}>
            <RTE
              label="Content"
              control={control}
            />
          </Suspense>
        </div>

        <aside className="h-fit min-w-0 space-y-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4 shadow-xl sm:p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Featured Image
            </label>

            <input
              {...register("featuredImage", { required: true })}
              type="file"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-sky-500 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-sky-600 sm:text-sm sm:file:px-4 sm:file:text-sm"
            />
          </div>

          <Select
            {...register("status", { required: true })}
            label="Status"
            options={["Active", "Inactive"]}
          />

          <Button type="submit" className="w-full">
            Publish Post
          </Button>
        </aside>
      </form>
    </div>
  );
}

export default Post;