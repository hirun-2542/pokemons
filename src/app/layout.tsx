import type { Metadata } from "next";
import { Inter, Sen } from "next/font/google";
import { ApolloProvider } from '@/lib/apolloProvider';
import "/public/globals.css"


const inter = Inter({ subsets: ["latin"] });
const sen = Sen({subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pokedex",
  description: "This is full list every pokemons",
  icons: "/Poké_Ball_icon.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sen.className} suppressHydrationWarning={true} >
      <div className="pokemon-circle">
        <div className="pokemon-line"></div>
      </div>
      <ApolloProvider>
          {children}
        </ApolloProvider>
        </body>
    </html>
  );
}
