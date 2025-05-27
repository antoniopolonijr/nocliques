import type { Metadata } from "next"; // Import Next.js Metadata type to type the metadata returned by the function
import "./globals.css"; // Import global CSS styles
import { Toaster } from "@/components/ui/toaster"; // Component to display toast notifications
import { ThemeProvider } from "@/components/theme-provider"; // Theme provider to enable dark/light mode support
import { NextIntlClientProvider, hasLocale, createTranslator } from "next-intl";
// next-intl library for internationalization: client provider, locale validator, and translator
import { notFound } from "next/navigation"; // Function to trigger 404 page
import { routing } from "@/i18n/routing"; // Routing config with supported locales and default locale
import { getMessages } from "@/lib/i18n/getMessages"; // Function to load locale message JSON files

/**
 * Generates the page metadata (like title and description) based on the locale parameter.
 *
 * @param params - Object containing route parameters (here, the locale)
 * @returns Promise<Metadata> - Returns metadata with translated title and description
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>; // `params` is a Promise resolving to an object with `locale` string
}): Promise<Metadata> {
  // Await the params Promise to get the locale value
  const { locale } = await params;

  // Load the locale-specific messages (e.g., 'en.json', 'pt.json')
  const messages = await getMessages(locale);

  // Create a translator scoped to the "Layout" namespace with locale and messages
  const t = createTranslator({ locale, messages, namespace: "Layout" });

  // Return metadata with translated title and description strings
  return {
    title: t("title"),
    description: t("description"),
  };
}

/**
 * Main layout component for routes with dynamic locale (e.g., "/en", "/pt").
 * Sets up theme, internationalization, and validates the locale parameter.
 *
 * @param children - React components to render inside the layout
 * @param params - Route parameters containing the locale
 * @returns JSX.Element - HTML structure of the layout
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode; // Any React nodes (components) to render inside this layout
  params: Promise<{ locale: string }>; // Params is a Promise resolving to { locale }
}) {
  // Await the params Promise to extract the locale string
  const { locale } = await params;

  // Check if the locale is supported based on routing config
  // If not supported, immediately return a 404 page
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load the messages JSON file for the current locale to provide translations
  const messages = await getMessages(locale);

  // Return the HTML layout with correct lang attribute and hydration warning suppressed
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        {/* ThemeProvider enables dark/light theme switching with system preference support */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* NextIntlClientProvider injects locale and messages for client-side internationalization */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Render any child components passed inside this layout */}
            {children}
            {/* Toaster component renders toast notifications in the UI */}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
