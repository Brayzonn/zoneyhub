import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { useSound } from "../hooks/useSound";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import FloatingMenu from "../components/common/FloatingMenu";
import MatTexture from "../components/common/MatTexture";
import { blogPosts } from "../data/blogPosts";
import { useState } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isDarkMode: isDark } = useTheme();
  const { isSoundOn, toggleSound } = useSound();
  const { stop, currentTrack, setVolume } = useGlobalAudio();
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);

  useEffect(() => {
    setVolume(isSoundOn ? 1 : 0);
  }, [isSoundOn, setVolume]);

  const post = blogPosts.find((p) => p.slug === slug);

  return (
    <div className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full">
      <MatTexture isDark={isDark} />

      <main className="px-3 py-[5rem] relative min-h-screen w-full flex justify-center items-start z-10">
        <div
          className={`w-full max-w-[600px] mx-auto rounded-lg shadow-lg border p-5 transition-colors duration-300 ${
            isDark
              ? "bg-white border-gray-200"
              : "bg-[#121418] border-[#2a2d35]"
          }`}
        >
          {post ? (
            <>
              {/* Header */}
              <div className="mb-5">
                <h1
                  className={`text-[15px] font-semibold ${
                    isDark ? "text-gray-900" : "text-white"
                  }`}
                >
                  {post.title}
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
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
              </div>

              {/* Divider */}
              <div
                className={`h-[1px] w-full mb-5 ${
                  isDark
                    ? "border-t border-dashed border-gray-200"
                    : "border-t border-dashed border-[#2a2d35]"
                }`}
              />

              {/* Content */}
              <div className="space-y-4">
                {post.content.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={`text-[13px] leading-relaxed tracking-[0.015em] whitespace-pre-line ${
                      isDark ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-6">
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

              {/* Divider */}
              <div
                className={`h-[1px] w-full mt-5 mb-4 ${
                  isDark
                    ? "border-t border-dashed border-gray-200"
                    : "border-t border-dashed border-[#2a2d35]"
                }`}
              />

              {/* Back link */}
              <Link
                to="/blog"
                className={`inline-flex items-center gap-1 text-[12px] group transition ${
                  isDark
                    ? "text-gray-400 hover:text-gray-900"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <span className="inline-block group-hover:-translate-x-0.5 transition-transform">
                  ←
                </span>
                <span>All posts</span>
              </Link>
            </>
          ) : (
            /* 404 state */
            <div className="py-8 text-center">
              <p
                className={`text-[13px] mb-4 ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Post not found.
              </p>
              <Link
                to="/blog"
                className={`text-[12px] transition ${
                  isDark
                    ? "text-gray-400 hover:text-gray-900"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                ← All posts
              </Link>
            </div>
          )}
        </div>
      </main>

      <div className="fixed z-20 top-2 left-1/2 -translate-x-1/2">
        <FloatingMenu
          onInfoClick={() => setIsInfoCardOpen(!isInfoCardOpen)}
          isInfoOpen={isInfoCardOpen}
          isSoundOn={isSoundOn}
          onSoundToggle={toggleSound}
          currentTrack={currentTrack}
          onStopTrack={stop}
        />
      </div>
    </div>
  );
};

export default BlogPost;
