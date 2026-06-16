"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import GenericModal from "./GenericModal";
import ContactModal from "./ContactModal";
import { useToast } from "./ToastProvider";
import { motion } from "motion/react";
import ArkanLogo from "./ArkanLogo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Footer() {
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { addToast } = useToast();

  const handleOpenModal = (title: string, type: 'privacy' | 'terms') => {
    setModalContent({
      title,
      content: type === 'privacy' 
        ? <div className="space-y-4">
            <h4 className="font-bold text-lg text-arkan-orange">سياسة الخصوصية</h4>
            <p>نحن في أركان نولي أهمية قصوى لخصوصيتك وحماية بياناتك.</p>
            <p>1. جمع البيانات: نقوم بجمع المعلومات الأساسية كالاسم والبريد الإلكتروني فقط لغرض تحسين الخدمات وتجربة المستخدم.</p>
            <p>2. أمان المعلومات: جميع البيانات التي يتم جمعها مشفرة ومحفوظة في خوادم آمنة.</p>
            <p>3. مشاركة البيانات: نحن لا نبيع أو نشارك معلوماتك الشخصية مع أي طرف ثالث لأغراض تجارية.</p>
          </div>
        : <div className="space-y-4">
            <h4 className="font-bold text-lg text-arkan-orange">الشروط والأحكام</h4>
            <p>مرحباً بك في موقع أركان. باستخدامك لموقعنا، فإنك توافق على الشروط التالية:</p>
            <p>1. حقوق الطبع والنشر: جميع المحتويات من نصوص وصور تعود ملكيتها الفكرية لشركة أركان.</p>
            <p>2. الاستخدام: لا يجوز استخدام محتوى الموقع لأي أغراض تجارية دون الحصول على إذن خطي مسبق.</p>
            <p>3. إخلاء المسؤولية: نحرص على تقديم معلومات دقيقة، ولكن قد توجد بعض الأخطاء المطبعية التي يتم تعديلها باستمرار.</p>
          </div>
    })
  };

  const handleLinkClick = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    addToast(`جاري توجيهك إلى صفحة "${title}"...`);
  };

  return (
    <footer className="relative bg-arkan-orange text-white pt-24 pb-4 overflow-hidden mt-20">
      {/* Slanted Top Edge (Clip Path) */}
      <div className="absolute top-0 left-0 w-full h-16 bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          
          {/* Col 1: Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 items-start md:items-end font-bold text-lg">
             <Link href="#" onClick={(e) => handleLinkClick(e, 'اختر دجاجك بعناية')} className="hover:text-white/80 transition-colors">اختر دجاجك بعناية</Link>
             <Link href="#" onClick={(e) => handleLinkClick(e, 'شاهد الآن')} className="hover:text-white/80 transition-colors">شاهد الآن</Link>
             <Link href="#" onClick={(e) => handleLinkClick(e, 'إبداعات أركان')} className="hover:text-white/80 transition-colors">إبداعات أركان</Link>
             <button onClick={() => setIsContactOpen(true)} className="hover:text-white/80 transition-colors">تواصل معنا</button>
             <button onClick={() => handleOpenModal('سياسة الخصوصية', 'privacy')} className="hover:text-white/80 transition-colors">سياسة الخصوصية</button>
          </motion.div>

          {/* Col 2: Main Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 items-start md:items-end font-bold text-lg text-yellow-300">
             <Link href="#" className="hover:text-white transition-colors">الصفحة الرئيسية</Link>
             <Link href="#about" className="hover:text-white transition-colors text-white">عن أركان</Link>
             <Link href="#products" className="hover:text-white transition-colors text-white">منتجاتنا</Link>
             <Link href="#recipes" className="hover:text-white transition-colors text-white">وصفاتنا</Link>
             <button onClick={() => handleOpenModal('الشروط والأحكام', 'terms')} className="hover:text-white transition-colors text-white text-right">الشروط والأحكام</button>
          </motion.div>

          {/* Col 3: Address */}
          <motion.div variants={itemVariants} className="text-sm leading-loose">
             <p>شركة أركان للأغذية الدولية</p>
             <p>شركة أركان ذ.م.م</p>
             <p>مستودع رقم ٤</p>
             <p>المنطقة الصناعية بالحمراء</p>
             <p>رأس الخيمة</p>
             <p>ص.ب: ٣٥٧٣١</p>
             <p dir="ltr">+971 7 202 8031</p>
          </motion.div>

          {/* Col 4: Logo & Contact */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
             <div className="flex items-center justify-center">
               <ArkanLogo variant="footer" />
             </div>
             
             <div className="text-sm">
                <p>منتجات عالية الجودة</p>
                <p>منذ عام ١٩٥٦.</p>
                <p onClick={() => setIsContactOpen(true)} className="mt-2 text-white hover:underline cursor-pointer">info@arkanfoodsme.com</p>
             </div>

             <div className="flex items-center gap-4 mt-2">
               <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح يوتيوب..."); }} className="hover:text-white/70"><Youtube className="w-5 h-5" /></motion.a>
               <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح تيك توك..."); }} className="hover:text-white/70">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.34 2.88 2.88 0 012.31-4.53 2.66 2.66 0 011.69.71V8.67A6.84 6.84 0 0010.5 8a6.32 6.32 0 00-6.27 6.13A6.29 6.29 0 0010.5 20.4a6.28 6.28 0 005.45-5.88V9.33a8.27 8.27 0 005.15 1.77V7.65a5.77 5.77 0 01-1.51-.96z"/></svg>
               </motion.a>
               <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح انستجرام..."); }} className="hover:text-white/70"><Instagram className="w-5 h-5" /></motion.a>
               <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح فيسبوك..."); }} className="hover:text-white/70"><Facebook className="w-5 h-5" /></motion.a>
             </div>
             <p className="text-xs tracking-wider">@ARKANMIDDLEEAST</p>
          </motion.div>

        </div>

      </motion.div>
      
      {/* Copyright Bar */}
      <div className="w-full bg-white/20 py-3 text-center text-sm font-medium mt-8 border-t border-white/30">
          © {new Date().getFullYear()} أركان الشرق الأوسط
      </div>

      <GenericModal 
        isOpen={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title || ''}
      >
        {modalContent?.content}
      </GenericModal>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
}
