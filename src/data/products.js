export const CATEGORIES = [
  { id: 'gifts', name: 'هدايا', icon: 'Gift', color: 'from-amber-100 to-amber-50' },
  { id: 'makeup', name: 'مكياج', icon: 'Sparkles', color: 'from-rose-100 to-rose-50' },
  { id: 'accessories', name: 'إكسسوارات', icon: 'Gem', color: 'from-purple-100 to-purple-50' },
  { id: 'toys', name: 'ألعاب', icon: 'Gamepad2', color: 'from-blue-100 to-blue-50' },
  { id: 'decor', name: 'ديكور', icon: 'Home', color: 'from-emerald-100 to-emerald-50' },
  { id: 'cosmetics', name: 'كوسميتيك', icon: 'Heart', color: 'from-pink-100 to-pink-50' },
  { id: 'flowers', name: 'ورود', icon: 'Flower2', color: 'from-red-100 to-red-50' },
  { id: 'perfumes', name: 'عطور', icon: 'Droplets', color: 'from-amber-200 to-amber-100' },
  { id: 'occasions', name: 'هدايا المناسبات', icon: 'PartyPopper', color: 'from-yellow-100 to-amber-50' },
];

export const DEMO_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'علبة هدايا ملكية فاخرة - طقم مكتمل',
    sku: 'GIFT-ROYAL-01',
    category: 'gifts',
    price: 4500,
    oldPrice: 5800,
    stock: 12,
    rating: 4.9,
    reviewsCount: 38,
    isFeatured: true,
    isBestseller: true,
    isNew: true,
    badge: 'الأكثر مبيعاً',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'علبة هدايا فاخرة من الكوسميتيك والعطور المصممة بعناية لمختلف المناسبات السعيدة.',
    variants: [
      { name: 'اللون', options: ['وردي ملكي', 'ذهب شامبانيا'] }
    ]
  },
  {
    id: 'prod-2',
    name: 'مجموعة أحمر شفاه مات درجات الخريف',
    sku: 'MK-LIP-02',
    category: 'makeup',
    price: 1800,
    oldPrice: 2400,
    stock: 25,
    rating: 4.8,
    reviewsCount: 19,
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    badge: 'جديد',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'مجموعة أحمر شفاه تدوم طويلاً بتركيبة مرطبة وألوان مخملية ساحرة.',
    variants: []
  },
  {
    id: 'prod-3',
    name: 'عطر نسائي فاخر - Cos Abdelhak Signature',
    sku: 'PERF-COS-01',
    category: 'perfumes',
    price: 3200,
    oldPrice: 4000,
    stock: 8,
    rating: 5.0,
    reviewsCount: 42,
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    badge: 'مميز',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'عطر أنثوي جذاب بلمسات الورد والفل والصندل يدوم لأكثر من 24 ساعة.',
    variants: [
      { name: 'الحجم', options: ['50 مل', '100 مل'] }
    ]
  },
  {
    id: 'prod-4',
    name: 'طقم إكسسوارات ذهبي مطلي فاخر',
    sku: 'ACC-GOLD-01',
    category: 'accessories',
    price: 2200,
    oldPrice: 2900,
    stock: 15,
    rating: 4.7,
    reviewsCount: 15,
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    badge: 'عرض خاص',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'طقم إكسسوارات أنيق يتكون من قلادة وأقراط مقاومة للتغير مع مرار الوقت.',
    variants: []
  },
  {
    id: 'prod-5',
    name: 'باقة ورود طبيعية محفوظة هدية',
    sku: 'FLW-ROSE-01',
    category: 'flowers',
    price: 3800,
    oldPrice: 4500,
    stock: 5,
    rating: 4.9,
    reviewsCount: 27,
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    badge: 'حصري',
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'ورد طبيعي دائم ومحفوظ بعناية داخل غلاف زجاجي أنيق.',
    variants: []
  },
  {
    id: 'prod-6',
    name: 'سيروم العناية بالبشرة وفيتامين سي',
    sku: 'COS-SERUM-01',
    category: 'cosmetics',
    price: 2600,
    oldPrice: 3200,
    stock: 20,
    rating: 4.8,
    reviewsCount: 50,
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    badge: 'الأكثر طلباً',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'سيروم نضارة فوري يغذي البشرة ويعيد إليها حيوية ومظهرها المشرق.',
    variants: []
  }
];
