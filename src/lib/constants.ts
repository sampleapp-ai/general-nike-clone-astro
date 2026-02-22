export interface ProductSize {
  label: string;
  available: boolean;
}

export interface ProductData {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  description: string;
  category: string;
  isFeatured?: boolean;
  slug: string;
  sizes?: ProductSize[];
}

export interface StoreTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  heroGradient: string;
  headerBg: string;
  headerText: string;
  footerBg: string;
  footerText: string;
  topBarBg: string;
  topBarText: string;
  topBarHighlight: string;
}

export interface HeroSlide {
  title: string;
  heading: string;
  subtitle: string;
  cta: string;
  bgGradient: string;
  image: string;
}

export interface Category {
  name: string;
  image: string;
}

export interface Deal {
  highlight: string;
  text: string;
}

export interface NavItem {
  name: string;
  href: string;
  sale?: boolean;
}

export interface StoreConfig {
  brandName: string;
  tagline: string;
  theme: StoreTheme;
  navItems: NavItem[];
  featuredProduct: ProductData;
  products: ProductData[];
  deals: Deal[];
  heroSlides: HeroSlide[];
  categories: Category[];
  shippingCost: number;
  orderDetails: {
    orderId: string;
    estimatedDelivery: string;
  };
}

const featuredProduct: ProductData = {
  id: "grocery-1",
  image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop",
  brand: "Fresh Market",
  name: "Artisan Sourdough Bread",
  price: 6.99,
  description:
    "Hand-crafted sourdough bread made with organic flour and a 48-hour fermentation process. Crispy golden crust with a soft, tangy interior perfect for any meal.",
  category: "Bakery",
  isFeatured: true,
  slug: "artisan-sourdough-bread",
};

const products: ProductData[] = [
  featuredProduct,
  {
    id: "grocery-2",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=600&fit=crop",
    brand: "Fresh Market",
    name: "Organic Mixed Greens",
    price: 4.99,
    description: "Crisp organic mixed greens, locally sourced and farm-fresh.",
    category: "Produce",
    slug: "organic-mixed-greens",
  },
  {
    id: "grocery-3",
    image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=600&h=600&fit=crop",
    brand: "Fresh Market",
    name: "Extra Virgin Olive Oil",
    price: 12.99,
    originalPrice: 16.99,
    discount: "24% off",
    description: "Cold-pressed extra virgin olive oil from Italian olives.",
    category: "Pantry",
    slug: "extra-virgin-olive-oil",
  },
  {
    id: "grocery-4",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=600&fit=crop",
    brand: "Fresh Market",
    name: "Aged Parmesan Cheese",
    price: 8.99,
    description: "24-month aged Parmigiano-Reggiano, imported from Italy.",
    category: "Dairy",
    slug: "aged-parmesan-cheese",
  },
  {
    id: "grocery-5",
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&h=600&fit=crop",
    brand: "Fresh Market",
    name: "Fresh Pasta Bundle",
    price: 7.49,
    description: "Assorted fresh pasta made daily in-store.",
    category: "Pantry",
    slug: "fresh-pasta-bundle",
  },
  {
    id: "grocery-6",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=600&fit=crop",
    brand: "Fresh Market",
    name: "Reserve Red Wine",
    price: 18.99,
    description: "Full-bodied red wine with notes of cherry and oak.",
    category: "Wine & Spirits",
    slug: "reserve-red-wine",
  },
];

export const storeConfig: StoreConfig = {
  brandName: "Fresh Market",
  tagline: "Farm to Table, Every Day",
  theme: {
    primaryColor: "#2D8B4E",
    secondaryColor: "#8BC34A",
    accentColor: "#F0F9F0",
    heroGradient:
      "linear-gradient(135deg, #2D8B4E 0%, #4CAF50 50%, #8BC34A 100%)",
    headerBg: "#FFFFFF",
    headerText: "#1a1a1a",
    footerBg: "#1a2e1a",
    footerText: "#FFFFFF",
    topBarBg: "#2D8B4E",
    topBarText: "#FFFFFF",
    topBarHighlight: "#FFD700",
  },
  navItems: [
    { name: "Shop All", href: "#" },
    { name: "Produce", href: "#" },
    { name: "Bakery", href: "#" },
    { name: "Dairy", href: "#" },
    { name: "Meat & Seafood", href: "#" },
    { name: "Pantry", href: "#" },
    { name: "Beverages", href: "#" },
    { name: "Weekly Deals", href: "#", sale: true },
  ],
  featuredProduct,
  products,
  deals: [
    { highlight: "Free delivery", text: "on orders over $50" },
    { highlight: "20% off", text: "all organic produce" },
    { highlight: "Buy 2, get 1", text: "on bakery items" },
    { highlight: "Fresh daily", text: "locally sourced goods" },
  ],
  heroSlides: [
    {
      title: "Fresh This Week",
      heading: "Farm-Fresh Produce Delivered",
      subtitle:
        "Discover the finest selection of organic fruits and vegetables, delivered straight from local farms to your door.",
      cta: "Shop Produce",
      bgGradient:
        "linear-gradient(135deg, #2D8B4E 0%, #4CAF50 50%, #8BC34A 100%)",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
    },
    {
      title: "Limited Time",
      heading: "Organic Sale — Up to 30% Off",
      subtitle:
        "Stock your kitchen with premium organic ingredients at unbeatable prices.",
      cta: "Shop Sale",
      bgGradient:
        "linear-gradient(135deg, #1B5E20 0%, #2D8B4E 50%, #66BB6A 100%)",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop",
    },
  ],
  categories: [
    {
      name: "Organic Produce",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    },
    {
      name: "Bakery",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    },
    {
      name: "Deli",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
    },
    {
      name: "Wine & Spirits",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop",
    },
  ],
  shippingCost: 4.99,
  orderDetails: {
    orderId: "FM-294710",
    estimatedDelivery: "Today, 4:00 - 5:00 PM",
  },
};
