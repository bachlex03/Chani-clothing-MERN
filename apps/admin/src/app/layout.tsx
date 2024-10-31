import type { Metadata } from 'next';
import '~/styles/globals.css';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '~/components/themesProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import theme from '~/mui/theme';
import { CssBaseline } from '@mui/material';
import { Toaster } from '~/components/ui/toaster';

const roboto = Roboto({
   subsets: ['latin'],
   variable: '--font-roboto',
   weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <head>
            <meta
               name="viewport"
               content="initial-scale=1, width=device-width"
            />
         </head>
         <body className={`${roboto.variable} antialiased`}>
            {/* <Toaster />
            <ThemeProvider
               attribute="class"
               defaultTheme="dark"
               enableSystem={false}
               disableTransitionOnChange
            >
            </ThemeProvider> */}
            <main>{children}</main>
         </body>
      </html>
   );
}
