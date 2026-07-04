export interface Project {
  name: string;
  desc: string;
  link: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    name: "NotifyKit",
    desc: "A notification infrastructure service focused on reliable email and webhook delivery at scale.",
    link: "https://notifykit.dev",
    stack: ["NestJS", "PostgreSQL", "React", "Typescript"],
  },
  {
    name: "Mines",
    desc: "Multi-mode browser-based mines game with real-time multiplayer leaderboards.",
    link: "https://mines.zoneyhub.com",
    stack: ["NestJS", "PostgreSQL", "React", "Redis", "Typescript"],
  },
  {
    name: "Weeklies",
    desc: "A personalized Spotify analytics app that tracks your weekly listening habits, top artists, and favorite genres with visual insights.",
    link: "https://weeklies.zoneyhub.com",
    stack: ["React", "NestJS", "Typescript", "PostgreSQL"],
  },
  {
    name: "B-Estates",
    desc: "Real estate web app featuring interactive Google Maps integration for property visualization.",
    link: "https://realestate-platform-alpha.vercel.app/",
    stack: ["React", "Tailwind CSS", "MongoDB", "Express"],
  },
  {
    name: "Linkly",
    desc: "A secure, seamless URL shortener for simplifying long links.",
    link: "https://linklyy.vercel.app/",
    stack: ["React", "Node.js", "MongoDB", "Javascript"],
  },
];
