import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../../context/authContext"; // Ensure the import path is correct

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Larva Attendance",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
