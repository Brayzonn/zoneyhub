import { useState } from "react";
import type { ContentBlock } from "../data/blogPosts";

/**
 * Blog content is static module data — blocks, list items, and inline parts
 * are never reordered or edited at runtime — so array position is a stable
 * React key. (The previous content-derived keys could collide: two blocks
 * sharing a 40-char prefix, or the same `code` span twice in a paragraph.)
 */
const keyed = <T,>(items: readonly T[]) =>
  items.map((item, key) => ({ key, item }));

/** Renders inline markdown: **bold**, `code`, and [label](href) links. */
const renderInline = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return keyed(parts).map(({ key, item: part }) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="text-gray-200 font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
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
          key={key}
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
            <p
              key={key}
              className="text-[14px] text-justify md:text-[15px] leading-normal tracking-[0.01em] text-gray-400"
            >
              {renderInline(item.content)}
            </p>
          ) : (
            <div key={key} className="flex items-start gap-2">
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
    <div className="rounded-md overflow-hidden border text-[12px] font-mono bg-[#1a1d22] border-[#2a2d35]">
      <div className="flex items-center justify-between px-3 py-1.5 text-[11px] border-b text-gray-500 border-[#2a2d35] bg-[#22262e]">
        <span>{label ?? ""}</span>
        <button
          onClick={handleCopy}
          className="cursor-pointer transition text-[10px] hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto leading-relaxed">
        <code className="text-gray-300">{code}</code>
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
  <div className="space-y-4">
    {keyed(content).map(({ key, item: block }) => {
      if (typeof block === "object" && block.type === "diagram") {
        return (
          <div key={key} className="my-4 rounded-md overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: block.svg }} />
          </div>
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
        return (
          <h2 key={key} className="text-[14px] font-semibold mt-2 text-white">
            {block.replace("## ", "")}
          </h2>
        );
      }

      return <div key={key}>{renderParagraph(block)}</div>;
    })}
  </div>
);

export default PostContent;
