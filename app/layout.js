import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio Fabrice FOLLY",
  description: "Explorez le portfolio de Teko Folly, développeur web passionné. Découvrez mes réalisations et projets dans le domaine du web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
