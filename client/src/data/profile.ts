import type { ReactNode } from "react";
import {
  GithubIconSmall,
  LinkedInIconSmall,
  MailIconSmall,
  XIconSmall,
} from "../assets/icons";

export interface SocialLink {
  name: string;
  link: string;
  icon: ReactNode;
}

export const socials: SocialLink[] = [
  {
    name: "X",
    link: "https://x.com/brayzoney",
    icon: XIconSmall,
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
    link: "mailto:hello@zoneyhub.com",
    icon: MailIconSmall,
  },
];
