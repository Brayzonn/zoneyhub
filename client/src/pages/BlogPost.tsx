import { useParams, Link } from "react-router-dom";
import { useSound } from "../hooks/useSound";
import { useSoundEffects } from "../hooks/useSoundEffects";
import SiteLayout from "../components/SiteLayout";
import PostContent from "../components/PostContent";
import MetaRow from "../components/ui/MetaRow";
import { blogPosts } from "../data/blogPosts";
import { Helmet } from "react-helmet-async";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://zoneyhub.com";

const backLinkClasses =
  "inline-flex text-kicker uppercase tracking-label text-ink-muted hover:text-ink transition-colors duration-150";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isSoundOn } = useSound();
  const { playClick } = useSoundEffects({ isSoundOn: isSoundOn ?? true });

  const post = blogPosts.find((p) => p.slug === slug);
  const url = `${SITE_URL}/blog/${slug}`;
  const ogImage = `${SITE_URL}/og-image.webp`;

  return (
    <SiteLayout>
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

      {post && (
        <Link
          to="/blog"
          aria-label="Back to all posts"
          className="fixed z-20 bottom-6 left-6 max-sm:bottom-4 max-sm:left-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 backdrop-blur-[6px] px-4 py-2 text-chip text-ink-muted shadow-lift transition-all duration-150 hover:-translate-y-px hover:text-ink hover:border-black/10"
        >
          ← All posts
        </Link>
      )}

      <article className="max-w-[960px] mx-auto">
        {post ? (
          <>
            <header className="mb-5">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <MetaRow items={[post.date, post.readTime]} />
                <MetaRow
                  items={[
                    post.category === "technical"
                      ? "Technical"
                      : "Non-Technical",
                  ]}
                  pilled
                  dark
                />
              </div>
              <h1 className="page-title">{post.title}</h1>
            </header>

            <PostContent content={post.content} onCopyClick={playClick} />

            <MetaRow
              items={post.tags}
              className="mt-10 pt-6 border-t border-line"
              pilled
            />
          </>
        ) : (
          /* 404 state */
          <div className="py-8">
            <p className="body-copy mb-4">Post not found.</p>
            <Link to="/blog" className={backLinkClasses}>
              ← All posts
            </Link>
          </div>
        )}
      </article>
    </SiteLayout>
  );
};

export default BlogPost;
