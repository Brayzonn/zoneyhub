import { useParams, Link } from "react-router-dom";
import { useSound } from "../hooks/useSound";
import { useSoundEffects } from "../hooks/useSoundEffects";
import JournalLayout from "../components/JournalLayout";
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
    <JournalLayout>
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

      <article className="max-w-[960px] mx-auto">
        {post ? (
          <>
            <header className="mb-8">
              <MetaRow
                items={[
                  post.date,
                  post.readTime,
                  post.category === "technical"
                    ? "Technical"
                    : "Non-Technical",
                ]}
                className="mb-3"
              />
              <h1 className="font-serif font-medium text-title max-md:text-title-sm m-0 text-ink">
                {post.title}
              </h1>
            </header>

            <PostContent content={post.content} onCopyClick={playClick} />

            <MetaRow
              items={post.tags}
              className="mt-10 pt-6 border-t border-line"
            />

            <Link to="/blog" className={`${backLinkClasses} mt-6`}>
              ← All posts
            </Link>
          </>
        ) : (
          /* 404 state */
          <div className="py-8">
            <p className="text-body text-ink-muted mb-4">Post not found.</p>
            <Link to="/blog" className={backLinkClasses}>
              ← All posts
            </Link>
          </div>
        )}
      </article>
    </JournalLayout>
  );
};

export default BlogPost;
