import { Mail } from "lucide-react";
import { profile, socials } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { GithubIcon, LinkedinIcon, XIcon } from "./icons";
import { CopyEmailButton } from "./CopyEmailButton";

const links = [
  { label: "GitHub", href: socials.github, icon: GithubIcon },
  { label: "Twitter / X", href: socials.twitter, icon: XIcon },
  { label: "LinkedIn", href: socials.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${socials.email}`, icon: Mail },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
      <SectionHeading index="05" title="contact" />

      <Reveal>
        <div className="rounded-lg border border-border bg-bg-raised/40 p-8 text-center sm:p-12">
          <p className="font-mono text-sm text-text-dim">
            $ echo &quot;let&apos;s build something&quot;
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Have a project, a role, or just want to say hi?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">
            My inbox is open. I try to reply to everyone — even if it takes a
            few days.
          </p>

          <CopyEmailButton email={socials.email} />

          <div className="mt-8 flex items-center justify-center gap-5">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-dim transition-colors hover:text-accent"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <p className="mt-4 text-center font-mono text-xs text-text-dim">
        {profile.name} · built from scratch, not a template
      </p>
    </section>
  );
}
