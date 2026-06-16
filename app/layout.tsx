import type {Metadata} from 'next';
import {Tajawal, Inter} from 'next/font/google';
import './globals.css';
import {ToastProvider} from '@/components/ToastProvider';
import {LanguageProvider} from '@/components/LanguageProvider';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'أركان - جودة فائقة لمائدة عائلتك',
  description: 'الصفحة الرئيسية لمنتجات أركان',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${inter.variable}`}
      style={{scrollPaddingTop: '5rem'}}
      suppressHydrationWarning
    >
      <body className="font-arabic antialiased gpu-layer" suppressHydrationWarning>
        <LanguageProvider>
          <ToastProvider>{children}</ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
