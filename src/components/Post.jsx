import React, { useState } from "react";
import storageService from "../appwrite/storage";
import { Input, Button, RTE, Select } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPost,
  updateSelectedPost,
  clearEditable,
} from "../store/postSlice";
import { useNavigate } from "react-router-dom";

function Post() {
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  let isEditable = useSelector((state) => state.post.editable.status);
  let selectedItems = useSelector((state) => state.post.selectedPosts);
  let postId = useSelector((state) => state.post.editable.postId);

  let defaultItem = isEditable
    ? selectedItems.find((item) => item.$id == postId)
    : null;

  async function handler(data) {
    if (!isEditable) {
      if (data) {
        try {
          const img = await storageService.uploadFile(data.featuredImage[0]);
          try {
            const post = await storageService.createPost({
              ...data,
              featuredImage: img.$id,
            });

            if (post) {
              dispatch(setSelectedPost(post));
              navigate(`/allposts/${post.$id}`);
            }
          } catch (error) {
            await storageService.deleteFile(img.$id);
            throw error;
          }
        } catch (error) {
          setErrorMsg(`Error Occured: ${error.message}`);
        }
      }
    } else {
      if (data) {
        let img = null;
        try {
          if (data.featuredImage?.length > 0) {
            img = await storageService.uploadFile(data.featuredImage[0]);
          }
          try {
            const updatedPost = await storageService.updatePost(
              defaultItem.$id,
              { ...data, featuredImage: img?.$id || defaultItem.featuredImage },
            );

            if (updatedPost) {
              img
                ? await storageService.deleteFile(defaultItem.featuredImage)
                : null;

              dispatch(updateSelectedPost(updatedPost));
              dispatch(clearEditable());

              navigate(`/allposts/${updatedPost.$id}`);
            }
          } catch (error) {
            if (img) {
              await storageService.deleteFile(img.$id);
            }

            throw error;
          }
        } catch (error) {
          setErrorMsg(`Error Occured: ${error.message}`);
        }
      }
    }
  }

  return (
    <div className="w-full min-w-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {isEditable ? "Edit Post" : "Create New Post"}
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
            defaultValue={isEditable ? defaultItem?.title || "" : ""}
            {...register("title", { required: true })}
            placeholder="Enter post title..."
          />

          <Input
            label="Slug"
            defaultValue={isEditable ? defaultItem?.slug || "" : ""}
            readOnly={isEditable}
            {...register("slug", { required: true })}
            placeholder="your-post-slug"
          />

          <RTE
            label="Content"
            control={control}
            defaultValue={isEditable ? defaultItem?.content || "" : ""}
          />
        </div>

        <aside className="h-fit min-w-0 space-y-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4 shadow-xl sm:p-6">
          <div>
            {defaultItem?.featuredImage && (
              <div className="mb-5 space-y-3">
                <p className="text-sm font-medium text-slate-300">
                  Current Featured Image
                </p>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-lg">
                  <img
                    src={storageService.getFilePreview(
                      defaultItem.featuredImage,
                    )}
                    alt={defaultItem.title || "Featured image"}
                    className="h-44 w-full object-cover sm:h-56"
                  />
                </div>

                <p className="text-xs leading-5 text-slate-500">
                  Choose a new image below only if you want to replace the
                  current one.
                </p>
              </div>
            )}

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Featured Image
            </label>

            <input
              {...register("featuredImage", { required: !isEditable })}
              type="file"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-sky-500 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-sky-600 sm:text-sm sm:file:px-4 sm:file:text-sm"
            />
          </div>

          <Select
            {...register("status", { required: true })}
            label="Status"
            options={["Active", "Inactive"]}
            defaultValue={isEditable ? defaultItem?.status || "" : ""}
          />

          <Button type="submit" className="w-full">
            {isEditable ? "Publish Changes" : "Publish Post"}
          </Button>
        </aside>
      </form>
    </div>
  );
}

export default Post;
