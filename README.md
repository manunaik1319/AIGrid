# AIGrid

A comprehensive AI tools directory and workflow builder platform built with Next.js 14.

## Features

- 🔍 AI Tools Directory with advanced search and filtering
- 📊 Tool comparison functionality
- 🔄 Visual workflow builder with drag-and-drop
- 📈 Trending tools and analytics
- 👤 User authentication and personalized dashboard
- 🎯 Category-based tool organization
- ⚡ Server-side rendering for optimal performance

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js v5
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Workflow Builder:** React Flow
- **Forms:** React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/aigrid.git
cd aigrid
```

2. Install dependencies:
```bash
cd aigrid
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
aigrid/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── category/          # Category pages
│   ├── compare/           # Tool comparison
│   ├── search/            # Search functionality
│   ├── tool/              # Tool detail pages
│   ├── trending/          # Trending tools
│   └── workflows/         # Workflow builder
├── components/            # React components
│   ├── aigrid/           # Core UI components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── workflows/        # Workflow builder components
│   └── ...
├── lib/                   # Utility functions and data
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/aigrid)

### Deploy to GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment.

1. Enable GitHub Pages in repository settings
2. Set the source to "GitHub Actions"
3. Push to main branch to trigger deployment

## Environment Variables

Required environment variables:

- `NEXTAUTH_URL` - Your application URL
- `NEXTAUTH_SECRET` - Secret for NextAuth.js (generate with `openssl rand -base64 32`)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
