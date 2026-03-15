# AIGrid - GitHub Deployment Guide

## Step 1: Configure Git Identity

Run these commands in your terminal (replace with your GitHub email and name):

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

## Step 2: Create Initial Commit

```bash
git commit -m "Initial commit: AIGrid project"
```

## Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `aigrid`
3. Do NOT initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

## Step 4: Push to GitHub

After creating the repository, run these commands:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aigrid.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
5. Click "Save"

## Step 6: Configure Secrets (Optional)

If you need authentication features:

1. Go to repository Settings → Secrets and variables → Actions
2. Add these secrets:
   - `NEXTAUTH_URL`: Your deployment URL (e.g., `https://YOUR_USERNAME.github.io/aigrid`)
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`

## Step 7: Deploy

The GitHub Actions workflow will automatically:
- Build your Next.js app
- Export static files
- Deploy to GitHub Pages

Your site will be available at: `https://YOUR_USERNAME.github.io/aigrid`

## Alternative: Deploy to Vercel

For a simpler deployment with better Next.js support:

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - Root Directory: `aigrid`
   - Framework Preset: Next.js
4. Add environment variables if needed
5. Click "Deploy"

## Troubleshooting

### Build Fails
- Check the Actions tab in GitHub for error logs
- Ensure all dependencies are in package.json
- Verify Next.js config is correct

### Images Not Loading
- The config uses `unoptimized: true` for static export
- External images should load from configured domains

### Authentication Issues
- NextAuth.js requires server-side features
- Consider using Vercel or another platform with serverless support
- Or implement a separate backend API

## Project Structure

```
AIgrid/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── aigrid/                     # Next.js application
│   ├── app/                    # App router pages
│   ├── components/             # React components
│   ├── lib/                    # Utilities and data
│   ├── next.config.mjs         # Next.js config (static export)
│   └── package.json
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## Notes

- The app is configured for static export (`output: 'export'`)
- Images are unoptimized for static hosting
- Some Next.js features (API routes, ISR) won't work in static export
- For full features, deploy to Vercel or similar platform

## Need Help?

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vercel Deployment Docs](https://vercel.com/docs)
