import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'Admin Panel | Abhay Portfolio',
  description: 'CMS Admin Panel for managing the portfolio website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full font-sans bg-[#0b0b10] text-slate-100">
        <AuthProvider>
          {children}
          <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
        </AuthProvider>
      </body>
    </html>
  );
}
