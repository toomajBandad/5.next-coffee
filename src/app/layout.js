import "./globals.css";


export const metadata = {
  title: "Main Page | Coffee Shop",
  description: "Coffee Shop Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
