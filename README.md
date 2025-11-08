# NextLevel - Modern Web Development Platform

A next-level website built with cutting-edge technologies for the modern web. This project showcases the power of combining Next.js 14 with Turbopack, Tailwind CSS, ShadCN/UI, and advanced animations.

## 🚀 Tech Stack

### Framework
- **Next.js 14** with Turbopack for lightning-fast development
- **TypeScript** for type safety and better developer experience

### Styling & UI
- **Tailwind CSS** for utility-first styling
- **ShadCN/UI** for beautiful, accessible components
- **Framer Motion** for smooth animations and interactions

### Animations & Interactions
- **Lenis** for smooth scrolling experience
- **Motion One** for high-performance animations
- **Custom CSS animations** for unique visual effects

### State Management & Forms
- **Zustand** for lightweight state management
- **React Hook Form** with Zod validation for robust forms
- **TanStack Query** for server state management

### Development Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for type checking

## 🎨 Features

- **Modern Design**: Clean, gradient-rich interface with glassmorphism effects
- **Smooth Animations**: Framer Motion powered interactions and transitions
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Scrolling**: Lenis integration for buttery smooth page scrolling
- **Interactive Components**: Hover effects, micro-interactions, and animated elements
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Performance Optimized**: Built with Next.js 14 and Turbopack for optimal performance

## 🛠 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main landing page
│   └── providers.tsx        # App providers (Query, etc.)
├── components/
│   ├── ui/                  # ShadCN/UI components
│   ├── navigation.tsx       # Main navigation component
│   ├── hero-section.tsx     # Hero section with animations
│   ├── features-section.tsx # Features showcase
│   ├── contact-section.tsx  # Contact form
│   └── footer.tsx           # Footer component
└── lib/
    ├── utils.ts             # Utility functions
    ├── lenis.ts             # Smooth scrolling setup
    └── store.ts             # Zustand store
```

## 🎯 Key Components

### Navigation
- Fixed header with smooth scroll navigation
- Mobile-responsive hamburger menu
- Animated brand logo and menu items

### Hero Section
- Animated gradient backgrounds
- Floating icon animations
- Call-to-action buttons with hover effects
- Feature cards with micro-interactions

### Features Section
- Grid layout with animated cards
- Icon animations on hover
- Staggered entrance animations
- Gradient progress bars

### Contact Section
- React Hook Form with Zod validation
- Real-time form validation
- Animated contact information cards
- Newsletter signup

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

The project includes all necessary configuration for seamless Vercel deployment.

## 🔧 Customization

### Colors & Themes
Modify the gradient colors in `tailwind.config.js` and component files to match your brand.

### Animations
Adjust animation timings and effects in:
- `globals.css` for custom animations
- Component files for Framer Motion animations
- `lenis.ts` for scroll behavior

### Content
Update text content, images, and links in the respective component files.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using modern web technologies. Ready to take your web development to the next level!
