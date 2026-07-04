import type { ReactNode } from "react";
import {
  GithubIconSmall,
  LinkedInIconSmall,
  MailIconSmall,
  TwitterIconSmall,
} from "../assets/icons";

export interface SocialLink {
  name: string;
  link: string;
  icon: ReactNode;
}

export const socials: SocialLink[] = [
  {
    name: "Twitter",
    link: "https://x.com/brayzoney",
    icon: TwitterIconSmall,
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/eyinda-bright",
    icon: LinkedInIconSmall,
  },
  {
    name: "GitHub",
    link: "https://github.com/brayzonn",
    icon: GithubIconSmall,
  },
  {
    name: "Mail",
    link: "mailto:b.eyindaa@gmail.com",
    icon: MailIconSmall,
  },
];

export const frontendTech = ["React", "TypeScript", "Tailwind CSS", "JavaScript"];

export const backendTech = ["NestJS", "Go", "PostgreSQL", "MongoDB", "Express.js"];
