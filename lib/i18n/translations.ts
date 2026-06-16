export type Locale = "ar" | "en";

export type NavLinkKey =
  | "home"
  | "about"
  | "products"
  | "recipes"
  | "benefits"
  | "chooseChicken"
  | "whatsNew";

export type ProductId = 1 | 2 | 3 | 4 | 5;

export type SlideId = 1 | 2 | 3;

export type Translations = {
  meta: { title: string; description: string };
  nav: Record<NavLinkKey, string>;
  navKeys: NavLinkKey[];
  language: { en: string; ar: string; switchedTo: string };
  common: {
    brand: string;
    brandEn: string;
    halal: string;
    search: string;
    close: string;
    openMenu: string;
    closeMenu: string;
    sectionComingSoon: string;
    openingFacebook: string;
    openingInstagram: string;
    openingTwitter: string;
    openingYoutube: string;
    openingSearch: string;
    homeAria: string;
  };
  hero: {
    slides: Record<
      SlideId,
      { lineTop: string; lineBottom: string; accent: string; alt: string }
    >;
    welcomeToast: string;
    discoverProducts: string;
    freezingBenefits: string;
    aboutArkan: string;
    prevSlide: string;
    nextSlide: string;
    goToSlide: string;
    scrollToProducts: string;
  };
  products: {
    heading: string;
    subheading: string;
    body: string;
    brandBadge: string;
    quickView: string;
    prev: string;
    next: string;
    page: string;
    features: string;
    addToCart: string;
    addedToCart: string;
    modalExtra: string;
    viewDetails: string;
    items: Record<
      ProductId,
      {
        title: string;
        desc: string;
        badge: string;
        weight: string;
        features: string[];
      }
    >;
  };
};

export const translations: Record<Locale, Translations> = {
  ar: {
    meta: {
      title: "أركان - جودة فائقة لمائدة عائلتك",
      description: "الصفحة الرئيسية لمنتجات أركان",
    },
    nav: {
      home: "الصفحة الرئيسية",
      about: "عن أركان",
      products: "منتجاتنا",
      recipes: "وصفاتنا",
      benefits: "فوائد التجميد",
      chooseChicken: "اختر دجاجك بعناية",
      whatsNew: "جديد أركان",
    },
    navKeys: [
      "home",
      "about",
      "products",
      "recipes",
      "benefits",
      "chooseChicken",
      "whatsNew",
    ],
    language: {
      en: "EN",
      ar: "العربية",
      switchedTo: "تم التبديل إلى",
    },
    common: {
      brand: "أركان",
      brandEn: "Arkan",
      halal: "حلال",
      search: "بحث",
      close: "إغلاق",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      sectionComingSoon: "قيد التطوير",
      openingFacebook: "جاري فتح فيسبوك...",
      openingInstagram: "جاري فتح انستجرام...",
      openingTwitter: "جاري فتح تويتر...",
      openingYoutube: "جاري فتح يوتيوب...",
      openingSearch: "جاري فتح نافذة البحث...",
      homeAria: "أركان — الصفحة الرئيسية",
    },
    hero: {
      slides: {
        1: {
          lineTop: "يا لذّة",
          lineBottom: "ما جربتها",
          accent: "يا تحبها",
          alt: "عائلة تستمتع بوجبة أركان",
        },
        2: {
          lineTop: "جودة",
          lineBottom: "منذ ١٩٥٦",
          accent: "بكل ثقة",
          alt: "وجبة مشوية لذيذة",
        },
        3: {
          lineTop: "نكهة",
          lineBottom: "أصيلة",
          accent: "في كل لقمة",
          alt: "طبق أركان الشهي",
        },
      },
      welcomeToast: "مرحباً بك في عالم أركان — جودة فائقة منذ ١٩٥٦",
      discoverProducts: "اكتشف منتجاتنا",
      freezingBenefits: "فوائد التجميد",
      aboutArkan: "عن أركان",
      prevSlide: "الشريحة السابقة",
      nextSlide: "الشريحة التالية",
      goToSlide: "الانتقال إلى الشريحة",
      scrollToProducts: "انتقل إلى المنتجات",
    },
    products: {
      heading: "منتجاتنا المميزة",
      subheading: "منتجات لا تقاوم",
      body: "نجتهد في أركان لتحضير منتجاتنا بكل حب وشغف، لنقدم للمستهلكين تشكيلة واسعة محضرة بعناية فائقة وجودة ممتازة — من البرجر إلى الدجاج المقرمش، كل منتج يحمل توقيع الجودة الذي عرفتمونا به.",
      brandBadge: "أركان",
      quickView: "عرض التفاصيل",
      prev: "المنتجات السابقة",
      next: "المنتجات التالية",
      page: "صفحة",
      features: "المميزات",
      addToCart: "أضف إلى السلة",
      addedToCart: "تم إضافة {product} إلى السلة بنجاح!",
      modalExtra:
        "نقدم لك في أركان أفضل المكونات الطازجة لتبدع في مطبخك وتقدم أشهى الأطباق لعائلتك بكل ثقة.",
      viewDetails: "عرض تفاصيل",
      items: {
        1: {
          title: "برجر بقري",
          desc: "برجر بقري بخلطة البهارات العربية الأصيلة",
          badge: "برجر بقري",
          weight: "1344غ",
          features: [
            "خالي من الألوان الاصطناعية",
            "خالي من المواد الحافظة",
            "حلال",
          ],
        },
        2: {
          title: "بطاطس مقلية",
          desc: "بطاطس عالية الجودة مقرمشة وجاهزة للتقديم",
          badge: "بطاطس مقلية",
          weight: "2500غ",
          features: ["خالي من الزيوت المهدرجة", "خالي من المواد الحافظة"],
        },
        3: {
          title: "لحمة مفرومة",
          desc: "لحمة مفرومة طازجة وعالية الجودة",
          badge: "لحمة مفرومة",
          weight: "400غ",
          features: ["لحم بقر صافي 100%", "حلال"],
        },
        4: {
          title: "لحم مبرد",
          desc: "قطع لحم مبردة طازجة يومياً",
          badge: "لحم مبرد",
          weight: "1000غ",
          features: ["طازج يومياً", "جودة فائقة"],
        },
        5: {
          title: "ستربس دجاج",
          desc: "قطع دجاج مقرمشة بتتبيلة حارة مميزة",
          badge: "ستربس دجاج",
          weight: "750غ",
          features: ["لحم صدر دجاج صافي 100%", "مقرمش ولذيذ"],
        },
      },
    },
  },
  en: {
    meta: {
      title: "Arkan Foods — Premium Quality for Your Family Table",
      description: "Official homepage of Arkan Foods premium products",
    },
    nav: {
      home: "Home",
      about: "About Arkan",
      products: "Our Products",
      recipes: "Recipes",
      benefits: "Freezing Benefits",
      chooseChicken: "Choose Your Chicken",
      whatsNew: "What's New",
    },
    navKeys: [
      "home",
      "about",
      "products",
      "recipes",
      "benefits",
      "chooseChicken",
      "whatsNew",
    ],
    language: {
      en: "EN",
      ar: "العربية",
      switchedTo: "Switched to",
    },
    common: {
      brand: "Arkan",
      brandEn: "Arkan",
      halal: "Halal",
      search: "Search",
      close: "Close",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      sectionComingSoon: "coming soon",
      openingFacebook: "Opening Facebook...",
      openingInstagram: "Opening Instagram...",
      openingTwitter: "Opening Twitter...",
      openingYoutube: "Opening YouTube...",
      openingSearch: "Opening search...",
      homeAria: "Arkan Foods — Home",
    },
    hero: {
      slides: {
        1: {
          lineTop: "A Taste",
          lineBottom: "You've Never Had",
          accent: "You'll Love It",
          alt: "Family enjoying an Arkan meal",
        },
        2: {
          lineTop: "Quality",
          lineBottom: "Since 1956",
          accent: "With Confidence",
          alt: "Delicious grilled meal",
        },
        3: {
          lineTop: "Authentic",
          lineBottom: "Flavor",
          accent: "In Every Bite",
          alt: "Signature Arkan dish",
        },
      },
      welcomeToast: "Welcome to Arkan Foods — premium quality since 1956",
      discoverProducts: "Discover Our Products",
      freezingBenefits: "Freezing Benefits",
      aboutArkan: "About Arkan",
      prevSlide: "Previous slide",
      nextSlide: "Next slide",
      goToSlide: "Go to slide",
      scrollToProducts: "Scroll to products",
    },
    products: {
      heading: "Featured Products",
      subheading: "Irresistible Selection",
      body: "At Arkan Foods, we craft every product with passion and precision — from premium beef burgers to crispy chicken strips. Each item carries the signature quality families have trusted for generations.",
      brandBadge: "Arkan",
      quickView: "Quick View",
      prev: "Previous products",
      next: "Next products",
      page: "Page",
      features: "Features",
      addToCart: "Add to Cart",
      addedToCart: "{product} has been added to your cart!",
      modalExtra:
        "Arkan Foods brings you the finest ingredients so you can create memorable meals for your family with complete confidence.",
      viewDetails: "View details for",
      items: {
        1: {
          title: "Beef Burger",
          desc: "Premium beef burger with authentic Arabian spice blend",
          badge: "Beef Burger",
          weight: "1344g",
          features: [
            "No artificial colors",
            "No preservatives",
            "Halal certified",
          ],
        },
        2: {
          title: "French Fries",
          desc: "High-quality crispy fries, ready to serve",
          badge: "French Fries",
          weight: "2500g",
          features: ["No trans fats", "No preservatives"],
        },
        3: {
          title: "Ground Beef",
          desc: "Fresh, premium-quality ground beef",
          badge: "Ground Beef",
          weight: "400g",
          features: ["100% pure beef", "Halal certified"],
        },
        4: {
          title: "Chilled Meat",
          desc: "Fresh chilled meat cuts, delivered daily",
          badge: "Chilled Meat",
          weight: "1000g",
          features: ["Fresh daily", "Premium grade"],
        },
        5: {
          title: "Chicken Strips",
          desc: "Crispy chicken strips with a signature spicy marinade",
          badge: "Chicken Strips",
          weight: "750g",
          features: ["100% chicken breast", "Crispy & delicious"],
        },
      },
    },
  },
};

export const navHrefs: Record<NavLinkKey, string> = {
  home: "#",
  about: "#about",
  products: "#products",
  recipes: "#recipes",
  benefits: "#benefits",
  chooseChicken: "#",
  whatsNew: "#",
};

export const productMeta: Record<
  ProductId,
  {
    id: ProductId;
    badgeColor: string;
    accentRing: string;
    image: string;
  }
> = {
  1: {
    id: 1,
    badgeColor: "bg-arkan-orange",
    accentRing: "ring-arkan-orange/20",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
  },
  2: {
    id: 2,
    badgeColor: "bg-emerald-600",
    accentRing: "ring-emerald-500/20",
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop",
  },
  3: {
    id: 3,
    badgeColor: "bg-red-700",
    accentRing: "ring-red-500/20",
    image:
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=600&auto=format&fit=crop",
  },
  4: {
    id: 4,
    badgeColor: "bg-blue-600",
    accentRing: "ring-blue-500/20",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
  },
  5: {
    id: 5,
    badgeColor: "bg-red-600",
    accentRing: "ring-red-500/20",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop",
  },
};

export const heroSlideImages: Record<
  SlideId,
  { image: string }
> = {
  1: {
    image:
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=75&w=1280&auto=format&fit=crop",
  },
  2: {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=75&w=1280&auto=format&fit=crop",
  },
  3: {
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=75&w=1280&auto=format&fit=crop",
  },
};

export const productIds: ProductId[] = [1, 2, 3, 4, 5];
export const slideIds: SlideId[] = [1, 2, 3];
