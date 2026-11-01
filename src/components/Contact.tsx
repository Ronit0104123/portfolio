import { socials } from "@/lib/content";
import { Section } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CopyEmailButton } from "./CopyEmailButton";

const links = [
  { label: "GitHub", href: socials.github },
  { label: "LinkedIn", href: socials.linkedin },
  { label: "X", href: socials.twitter },
].filter((link) => link.href !== "#");

export function Contact() {
  return (
    <Section id="contact" index="05" title="Contact">
      <Reveal>
        <h2 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-text">
          Let&apos;s <span className="italic">talk.</span>
        </h2>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <a
            href={`mailto:${socials.email}`}
            className="link font-serif text-2xl text-text sm:text-3xl"
          >
            {socials.email}
          </a>
          <CopyEmailButton email={socials.email} />
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-text-muted"
              >
                {link.label}
                <span className="ml-0.5 text-text-dim">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
