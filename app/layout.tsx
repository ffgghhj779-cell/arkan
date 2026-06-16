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
    <html lang="ar" dir="rtl" className={`${tajawal.variable}`} style={{ scrollPaddingTop: '5rem' }}>
      <body className="font-arabic antialiased gpu-layer" suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
