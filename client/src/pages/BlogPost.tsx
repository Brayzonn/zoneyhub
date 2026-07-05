import { useParams, Link } from "react-router-dom";
import { useSound } from "../hooks/useSound";
import { useSoundEffects } from "../hooks/useSoundEffects";
import PageLayout from "../components/PageLayout";
import PostContent from "../components/PostContent";
import { blogPosts } from "../data/blogPosts";
import { Helmet } from "react-helmet-async";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://zoneyhub.com";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isSoundOn } = useSound();
  const { playClick } = useSoundEffects({ isSoundOn: isSoundOn ?? true });

  const post = blogPosts.find((p) => p.slug === slug);
  const url = `${SITE_URL}/blog/${slug}`;
  const ogImage = `${SITE_URL}/og-image.webp`;

  return (
    <PageLayout align="start">
      {post && (
        <Helmet>
          <title>{post.title} | Eyinda Bright</title>

          <meta name="description" content={post.description} />

          {/* Open Graph */}
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:type" content="article" />

          <meta property="og:url" content={url} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.description} />
          <meta name="twitter:image" content={ogImage} />
        </Helmet>
      )}

      <div className="w-full max-w-[600px] mx-auto rounded-lg shadow-lg border p-5 transition-colors duration-300 bg-[#121418] border-[#2a2d35]">
        {post ? (
          <>
            {/* Header */}
            <div className="mb-5">
              <h1 className="text-[16px] md:text-[18px] font-semibold text-white">
                {post.title}
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11.50px] text-gray-500">
                  {post.date}
                </span>
                <span className="text-[11.50px] text-gray-600">·</span>
                <span className="text-[11px] text-gray-500">
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full mb-5 border-t border-dashed border-[#2a2d35]" />

            {/* Content */}
            <PostContent content={post.content} onCopyClick={playClick} />

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-6">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-sm font-medium ${
                  post.category === "technical"
                    ? "text-sky-400 bg-sky-400/10"
                    : "text-emerald-400 bg-emerald-400/10"
                }`}
              >
                {post.category === "technical" ? "Technical" : "Non-Technical"}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-sm text-gray-400 bg-[#1f2228]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full mt-5 mb-4 border-t border-dashed border-[#2a2d35]" />

            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-[12px] group transition text-gray-500 hover:text-white"
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
            <p className="text-[13px] mb-4 text-gray-400">Post not found.</p>
            <Link
              to="/blog"
              className="text-[12px] transition text-gray-500 hover:text-white"
            >
              ← All posts
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default BlogPost;
