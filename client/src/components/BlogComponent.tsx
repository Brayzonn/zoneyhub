import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

type Filter = "all" | "technical" | "non-technical";

interface BlogComponentProps {
  isDark: boolean;
}

const BlogComponent = ({ isDark }: BlogComponentProps) => {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Technical", value: "technical" },
    { label: "Non-Technical", value: "non-technical" },
  ];

  const filtered =
    activeFilter === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeFilter);

  return (
    <div
      className={`relative select-none rounded-lg w-full max-w-[600px] mx-auto shadow-lg p-5 transition-colors duration-300 ${
        isDark
          ? "bg-white border border-gray-200"
          : "bg-[#121418] border border-[#2a2d35]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-[15px] font-semibold tracking-wide ${
            isDark ? "text-gray-900" : "text-white"
          }`}
        >
          Blog
        </h2>
        <span
          className={`text-[12px] ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          {filtered.length} {filtered.length === 1 ? "post" : "posts"}
        </span>
      </div>

      {/* Filter Tabs */}
      <div
        className={`flex gap-1 p-1 rounded-[8px] mb-4 ${
          isDark ? "bg-gray-100" : "bg-[#1a1d23]"
        }`}
      >
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`cursor-pointer flex-1 text-[12px] font-medium py-1 px-2 rounded-[6px] transition-all duration-200 ${
              activeFilter === f.value
                ? isDark
                  ? "bg-white text-gray-900 shadow-sm"
                  : "bg-[#2a2d35] text-white"
                : isDark
                ? "text-gray-400 hover:text-gray-700"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div
        className={`h-[1px] w-full mb-4 ${
          isDark
            ? "border-t border-dashed border-gray-200"
            : "border-t border-dashed border-[#2a2d35]"
        }`}
      />

      {/* Posts List */}
      <div className="space-y-4">
        {filtered.map((post, index) => (
          <div key={post.slug}>
            <div className="flex gap-4">
              <span
                className={`text-[11px] font-mono mt-0.5 shrink-0 w-5 text-right ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/blog/${post.slug}`}
                  className={`text-[14px] font-semibold transition hover:underline underline-offset-2 ${
                    isDark
                      ? "text-gray-900 hover:text-gray-600"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {post.title}
                </Link>

                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-[11px] ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {post.date}
                  </span>
                  <span
                    className={`text-[11px] ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    ·
                  </span>
                  <span
                    className={`text-[11px] ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {post.readTime}
                  </span>
                </div>

                <p
                  className={`mt-1.5 text-[13px] leading-relaxed tracking-[0.015em] ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-sm font-medium ${
                      post.category === "technical"
                        ? isDark
                          ? "text-sky-600 bg-sky-50"
                          : "text-sky-400 bg-sky-400/10"
                        : isDark
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-emerald-400 bg-emerald-400/10"
                    }`}
                  >
                    {post.category === "technical" ? "Technical" : "Non-Technical"}
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] px-2 py-0.5 rounded-sm ${
                        isDark
                          ? "text-gray-600 bg-gray-100"
                          : "text-gray-400 bg-[#1f2228]"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {index < filtered.length - 1 && (
              <div
                className={`h-[1px] w-full mt-4 ${
                  isDark
                    ? "border-t border-dashed border-gray-200"
                    : "border-t border-dashed border-[#2a2d35]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;
