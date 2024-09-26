import localFont from "next/font/local";
import "./globals.css";
import MenuCard from "./_components/menuCard";
import Footer from "./_components/footer";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Plataforma de Clubes UNICIT",
  description: "Plataforma de Clubes UNICIT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
          <meta charset="UTF-8" />
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       {children}
       <Footer/>
      </body>
    </html >
  );
}
