import { useTranslations } from "next-intl";
import {
  Phone,
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  Instagram,
} from "lucide-react";
import { business, telHref, whatsappHref } from "@/lib/business";
import type { ReactNode } from "react";

export function Contact({ locale }: { locale: "tr" | "en" }) {
  const t = useTranslations("contact");

  return (
    <section
      id="iletisim"
      className="relative py-20 sm:py-28 border-t border-ink-800/50 bg-ink-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="kicker">{t("kicker")}</span>
          <h2 className="section-title mt-4">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Phone — primary, span 2 */}
          <div className="lg:col-span-2 surface-card relative overflow-hidden rounded-2xl p-8 sm:p-10">
            <div
              className="absolute -right-12 -top-12 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(163,230,53,0.18) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <span className="kicker">{t("phoneLabel")}</span>
              <a
                href={telHref}
                className="mt-4 block font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-50 hover:text-brand-400 transition"
                data-cta="contact-phone-large"
              >
                {business.phone.display}
              </a>
              <p className="mt-3 text-base text-ink-300">
                {locale === "tr"
                  ? "Acil durumlarda doğrudan bu numarayı arayabilirsiniz."
                  : "For emergencies, call this number directly."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={telHref} className="btn btn-primary">
                  <Phone size={16} strokeWidth={2.5} />
                  {t("callCta")}
                </a>
                <a
                  href={whatsappHref(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  data-cta="contact-whatsapp-cta"
                >
                  <MessageCircle size={16} strokeWidth={2.5} />
                  {t("whatsappCta")}
                </a>
              </div>
            </div>
          </div>

          {/* Quick info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <InfoCard
              icon={<Clock size={18} />}
              label={t("hoursLabel")}
              value={business.hours[locale]}
            />
            <InfoCard
              icon={<MapPin size={18} />}
              label={t("addressLabel")}
              value={`${business.address.streetAddress}, ${business.address.locality} / ${business.address.region}`}
            />
          </div>
        </div>

        {/* Secondary contact row */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <ContactLink
            icon={<MessageCircle size={18} />}
            label={t("whatsappLabel")}
            value={business.phone.display}
            href={whatsappHref(locale)}
            external
            dataCta="contact-whatsapp-link"
          />
          <ContactLink
            icon={<Mail size={18} />}
            label={t("emailLabel")}
            value={business.email}
            href={`mailto:${business.email}`}
            dataCta="contact-email-link"
          />
          <ContactLink
            icon={<Instagram size={18} />}
            label={t("instagramLabel")}
            value={business.social.instagram.handle}
            href={business.social.instagram.url}
            external
            dataCta="contact-instagram-link"
          />
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-ink-800 bg-ink-900/60 p-5">
      <div className="flex items-center gap-2 text-brand-400">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="mt-2 text-base font-semibold text-ink-50">{value}</p>
    </div>
  );
}

function ContactLink({
  icon,
  label,
  value,
  href,
  external = false,
  dataCta,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  dataCta?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-cta={dataCta}
      className="group flex items-center gap-4 rounded-xl border border-ink-800 bg-ink-900/60 p-5 transition hover:border-brand-500/40 hover:bg-ink-900"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20 group-hover:bg-brand-500 group-hover:text-ink-950 transition">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-400">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-ink-50">
          {value}
        </p>
      </div>
    </a>
  );
}
