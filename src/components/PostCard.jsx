import React from "react";
import { Link } from "react-router-dom";
import { StorageService } from "../appwrite/storage";

function PostCard({ $id, featuredImage, title }) {
  return (
    <Link to={`/post/${$id}`} className="group">
      <div
        className="
          overflow-hidden
          rounded-2xl
          bg-slate-900
          border
          border-slate-800
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-sky-500/40
          hover:shadow-sky-500/10
        "
      >
        <div className="overflow-hidden">
          <img
            src={StorageService.getFilePreview(featuredImage)}
            alt={title}
            className="
              h-56
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>

        <div className="p-5">
          <h2
            className="
              text-xl
              font-semibold
              text-white
              line-clamp-2
              transition-colors
              duration-300
              group-hover:text-sky-400
            "
          >
            {title}
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            Read article →
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;