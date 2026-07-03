import React from "react";
import storageService from "../appwrite/storage";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedPost, setSelectedPost } from "../store/postSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Loader, Select } from "./index";
import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

const RTE = lazy(() => import("./RTE.jsx"));

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, control, reset } = useForm();
    const [errorMsg, setErrorMsg] = React.useState(null);
    const dispatch = useDispatch();
    let [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const fetchedPost = await storageService.getPost(id);
                if (fetchedPost) {
                    setPost(fetchedPost);
                    dispatch(setSelectedPost(fetchedPost));

                    reset({
                        title: fetchedPost.title,
                        slug: fetchedPost.$id,
                        content: fetchedPost.content,
                        status: fetchedPost.status
                    });
                }

            } catch (error) {
                alert("Error fetching post details: " + error.message);
            }
        }

        if (id) fetchPost();
    }, [dispatch, id, reset]);

    async function handler(updatedData) {
        const confirmation = confirm(
            "Are you sure you want to update this post? This action cannot be undone.",
        );
        if (confirmation && updatedData) {
            let featuredImage = post.featuredImage;
            try {
                if (updatedData.featuredImage?.length > 0) {
                    const img = await storageService.uploadFile(
                        updatedData.featuredImage[0],
                    );
                    featuredImage = img.$id;

                    if (featuredImage) {
                        await storageService.deleteFile(post.featuredImage);
                    }
                }
                const finalData = {
                    title: updatedData.title,
                    content: updatedData.content,
                    status: updatedData.status, 
                    featuredImage: featuredImage,
                }

                const localData = await storageService.updatePost(post.$id, finalData)

                dispatch(updateSelectedPost(localData));
                navigate("/allposts");

            } catch (error) {
                setErrorMsg(`Error Occurred: ${error.message}`);
            }
        }
    }
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            {/* Ambient glow orbs */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px] sm:h-80 sm:w-80 sm:blur-[120px]" />
            <div className="pointer-events-none absolute left-0 top-1/3 h-56 w-56 rounded-full bg-blue-500/[0.06] blur-[100px] sm:h-72 sm:w-72" />

            {/* Faint grid texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.4) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
                }}
            />

          <div className="relative mx-auto w-full max-w-5xl min-w-0">
            <div className="mb-6 sm:mb-8">
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    Update Post
                </h1>

                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                    Update your post details below.
                </p>
            </div>

            {errorMsg && (
                <p className="mb-5 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>
                    <span>{errorMsg}</span>
                </p>
            )}

            <form
                onSubmit={handleSubmit(handler)}
                className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-8"
            >

                <div className="relative min-w-0 space-y-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl shadow-[0_0_35px_rgba(56,189,248,0.08)] sm:p-6 lg:col-span-2">
                    <div className="pointer-events-none absolute -top-px left-8 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent sm:left-12" />

                    <Input
                        label="Title:"
                        {...register("title", { required: true })}
                        placeholder="Enter post title..."
                    />

                    <Input
                        label="Slug"
                        {...register("slug", { required: true })}
                        placeholder="your-post-slug"
                        readOnly
                    />

                    <Suspense fallback={<Loader />}>
                        <RTE label="Content" control={control} />
                    </Suspense>
                </div>

                <aside className="relative h-fit min-w-0 space-y-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl shadow-[0_0_35px_rgba(56,189,248,0.08)] sm:p-6">
                    <div className="pointer-events-none absolute -top-px left-8 h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                    {post?.featuredImage && (
                        <div className="overflow-hidden rounded-xl border border-white/10">
                            <img
                                src={storageService.getFilePreview(post.featuredImage)}
                                alt={post?.title}
                                className="aspect-video w-full object-cover"
                            />
                        </div>
                    )}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Featured Image
                        </label>

                        <input
                            {...register("featuredImage")}
                            type="file"
                            className="block w-full cursor-pointer rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 transition-colors file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-sky-500 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white hover:border-cyan-400/30 hover:file:bg-sky-600 sm:text-sm sm:file:px-4 sm:file:text-sm"
                        />
                        <p className="mt-1.5 text-xs text-slate-500">
                            Leave empty to keep the current image.
                        </p>
                    </div>

                    <Select
                        {...register("status", { required: true })}
                        label="Status"
                        options={["Active", "Inactive"]}
                    />

                    <Button
                        type="submit"
                        className="w-full !bg-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-shadow hover:!bg-sky-600 hover:shadow-[0_0_28px_rgba(56,189,248,0.4)]"
                    >
                        Update Post
                    </Button>
                </aside>
            </form>
          </div>
        </div>
    );
}

export default EditPost;