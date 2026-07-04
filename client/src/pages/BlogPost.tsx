import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSound } from "../hooks/useSound";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import FloatingMenu from "../components/common/FloatingMenu";
import { useSoundEffects } from "../hooks/useSoundEffects";
import MatTexture from "../components/common/MatTexture";
import { blogPosts } from "../data/blogPosts";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const renderContent = (paragraph: string) => {
  const lines = paragraph.split("\n");

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={`${part}`} className="text-gray-200 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={`${part}`}
            className="text-[12px] px-1 py-0.5 rounded font-mono bg-[#1f2228] text-sky-400"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      if (part.match(/^\[.+\]\(.+\)$/)) {
        const label = part.match(/\[(.+)\]/)?.[1];
        const href = part.match(/\((.+)\)/)?.[1];
        return (
          <a
            key={part}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 underline underline-offset-2"
          >
            {label}
          </a>
        );
      }
      return part;
    });
  };

  if (paragraph.startsWith("## ")) {
    return (
      <h2 className="text-[14px] font-semibold mt-2 text-white">
        {paragraph.replace("## ", "")}
      </h2>
    );
  }

  const isList = lines.some((l) => l.trimStart().startsWith("- "));

  if (isList) {
    const items: { type: "text" | "item"; content: string }[] = [];
    for (const line of lines) {
      if (line.trimStart().startsWith("- ")) {
        items.push({ type: "item", content: line.replace(/^-\s+/, "") });
      } else if (line.trim()) {
        items.push({ type: "text", content: line });
      }
    }
    return (
      <div className="space-y-2">
        {items.map((item) =>
          item.type === "text" ? (
            <p
              key={item.content}
              className="text-[14px] text-justify md:text-[15px] leading-normal tracking-[0.01em] text-gray-400"
            >
              {renderInline(item.content)}
            </p>
          ) : (
            <div key={item.content} className="flex items-start gap-2">
              <span className="mt-[6px] shrink-0 w-1 h-1 rounded-full bg-gray-500" />
              <p className="text-[14px]  md:text-[15px] leading-normal tracking-[0.01em] text-gray-400">
                {renderInline(item.content)}
              </p>
            </div>
          ),
        )}
      </div>
    );
  }

  return (
    <p className="text-[14px] md:text-[15px] leading-normal tracking-[0.01em] whitespace-pre-line text-gray-400">
      {renderInline(paragraph)}
    </p>
  );
};

const BlogPost = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const { slug } = useParams<{ slug: string }>();
  const { isSoundOn, toggleSound } = useSound();
  const { stop, currentTrack, setVolume } = useGlobalAudio();
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);

  const { playClick } = useSoundEffects({ isSoundOn: isSoundOn ?? true });

  useEffect(() => {
    setVolume(isSoundOn ? 1 : 0);
  }, [isSoundOn, setVolume]);

  const post = blogPosts.find((p) => p.slug === slug);
  const url = `https://zoneyhub.com/blog/${slug}`;

  return (
    <>
      {post && (
        <Helmet>
          <title>{post.title} | Eyinda Bright</title>

          <meta name="description" content={post.description} />

          {/* Open Graph */}
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description} />
          <meta
            property="og:image"
            content="https://zoneyhub.com/og-image.webp"
          />
          <meta property="og:type" content="article" />

          <meta property="og:url" content={url} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.description} />
          <meta
            name="twitter:image"
            content="https://zoneyhub.com/og-image.webp"
          />
        </Helmet>
      )}

      <div className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full">
        <MatTexture />

        <main className="px-3 py-[5rem] relative min-h-screen w-full flex justify-center items-start z-10">
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
                <div className="space-y-4">
                  {post.content.map((block, i) => {
                    if (typeof block === "object" && block.type === "diagram") {
                      return (
                        <div
                          key="diagram"
                          className="my-4 rounded-md overflow-hidden"
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: block.svg }}
                          />
                        </div>
                      );
                    }

                    if (typeof block === "object" && block.type === "code") {
                      const blockKey = `${block.label ?? "code"}-${i}`;
                      return (
                        <div
                          key={`${block.label ?? ""}-${block.code.slice(0, 20)}`}
                          className="rounded-md overflow-hidden border text-[12px] font-mono bg-[#1a1d22] border-[#2a2d35]"
                        >
                          <div className="flex items-center justify-between px-3 py-1.5 text-[11px] border-b text-gray-500 border-[#2a2d35] bg-[#22262e]">
                            <span>{block.label ?? ""}</span>
                            <button
                              onClick={() => {
                                handleCopy(block.code, blockKey);
                                playClick();
                              }}
                              className="cursor-pointer transition text-[10px] hover:text-white"
                            >
                              {copiedKey === blockKey ? "Copied!" : "Copy"}
                            </button>
                          </div>
                          <pre className="p-3 overflow-x-auto leading-relaxed">
                            <code className="text-gray-300">{block.code}</code>
                          </pre>
                        </div>
                      );
                    }

                    if (typeof block === "string" && block.startsWith("## ")) {
                      return (
                        <h2
                          key={block}
                          className="text-[14px] font-semibold mt-2 text-white"
                        >
                          {block.replace("## ", "")}
                        </h2>
                      );
                    }

                    return (
                      <div key={(block as string).slice(0, 40)}>
                        {renderContent(block as string)}
                      </div>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-6">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-sm font-medium ${
                      post.category === "technical"
                        ? "text-sky-400 bg-sky-400/10"
                        : "text-emerald-400 bg-emerald-400/10"
                    }`}
                  >
                    {post.category === "technical"
                      ? "Technical"
                      : "Non-Technical"}
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
    </>
  );
};

export default BlogPost;
