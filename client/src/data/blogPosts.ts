export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "technical" | "non-technical";
  tags: string[];
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "i-tried-writing-today",
    title: "I Tried Writing Today",
    excerpt:
      "I started writing with no idea what to write about, but I was sure I had a lot to share, a lot to let out, a lot to write.",
    date: "Mar 2026",
    readTime: "2 min read",
    category: "non-technical",
    tags: ["Journal", "Life"],
    content: [
      "I tried writing today. So did I yesterday, and the day before, and the day before that.",
      "Today I actually did it. I started writing with no idea what to write about, but I was sure I had a lot to share, a lot to let out, a lot to write.",
      "Is this a poem? Or maybe prose?\nNo wait! I think it's a journal. Not so sure, but it does feel good to write.",
      "Being an adult is hard. I mean harrrdd— hard like the undercooked pomo I had earlier today.",
      "I try to navigate it regardless. I talk to friends and family. I try to be there for everyone I care about. I really do.",
      "But sometimes even that can be hard.",
      "Some days I feel like I'm doing great.\nLike I've figured something out.\nLike adulthood might actually be manageable.",
      "And other days I feel like I'm just guessing my way through everything and dealing with whatever comes from it.",
      "But maybe that's the trick.",
      "Maybe everyone is guessing. I think everyone is, but sometimes I find no comfort in that knowledge.",
      "Maybe writing like this—\nmessy, unsure, unfinished—\nis just my way of reminding myself that I'm still here.",
      "Still trying.\nStill figuring it out one sentence at a time.",
      "If you made it this far, thanks for reading.\nMaybe I'll try writing again tomorrow.",
    ],
  },
];
