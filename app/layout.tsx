import type {Metadata} from 'next';
import {Tajawal} from 'next/font/google';
import './globals.css';
import {ToastProvider} from '@/components/ToastProvider';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'أركان - جودة فائقة لمائدة عائلتك',
  description: 'الصفحة الرئيسية لمنتجات أركان',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} scroll-smooth`} style={{ scrollPaddingTop: '6rem' }}>
      <body className="font-arabic antialiased" suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
