import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ServiceArea } from "@/components/ServiceArea";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale as "tr" | "en"} />
      <main>
        <Hero locale={locale as "tr" | "en"} />
        <Services />
        <ServiceArea />
        <About />
        <Contact locale={locale as "tr" | "en"} />
      </main>
      <Footer />
      <FloatingCTA locale={locale as "tr" | "en"} />
    </>
  );
}
