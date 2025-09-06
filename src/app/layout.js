import "./globals.css";
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/scrollToTop";


export const metadata = {
  title: "Main Page | Coffee Shop",
  description: "Coffee Shop Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AOSInit />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
