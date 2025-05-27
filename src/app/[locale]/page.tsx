// Components
import TeamGenerator from "@/app/[locale]/components/TeamGenerator";

// Icons
import { Globe, Mail } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

// Translations
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Home() {
  // Translations
  const t = useTranslations("Page");

  return (
    <div>
      <main>
        <TeamGenerator />
      </main>
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 sm:py-6 px-2 sm:px-6 bg-white text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400 w-full mx-auto border-t border-zinc-200 dark:border-zinc-800 border-dashed">
        {/* Author Credits */}
        <p>
          {t("madeBy")}{" "}
          <span className="text-zinc-950 dark:text-zinc-50">
            Antonio Poloni
          </span>{" "}
          · © {new Date().getFullYear()}
        </p>

        {/* Social media links */}
        <nav className="flex items-center gap-6">
          <Link
            href="mailto:antoniopolonijr@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            <Mail className="h-7 w-7" aria-hidden="true" />
          </Link>

          <Link
            href="https://antoniopolonijr.github.io/index.html"
            aria-label="Website"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            <Globe className="h-7 w-7" aria-hidden="true" />
          </Link>

          <Link
            href="https://github.com/antoniopolonijr"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            <SiGithub className="h-7 w-7" aria-hidden="true" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/antonio-br%C3%A1s-poloni-j%C3%BAnior-27148390/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            <SiLinkedin className="h-7 w-7" aria-hidden="true" />
          </Link>
        </nav>
      </footer>
    </div>
  );
}
