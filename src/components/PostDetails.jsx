import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import storageService from "../appwrite/storage";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPost } from "../store/postSlice";
import { motion } from "motion/react";
import parse from "html-react-parser";
import { Pencil, Trash2 } from "lucide-react";
import authService from "../appwrite/auth";

function PostDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let selectedItems = useSelector((state) => state.post.selectedPosts);
  let selectedPost = selectedItems.find((item) => item.$id === id);

  const user = useSelector((state) => state.auth.userData);
  const uid = user.$id;

  async function handleDelete() {

    if (selectedPost.userId === uid) {
      try {
        const confirmed = confirm(
          "Are you sure you want to delete this post? This action cannot be undone.",
        );

        if (confirmed) {
          await storageService.deleteFile(selectedPost.featuredImage);
          await storageService.deletePost(selectedPost.$id);
          navigate("/allposts");
        }
      } catch (error) {
        alert("Error deleting post: ", error.message);
      }
    }
  }

  async function handleEdit() {

    if (selectedPost.userId === uid) {
      navigate(`/editpost/${selectedPost.$id}`);
    }
  }

  useEffect(() => {
    if (!selectedPost) {
      async function fetchPostDetails(id) {
        const item = await storageService.getPost(id);
        if (item) dispatch(setSelectedPost(item));
      }

      fetchPostDetails(id);
    }
  }, [id, selectedPost, dispatch]);

  if (selectedPost) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate("/allposts")}
            className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 transition-all duration-300 hover:border-cyan-300/50 hover:bg-cyan-400/20 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]"
          >
            ← Back to Posts
          </button>
          {selectedPost.userId === uid && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleEdit}
                className="inline-flex items-center gap-2 rounded-full cursor-pointer border border-sky-400/25 bg-sky-400/10 px-5 py-2 text-sm font-medium text-sky-300 transition-all duration-300 hover:border-sky-300/50 hover:bg-sky-400/20 hover:text-sky-200"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 rounded-full border cursor-pointer border-red-400/25 bg-red-400/10 px-5 py-2 text-sm font-medium text-red-300 transition-all duration-300 hover:border-red-300/50 hover:bg-red-400/20 hover:text-red-200"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 shadow-[0_0_60px_rgba(56,189,248,0.10)] backdrop-blur-xl">
          <div className="relative h-[22rem] overflow-hidden bg-slate-900 sm:h-[30rem]">
            <img
              src={storageService.getFilePreview(selectedPost.featuredImage)}
              alt={selectedPost.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 max-w-4xl p-6 sm:p-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Blog Post
              </p>

              <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {selectedPost.title}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-12 flex flex-wrap items-center gap-4 border-b border-white/10 pb-8 text-sm text-slate-400">
              <span className="text-slate-300">By Priyanshu Gupta</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>5 min read</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-300">
                React / Appwrite
              </span>
            </div>

            <div className="prose prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:text-white prose-p:leading-8 prose-p:text-slate-300 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 prose-strong:text-white prose-code:rounded-md prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-300 prose-pre:border prose-pre:border-white/10 prose-pre:bg-slate-900/80 prose-img:rounded-2xl prose-img:border prose-img:border-white/10">
              {parse(selectedPost.content)}
            </div>
          </div>
        </article>
      </div>
    );
  } else {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-6 bg-slate-950 text-slate-100">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-slate-500">
          write<span className="text-sky-400">It</span>
        </span>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-11 w-11 rounded-full border-4 border-cyan-400/80 border-t-transparent shadow-[0_0_25px_rgba(56,189,248,0.4)]"
        />
      </div>
    );
  }
}

export default PostDetails;
