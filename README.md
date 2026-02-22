# Fresh Market Grocery Store - Astro + React

A modern grocery store e-commerce application built with Astro and React, featuring Stripe checkout integration.

## Features

- Server-side rendering with Astro
- React components with client-side hydration
- Nanostores for cart state management
- LocalStorage persistence for cart data
- Tailwind CSS v4 for styling
- Stripe checkout integration with real payment confirmation
- Framer Motion animations
- Lucide React icons
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
/
├── src/
│   ├── components/         # React components
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── CheckoutSuccess.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── HomePage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── StoreFooter.tsx
│   │   ├── StoreHeader.tsx
│   │   ├── StoreNavigation.tsx
│   │   ├── StripeCheckout.tsx
│   │   └── TopBar.tsx
│   ├── layouts/           # Astro layouts
│   │   └── Layout.astro
│   ├── lib/              # Utilities and constants
│   │   └── constants.ts
│   ├── pages/            # Astro pages (routes)
│   │   ├── api/
│   │   │   ├── create-checkout-session.ts
│   │   │   └── session-status.ts
│   │   ├── checkout/
│   │   │   ├── stripe.astro
│   │   │   └── success.astro
│   │   ├── cart.astro
│   │   ├── checkout.astro
│   │   ├── index.astro
│   │   └── product.astro
│   ├── stores/           # Nanostores
│   │   └── cart.ts
│   └── styles/           # Global styles
│       └── globals.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Key Implementation Details

### Cart Management

The cart uses nanostores for state management with localStorage persistence:

```typescript
// Cart is persisted to localStorage with key: "grocery-store-cart"
import { $cartItems, addToCart, removeFromCart } from '../stores/cart';
```

### Stripe Integration

- Uses Stripe Checkout in custom UI mode
- Real `checkout.confirm()` call (not mocked)
- Payment success redirects to `/checkout/success`

### Astro-Specific Patterns

- React components use `client:load` directive for hydration
- API routes follow Astro's API route convention
- Navigation uses standard `<a>` tags
- Cart state loads on client-side to avoid hydration mismatch

## Important Notes

- No console.log/console.error/console.warn statements in the codebase
- Cart waits for hydration before showing empty state
- Product page adds to cart with default size (no size selection required)
- Identical UI and flow to the Next.js version

## Technology Stack

- **Framework**: Astro 5.x
- **UI Library**: React 19.x
- **State Management**: Nanostores
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Payments**: Stripe
- **TypeScript**: 5.x

## License

This is a demo project for educational purposes.
