import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import SectionHeader from "./ui/SectionHeader";
import MetaRow from "./ui/MetaRow";
import Chip from "./ui/Chip";

type Filter = "all" | "technical" | "non-technical";

const BlogComponent = () => {
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

  const countFor = (value: Filter) =>
    value === "all"
      ? blogPosts.length
      : blogPosts.filter((p) => p.category === value).length;

  return (
    <section className="max-w-[960px] mx-auto">
      <SectionHeader kicker="Blog" title="Ideas & Notes">
        Writing on things I&rsquo;ve built, problems I&rsquo;ve debugged, and
        whatever else has been on my mind.
      </SectionHeader>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <Chip
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            active={activeFilter === f.value}
            muted
          >
            {f.label}
            <span className="ml-1.5 inline-flex items-center justify-center w-[1.15rem] h-[1.15rem] rounded-full text-[0.65rem] bg-current/10 text-current">
              {countFor(f.value)}
            </span>
          </Chip>
        ))}
      </div>

      <div className="flex flex-col">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block border-b border-line last:border-b-0 py-6 text-inherit transition-colors duration-150 hover:bg-ink/[0.01]"
          >
            <h2 className="item-title transition-colors duration-150 group-hover:text-ink-muted">
              <span className="border-b border-ink/20 group-hover:border-ink-muted transition-colors duration-150">
                {post.title}
              </span>
            </h2>
            <MetaRow
              items={[
                post.date,
                post.readTime,
                post.category === "technical" ? "Technical" : "Non-Technical",
              ]}
              className="mb-3"
            />
            <p className="body-copy">{post.excerpt}</p>
            <MetaRow items={post.tags} pilled className="mt-3" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogComponent;
