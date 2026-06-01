import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const mauticBaseUrl = (process.env.MAUTIC_BASE_URL ?? "https://mautic.liqentech.com").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "ClinicFlow - GDPR-Compliant Marketing Automation for Clinics",
  description:
    "Self-hosted Mautic automation for European clinics: reminders, patient journeys, newsletters, and GDPR-safe tracking."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          id="mautic-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
              w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t),
              m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
              })(window,document,'script','${mauticBaseUrl}/mtc.js','mt');
              mt('send', 'pageview');
            `
          }}
        />
      </body>
    </html>
  );
}
