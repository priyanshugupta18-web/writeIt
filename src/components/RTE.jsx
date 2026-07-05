import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import config from "../config/config";

function RTE({
  name = "content",
  label = "",
  defaultValue = "",
  control,
  errors,
}) {
  return (
    <div className="w-full min-w-0">
      {label && (
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-sky-300 sm:mb-3 sm:text-sm">
          {label}
        </label>
      )}

      <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 shadow-[0_0_30px_rgba(56,189,248,0.08)] backdrop-blur-xl sm:rounded-2xl">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={{
            validate: (value = "") => {
              const text = value.replace(/<[^>]*>/g, "").trim();
              return text.length > 0 || "Content is required";
            },
          }}
          render={({ field }) => (
            <Editor
              apiKey={config.tinymceapi}
              value={field.value}
              onEditorChange={field.onChange}
              init={{
                height: 420,
                min_height: 360,
                max_height: 650,

                menubar: false,
                branding: false,
                promotion: false,
                resize: true,

                skin: "oxide-dark",
                content_css: "dark",

                toolbar_sticky: true,
                toolbar_sticky_offset: 0,
                toolbar_mode: "sliding",

                plugins:
                  "advlist anchor autolink charmap code codesample fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount",

                toolbar:
                  "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table | codesample | code preview fullscreen",

                content_style: `
                  body{
                    background:#020617;
                    color:#e2e8f0;
                    font-family:Inter,Arial,sans-serif;
                    font-size:16px;
                    line-height:1.8;
                    max-width:850px;
                    margin:auto;
                    padding:22px;
                  }

                  @media (min-width:640px){
                    body{
                      font-size:17px;
                      padding:40px;
                    }
                  }

                  h1,h2,h3,h4,h5,h6{
                    color:#ffffff;
                    font-weight:700;
                    margin-top:1.5rem;
                    margin-bottom:.8rem;
                    line-height:1.3;
                  }

                  p{ margin-bottom:1rem; }

                  img{
                    display:block;
                    max-width:100%;
                    height:auto;
                    margin:1.5rem auto;
                    border-radius:12px;
                  }

                  a{ color:#38bdf8; text-decoration:none; }

                  ul,ol{
                    margin-bottom:1rem;
                    padding-left:1.5rem;
                  }

                  blockquote{
                    margin:1.5rem 0;
                    padding:.9rem 1rem;
                    border-left:4px solid #38bdf8;
                    background:#0f172a;
                    color:#cbd5e1;
                    border-radius:10px;
                  }

                  code{
                    background:#1e293b;
                    color:#38bdf8;
                    padding:2px 6px;
                    border-radius:6px;
                    font-size:14px;
                  }

                  pre{
                    background:#0f172a;
                    border:1px solid rgba(255,255,255,.08);
                    border-radius:12px;
                    padding:14px;
                    overflow-x:auto;
                  }

                  table{
                    width:100%;
                    border-collapse:collapse;
                    margin:1.5rem 0;
                  }

                  table,th,td{ border:1px solid #334155; }

                  th,td{ padding:10px; }

                  th{
                    background:#1e293b;
                    color:white;
                  }
                `,
              }}
            />
          )}
        />
      </div>

      {errors?.[name] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}

export default RTE;