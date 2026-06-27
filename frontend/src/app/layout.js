import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/layout/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Abhay Kumar Upadhyay | Data Analyst Portfolio",
  description: "Portfolio of Abhay Kumar Upadhyay - Data Analyst with expertise in Power BI, SQL, Python, Pandas, and data visualization.",
  keywords: ["Data Analyst", "Data Science", "Power BI", "SQL", "Python", "Pandas", "Portfolio"],
  authors: [{ name: "Abhay Kumar Upadhyay" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} style={{ scrollBehavior: 'smooth' }}>
      <body className="min-h-full flex flex-col font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
