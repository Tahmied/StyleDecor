# StyleDecor Frontend

<img src='https://raw.githubusercontent.com/Tahmied/StyleDecor/refs/heads/main/screenshot.png' alt='StyleDecor UI'/>

> **Frontend application for StyleDecor - A modern appointment management system for decoration services with real-time booking, Stripe payments, and role-based dashboards**

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8.svg)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.x-brightgreen.svg)](https://next-auth.js.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Authentication System](#authentication-system)
- [API Integration](#api-integration)
- [Protected Routes](#protected-routes)
- [Key Features](#key-features)
- [Backend Repository](#backend-repository)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

StyleDecor Frontend is a modern, responsive web application built with Next.js 14 that provides a seamless user experience for booking decoration services. The application features role-based dashboards for Users, Decorators, and Admins, integrated Stripe payment processing, real-time booking management, and a beautiful UI powered by Tailwind CSS.

### 🌟 Why StyleDecor Frontend?

Traditional decoration booking systems lack:
- Modern, intuitive user interfaces
- Real-time availability checking
- Secure online payments
- Role-specific dashboards
- Mobile responsiveness

StyleDecor Frontend solves these problems with a cutting-edge tech stack and user-centric design.

## ✨ Features

### Core Functionality
- 🔐 **Multi-Provider Authentication**: Email/password and Google OAuth via NextAuth.js
- 🎨 **Service Browsing**: Browse and search decoration services with advanced filters
- 📅 **Smart Booking System**: Real-time decorator availability and instant booking
- 💳 **Stripe Integration**: Secure payment processing with Stripe Checkout
- 👤 **Role-Based Dashboards**: Separate interfaces for Users, Decorators, and Admins
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🖼️ **Image Management**: Cloudinary integration for image uploads and optimization
- 🔔 **Real-Time Updates**: Live booking status and project progress tracking

### User Features
- Browse services by category (Wedding, Birthday, Corporate, Home, Seasonal)
- View decorator profiles with ratings and specialties
- Check decorator availability in real-time
- Book services with flexible date and time selection
- Make secure payments via Stripe
- Track booking status and project progress
- View booking history and payment receipts

### Decorator Features
- View assigned bookings and project details
- Update project status with multi-step workflow
- Manage availability calendar
- Track earnings and payment history
- View customer contact information
- Receive booking notifications

### Admin Features
- Complete service management (CRUD operations)
- User management and role assignment
- Booking oversight and decorator assignment
- Payment tracking and analytics
- Feature decorator promotion
- System-wide statistics dashboard

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js (Credentials + Google OAuth)
- **HTTP Client**: Axios
- **Payment**: Stripe Checkout
- **Image Management**: Cloudinary
- **State Management**: React Hooks + Context API

### Key NPM Packages

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "next-auth": "^4.24.0",
  "axios": "^1.6.0",
  "tailwindcss": "^3.4.0",
  "@stripe/stripe-js": "^2.0.0",
  "cloudinary": "^1.41.0",
  "framer-motion": "^10.0.0",
  "react-leaflet": "^4.2.1",
  "daisyui": "^4.0.0"
}
```
# Project Structure

```
styledecor
├── .env
├── .gitignore
├── README.md
├── app
│   ├── (Homepage)
│   │   ├── layout.tsx
│   │   └── page.jsx
│   ├── (admin)
│   │   ├── admin
│   │   │   ├── bookings
│   │   │   │   └── page.jsx
│   │   │   ├── decorators
│   │   │   │   └── page.jsx
│   │   │   ├── package
│   │   │   │   └── page.jsx
│   │   │   ├── page.jsx
│   │   │   └── services
│   │   │       └── page.jsx
│   │   └── layout.tsx
│   ├── about
│   │   ├── layout.tsx
│   │   └── page.jsx
│   ├── actions
│   │   └── upload.js
│   ├── api
│   │   ├── auth
│   │       └── [...nextauth]
│   │           └── route.js
│   ├── dashboard
│   │   ├── decoratorDashboard.jsx
│   │   ├── layout.tsx
│   │   └── page.jsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── icon.png
│   ├── layout.tsx
│   ├── login
│   │   ├── layout.tsx
│   │   └── page.jsx
│   ├── logo-cloud-01
│   │   └── page.tsx
│   ├── not-found.jsx
│   ├── payment
│   │   ├── layout.tsx
│   │   └── success
│   │       └── page.jsx
│   ├── profile
│   │   ├── layout.tsx
│   │   └── page.jsx
│   ├── register
│   │   ├── layout.tsx
│   │   └── page.jsx
│   ├── service
│   │   ├── [id]
│   │   │   └── page.jsx
│   │   └── layout.tsx
│   ├── service-coverage
│   │   ├── layout.tsx
│   │   └── page.jsx
│   └── services
│       ├── layout.tsx
│       └── page.jsx
├── components
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Utils
│   │   ├── Btn.jsx
│   │   ├── Cta.jsx
│   │   ├── Heading.jsx
│   │   ├── HeadingLight.jsx
│   │   └── Loader.jsx
│   ├── admin
│   │   └── Header.jsx
│   ├── homepage
│   │   ├── CustomerReviews.jsx
│   │   ├── Hero.tsx
│   │   ├── LatestArticles.jsx
│   │   ├── MapLoader.jsx
│   │   ├── Packages.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ServiceCoverageMap.jsx
│   │   ├── Services.jsx
│   │   ├── TopDecorators.jsx
│   │   └── TrustedCompanies.jsx
│   ├── shadcn-studio
│   │   └── blocks
│   │       └── logo-cloud-01
│   │           └── logo-cloud-01.tsx
│   └── ui
│       └── card.tsx
├── components.json
├── eslint.config.mjs
├── hooks
│   └── use-outside-click.tsx
├── lib
│   ├── Cloudinary.js
│   ├── auth-check.js
│   ├── axios.js
│   ├── providers.js
│   └── utils.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── Images
│   │   ├── arrow.png
│   │   ├── decorators
│   │   │   ├── jhankar.jpg
│   │   │   ├── milton.jpg
│   │   │   ├── talha.jpg
│   │   │   ├── tandra.jpg
│   │   │   ├── tarique.jpg
│   │   │   └── zihad.jpg
│   │   ├── decors
│   │   │   ├── birthday.avif
│   │   │   ├── corp-event.jpeg
│   │   │   ├── fest.jpg
│   │   │   ├── home.jpg
│   │   │   ├── lighting.jpg
│   │   │   └── wedding.jpg
│   │   ├── marker.png
│   │   ├── section-four
│   │   │   ├── button-arrow.svg
│   │   │   ├── fourth-overlay-shadow.png
│   │   │   ├── fourth-video-thumbnail.png
│   │   │   ├── other-project-one-imgs-3.png
│   │   │   ├── other-project-one-imgs1.png
│   │   │   ├── other-project-one-imgs2.png
│   │   │   ├── other-project-one-imgs3.png
│   │   │   ├── owner.png
│   │   │   ├── project-one-pinned.png
│   │   │   └── video-play-icon.svg
│   │   └── section-two
│   │       ├── light-overlay.png
│   │       ├── two-big-image.png
│   │       ├── two-img.png
│   │       └── two-right-img.png
│   ├── fonts
│   │   └── FontsFree-Net-Dream-Avenue.ttf
│   ├── icon.png
│   └── logo.svg
└── tsconfig.json
```

## 🚀 Installation

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn package manager
- StyleDecor Backend API running
- Google OAuth credentials
- Stripe account
- Cloudinary account

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Tahmied/StyleDecor.git
cd styledecor-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
npm start
```

The application will start on `http://localhost:3000`

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_secure_random_secret_key_here
NEXTAUTH_URL=

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe (Optional - for frontend integration)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

### Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (client-side) | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `NEXTAUTH_SECRET` | Secret for encrypting JWT tokens | Yes |
| `NEXTAUTH_URL` | Application base URL | Yes (Production) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |

### Security Notes

⚠️ **Important Security Practices**
- Never commit `.env.local` to version control
- Add `.env.local` to `.gitignore`
- Use strong, randomly generated secrets for `NEXTAUTH_SECRET`
- Keep Google OAuth credentials secure
- Use environment-specific URLs for production

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## 🔒 Authentication System

### NextAuth.js Configuration

StyleDecor uses **NextAuth.js** with two authentication providers:

#### 1. Credentials Provider (Email/Password)

```javascript
CredentialsProvider({
  async authorize(credentials) {
    const res = await fetch(`${process.env.BACKEND_URI}/api/v1/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
      headers: { "Content-Type": "application/json" }
    });

    const response = await res.json();
    if (response.statusCode === 200 && response.data) {
      return {
        _id: response.data.user._id,
        email: response.data.user.email,
        name: response.data.user.name,
        image: response.data.user.image,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        role: response.data.user.role
      };
    }
    return null;
  }
})
```

#### 2. Google OAuth Provider

```javascript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
})
```

### Authentication Flow

#### Email/Password Login Flow
```
1. User submits credentials on /login page
2. NextAuth validates credentials via backend API
3. Backend returns user data + JWT tokens
4. NextAuth creates session with user data and tokens
5. User redirected to appropriate dashboard based on role
```

#### Google OAuth Flow
```
1. User clicks "Sign in with Google"
2. Redirected to Google consent screen
3. Google returns user profile data
4. NextAuth sends user data to backend /google-auth endpoint
5. Backend creates/finds user and returns tokens
6. NextAuth creates session with user data and tokens
7. User redirected to appropriate dashboard
```

### JWT Callbacks

**JWT Callback** - Manages token lifecycle:
```javascript
async jwt({ token, user, account }) {
  // On initial sign in
  if (user) {
    // Google OAuth
    if (account?.provider === "google") {
      const res = await fetch(`${process.env.BACKEND_URI}/api/v1/users/google-auth`, {
        method: 'POST',
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          image: user.image
        })
      });
      const response = await res.json();
      // Store backend tokens in JWT
      token._id = response.data.user._id;
      token.accessToken = response.data.accessToken;
      token.refreshToken = response.data.refreshToken;
      token.role = response.data.user.role;
    }
    // Credentials login
    else {
      token._id = user._id;
      token.accessToken = user.accessToken;
      token.refreshToken = user.refreshToken;
      token.role = user.role;
    }
  }
  // Sync role from backend on subsequent requests
  else if (token?.accessToken) {
    const res = await fetch(`${process.env.BACKEND_URI}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${token.accessToken}` }
    });
    const response = await res.json();
    if (response?.data?.role) {
      token.role = response.data.role;
    }
  }
  return token;
}
```

**Session Callback** - Exposes token data to client:
```javascript
async session({ session, token }) {
  session.user._id = token._id;
  session.user.accessToken = token.accessToken;
  session.user.refreshToken = token.refreshToken;
  session.user.image = token.image;
  session.user.role = token.role;
  return session;
}
```

### Session Management

- **Strategy**: JWT (JSON Web Token)
- **Custom Sign-In Page**: `/login`
- **Session Duration**: Managed by NextAuth defaults
- **Token Storage**: Encrypted in HTTP-only cookies

## 🌐 API Integration

### Axios Configuration

Custom Axios instance with automatic authentication:

```javascript
// lib/api.js
import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Automatically adds auth token
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

### Usage Examples

#### Fetching Services
```javascript
import api from '@/lib/api';

// Get all services
const response = await api.get('/api/v1/services');
const services = response.data.data;

// Get service by ID
const service = await api.get(`/api/v1/services/${serviceId}`);

// Search and filter
const filtered = await api.get('/api/v1/services', {
  params: {
    category: 'Wedding',
    minPrice: 10000,
    maxPrice: 50000
  }
});
```

#### Creating Booking
```javascript
// Create Stripe checkout session
const response = await api.post('/api/v1/payments/create-checkout-session', {
  serviceId: service._id,
  decoratorId: decorator._id,
  eventDate: '2025-01-15',
  eventTime: '10:00 AM',
  eventLocation: 'Dhaka, Bangladesh',
  bookingNotes: 'Special requirements...'
});

// Redirect to Stripe checkout
window.location.href = response.data.url;
```

#### Verifying Payment
```javascript
// After successful payment
const response = await api.post('/api/v1/payments/verify', {
  sessionId: sessionId
});

const { newBooking, newPayment } = response.data.data;
```

### API Features

- **Automatic Authentication**: Access token automatically added to requests
- **Error Handling**: Centralized error handling with interceptors
- **Base URL Configuration**: Environment-based API URL
- **Type-Safe Responses**: Consistent response structure from backend

## 🛡️ Protected Routes

### Server-Side Route Protection

Utility function for protecting pages with role-based access control:

```javascript
// lib/checkAuth.js
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function checkAuth(requiredRole) {
  const session = await getServerSession(authOptions);
  
  // Check if user is authenticated
  if (!session || !session.user) {
    redirect("/login");
  }
  
  // Check if user has required role
  if (requiredRole && session.user.role !== requiredRole) {
    redirect("/");
  }
  
  return session;
}
```

### Usage in Pages

#### User Dashboard (User Role Required)
```javascript
// app/(dashboard)/user-dashboard/page.jsx
import checkAuth from "@/lib/checkAuth";

export default async function UserDashboard() {
  const session = await checkAuth('user');
  
  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      {/* User dashboard content */}
    </div>
  );
}
```

#### Decorator Dashboard (Decorator Role Required)
```javascript
// app/(dashboard)/decorator-dashboard/page.jsx
import checkAuth from "@/lib/checkAuth";

export default async function DecoratorDashboard() {
  const session = await checkAuth('decorator');
  
  return (
    <div>
      <h1>Decorator Dashboard</h1>
      {/* Decorator dashboard content */}
    </div>
  );
}
```

#### Admin Dashboard (Admin Role Required)

**Accessing Admin Panel**: Admins can access the admin panel by clicking the profile icon in the navbar, which opens a dropdown menu showing: Dashboard, Admin Panel (admin only), and Logout.

```javascript
// app/(dashboard)/admin-dashboard/page.jsx
import checkAuth from "@/lib/checkAuth";

export default async function AdminDashboard() {
  const session = await checkAuth('admin');
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin dashboard content */}
    </div>
  );
}
```

#### Any Authenticated User
```javascript
// app/bookings/page.jsx
import checkAuth from "@/lib/checkAuth";

export default async function MyBookings() {
  // No role required - just authentication
  const session = await checkAuth();
  
  return (
    <div>
      <h1>My Bookings</h1>
      {/* Bookings content */}
    </div>
  );
}
```

### Client-Side Route Protection

For client components, use NextAuth session:

```javascript
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {/* Protected content */}
    </div>
  );
}
```

## 🎨 Key Features

### 1. Service Discovery
- **Browse by Category**: Wedding, Birthday, Corporate, Home, Seasonal
- **Advanced Filtering**: Price range, decorator specialty, ratings
- **Search Functionality**: Find services by name or keywords
- **Service Details**: Comprehensive information with images and features

### 2. Booking System
- **Real-Time Availability**: Check decorator schedule instantly
- **Flexible Date Selection**: Choose preferred date and time
- **Location Input**: Specify event location for on-site services
- **Special Requests**: Add custom notes and requirements

### 3. Payment Processing
- **Stripe Checkout**: Secure, PCI-compliant payment flow
- **Multiple Payment Methods**: Credit/debit cards, digital wallets
- **Payment Verification**: Automatic booking creation after payment
- **Receipt Generation**: Email receipts and transaction history

### 4. Dashboard Features

#### User Dashboard
- View upcoming and past bookings
- Track project status in real-time
- Access payment history
- Manage profile and preferences
- Cancel or reschedule bookings

#### Decorator Dashboard
- View assigned projects and details
- Update project status (Planning, Materials Prepared, On the Way, Setup in Progress, Completed)
- Manage availability calendar
- Track earnings and payment history
- Access customer contact information

#### Admin Dashboard
- Service management (Create, Update, Delete)
- User management and role assignment
- Booking oversight and decorator assignment
- Payment tracking and financial analytics
- Feature decorator promotion
- System statistics and reports

### 5. UI/UX Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode Support**: Theme toggle for user preference
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback for actions
- **Animations**: Smooth transitions with Framer Motion

### 6. Google Maps Integration
- **Service Coverage**: React Leaflet maps showing service areas
- **Location Selection**: Interactive map for event location
- **Decorator Proximity**: Find nearest available decorators

## 🔗 Backend Repository

This frontend application connects to the StyleDecor Backend API.

**Backend Repository**: [StyleDecor Backend](https://github.com/Tahmied/StyleDecor-Backend)

### Backend Features
- RESTful API with Express.js
- MongoDB database with Mongoose
- JWT authentication
- Stripe payment processing
- Cloudinary image management
- Email notifications with Nodemailer

### API Endpoints Used

- **Authentication**: `/api/v1/users/login`, `/api/v1/users/google-auth`
- **Services**: `/api/v1/services`
- **Bookings**: `/api/v1/bookings`
- **Payments**: `/api/v1/payments/create-checkout-session`, `/api/v1/payments/verify`
- **Users**: `/api/v1/users/me`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint and Prettier configurations
- Use TypeScript for type safety (if applicable)
- Write meaningful commit messages
- Test thoroughly before submitting PR
- Follow Next.js best practices

## 🐛 Troubleshooting

### Common Issues

**Issue**: NextAuth session not persisting
- **Solution**: Ensure `NEXTAUTH_SECRET` is set and `NEXTAUTH_URL` matches your domain

**Issue**: API requests failing with 401 Unauthorized
- **Solution**: Check if backend is running and access token is valid

**Issue**: Google OAuth not working
- **Solution**: Verify Google OAuth credentials and authorized redirect URIs in Google Console

**Issue**: Images not loading from Cloudinary
- **Solution**: Check Cloudinary configuration and ensure images are uploaded correctly

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Authors

**StyleDecor Team**
- GitHub: [@Tahmied](https://github.com/Tahmied)

## 🙏 Acknowledgments

- Next.js team for excellent framework and documentation
- NextAuth.js for authentication solution
- Tailwind CSS for utility-first styling
- Stripe for payment processing
- Cloudinary for image management
- All open-source contributors

---

**Note**: The project demonstrates full-stack development skills including modern frontend architecture, authentication, payment integration, and responsive design.

For questions or support, please open an issue in the repository.

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Contact: tahmiedhossain4671@gmail.com

---

**Made with 🧑‍💻 by Tahmied Hossain**