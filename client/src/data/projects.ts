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
    name: "Nestra",
    desc: "A portfolio hub that gives creatives a single online identity.",
    link: "https://nestra.me",
    stack: ["React", "NestJS", "PostgreSQL", "Docker", "Typescript"],
  },
  {
    name: "Deploy Agent",
    desc: "A Go binary that deploys projects to a VPS on every GitHub push, handling clone, build, nginx, SSL, health checks, and automatic rollback on failure.",
    link: "https://github.com/Brayzonn/deploy-agent",
    stack: ["Go", "nginx", "Docker", "PM2"],
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
];
