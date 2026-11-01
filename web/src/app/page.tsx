import { Band } from "@/components/Band";
import { Footer } from "@/components/Footer";
import { Founder } from "@/components/Founder";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Observations } from "@/components/Observations";
import { Problem } from "@/components/Problem";
import { Status } from "@/components/Status";
import { Talk } from "@/components/Talk";
import { Timing } from "@/components/Timing";
import { CONTACT_EMAIL, FOUNDER_LINKEDIN, FOUNDER_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: CONTACT_EMAIL,
  description: SITE_DESCRIPTION,
  slogan: "Make all your technology work as one business.",
  founder: { "@type": "Person", name: FOUNDER_NAME, jobTitle: "Founder", sameAs: [FOUNDER_LINKEDIN] },
  address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressCountry: "IN" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav home />
      <main>
        <Hero />
        <Problem />
        <Band />
        <Timing />
        <Observations />
        <Status />
        <Founder />
        <Talk />
      </main>
      <Footer />
    </>
  );
}
