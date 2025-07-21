import { Montserrat, Urbanist } from "next/font/google";
import "./globals.css";

// Load Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

// Load Urbanist
const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
});

export const metadata = {
  title: {
    default: "InvestIQ Capital",
    template: "%s -InvestIQ Capital",
  },
  description:
    "InvestIQ Capital: Your trusted partner for expert financial guidance, strategic investments, and wealth management solutions. Empowering you to secure a prosperous future.",
  twitter: {
    card: "summary_large_image",
    site: "@InvestIQCapital",
  },
  author: "InvestIQ Capital Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="font-montserrat">
        {children}
      </body>
    </html>
  );
}
