import { useState } from "react";
import type { ContentBlock } from "../data/blogPosts";

/** Array position is a stable React key: blog content is static module data. */
const keyed = <T,>(items: readonly T[]) =>
  items.map((item, key) => ({ key, item }));

/** Renders inline markdown: **bold**, `code`, and [label](href) links. */
const renderInline = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return keyed(parts).map(({ key, item: part }) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    if (part.match(/^\[.+\]\(.+\)$/)) {
      const label = part.match(/\[(.+)\]/)?.[1];
      const href = part.match(/\((.+)\)/)?.[1];
      return (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    return part;
  });
};

/** Renders a plain-text block as a paragraph or a bulleted list. */
const renderParagraph = (paragraph: string) => {
  const lines = paragraph.split("\n");
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
        {keyed(items).map(({ key, item }) =>
          item.type === "text" ? (
            <p key={key}>{renderInline(item.content)}</p>
          ) : (
            <div key={key} className="flex items-start gap-3">
              <span className="mt-[0.7rem] shrink-0 w-1 h-1 rounded-full bg-ink-muted" />
              <p>{renderInline(item.content)}</p>
            </div>
          ),
        )}
      </div>
    );
  }

  return <p className="whitespace-pre-line">{renderInline(paragraph)}</p>;
};

/** A code block with its own copy-to-clipboard state. */
const CodeBlock = ({
  label,
  code,
  onCopy,
}: {
  label?: string;
  code: string;
  onCopy?: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-block overflow-hidden border font-mono text-[0.8rem] bg-ink border-ink shadow-lift">
      <div className="flex items-center justify-between px-4 py-2 text-[0.72rem] uppercase tracking-[0.08em] border-b border-white/10 text-bg/50 bg-black/20">
        <span>{label ?? ""}</span>
        <button
          onClick={handleCopy}
          className="cursor-pointer normal-case tracking-normal transition-colors duration-150 hover:text-bg"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto leading-relaxed m-0">
        <code className="text-bg/90">{code}</code>
      </pre>
    </div>
  );
};

interface PostContentProps {
  content: ContentBlock[];
  /** Called when a code block's Copy button is pressed (e.g. for a click sound). */
  onCopyClick?: () => void;
}

/** Renders a blog post's content blocks: diagrams, code, headings, and prose. */
const PostContent = ({ content, onCopyClick }: PostContentProps) => (
  <div className="prose">
    {keyed(content).map(({ key, item: block }) => {
      if (typeof block === "object" && block.type === "diagram") {
        return (
          <figure key={key}>
            <div dangerouslySetInnerHTML={{ __html: block.svg }} />
          </figure>
        );
      }

      if (typeof block === "object" && block.type === "code") {
        return (
          <CodeBlock
            key={key}
            label={block.label}
            code={block.code}
            onCopy={onCopyClick}
          />
        );
      }

      if (block.startsWith("## ")) {
        return <h2 key={key}>{block.replace("## ", "")}</h2>;
      }

      return <div key={key}>{renderParagraph(block)}</div>;
    })}
  </div>
);

export default PostContent;
