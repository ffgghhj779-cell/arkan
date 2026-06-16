"use client";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "./ToastProvider";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    addToast("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
    setFormData({ name: "", email: "", message: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-arkan-navy/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl w-full max-w-lg p-8 shadow-premium overflow-hidden"
          >
            {/* Top decorative bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-arkan-orange to-yellow-400" />
            
            <button 
              onClick={onClose} 
              className="absolute top-6 left-6 p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-3xl font-black text-arkan-navy mb-2">تواصل معنا</h3>
            <p className="text-gray-500 mb-8 font-medium">نحن هنا للإجابة على استفساراتك واستقبال مقترحاتك.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-arkan-navy mb-2">الاسم الكامل</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-arkan-orange focus:ring-2 focus:ring-arkan-orange/20 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                  placeholder="أدخل اسمك الكريم"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-arkan-navy mb-2">البريد الإلكتروني</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-arkan-orange focus:ring-2 focus:ring-arkan-orange/20 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                  placeholder="example@domain.com"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-arkan-navy mb-2">رسالتك</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-arkan-orange focus:ring-2 focus:ring-arkan-orange/20 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white resize-none"
                  placeholder="كيف يمكننا مساعدتك؟"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-arkan-orange hover:bg-arkan-orange-hover text-white py-4 rounded-xl font-black text-lg transition-colors flex items-center justify-center gap-3 shadow-lg shadow-arkan-orange/20 mt-4 outline-none focus-visible:ring-4 focus-visible:ring-arkan-orange/30 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5 rtl:rotate-180" />
                    إرسال الرسالة
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
