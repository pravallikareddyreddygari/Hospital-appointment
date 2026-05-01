import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "MedBook - Hospital Appointment System",
  description: "Book medical appointments with top doctors. Video consultations available.",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.hospital-bg{fill:%23ffffff;}.hospital-border{fill:none;stroke:%232c3e50;stroke-width:3;}.hospital-cross{fill:%23e74c3c;}</style></defs><rect class="hospital-bg" width="100" height="100" rx="20"/><rect class="hospital-border" x="8" y="8" width="84" height="84" rx="16"/><g class="hospital-cross"><rect x="42" y="28" width="16" height="44" rx="2"/><rect x="28" y="42" width="44" height="16" rx="2"/></g></svg>',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50">
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
