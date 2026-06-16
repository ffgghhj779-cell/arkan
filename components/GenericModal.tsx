"use client";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function GenericModal({ isOpen, onClose, title, children }: GenericModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border-t-8 border-arkan-orange"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-2xl font-black text-arkan-navy">{title}</h3>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 text-gray-600 leading-relaxed font-medium">
              {children}
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 text-left">
               <button 
                 onClick={onClose}
                 className="bg-arkan-navy hover:bg-opacity-90 text-white px-6 py-2 rounded-full font-bold transition-colors"
               >
                 إغلاق
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
