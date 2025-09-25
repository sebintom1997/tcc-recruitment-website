# TCC Recruitment Website

A production-ready Next.js 14 application for a global recruitment site, built with modern technologies and best practices.

## 🚀 Features

- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Component Library**: shadcn/ui with custom theming
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Job Management**: Dynamic job listings with search and filters
- **Application System**: GoHighLevel embedded forms
- **CRM Integration**: Direct form submission to GoHighLevel
- **Motion Design**: Framer Motion animations
- **SEO Optimized**: JSON-LD structured data, meta tags
- **Dark Mode**: System preference with manual toggle
- **Analytics**: Plausible Analytics integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React 19
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animation**: Framer Motion
- **Forms**: GoHighLevel embedded forms
- **CRM**: GoHighLevel direct integration
- **Analytics**: Plausible Analytics

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tcc-recruitment-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Application Configuration
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com

   # No additional configuration needed
   # GoHighLevel integration uses embedded forms
   ```

4. **Install shadcn/ui components** (if needed)
   ```bash
   pnpm dlx shadcn@latest init
   pnpm dlx shadcn@latest add button input select badge sheet dialog skeleton toggle form label textarea card dropdown-menu
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

## 🏗️ Project Structure

```
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx         # Root layout with navbar/footer
│   │   ├── page.tsx           # Landing page
│   │   ├── jobs/              # Jobs pages
│   │   ├── connect/           # Connect form
│   │   ├── about/             # About page
│   │   ├── privacy/           # Privacy policy
│   └── components/
│       └── ui/                # shadcn/ui components
├── components/                 # Custom components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── job-card.tsx
│   ├── apply-drawer.tsx
│   └── ...
├── lib/                       # Utility libraries
│   ├── jobs.ts               # Job data management
│   └── utils.ts              # General utilities
├── data/
│   └── jobs.json             # Sample job data
└── styles/
    └── globals.css           # Global styles
```

## 📝 Configuration

### GoHighLevel Setup

1. **Create GoHighLevel forms** for job applications and connect page
2. **Get form IDs** from your GoHighLevel account
3. **Update form URLs** in the drawer components:
   - Update `src` URL in `components/apply-drawer.tsx`
   - Create `connect-drawer.tsx` if needed for connect form
4. **Set up hidden fields** in forms to capture job details (optional):
   - `job_title`, `job_slug`, `job_department`, `job_location`, etc.

### Job Data Management

Jobs are stored in `/data/jobs.json`. The structure is:

```typescript
type Job = {
  slug: string
  title: string
  pitch: string
  location: string
  dept: "Engineering" | "Data" | "Design" | "Product" | "Marketing" | "Operations" | "Other"
  workType: "Full-time" | "Part-time" | "Contract" | "Internship"
  experience: "Graduate" | "Mid-level" | "Senior" | "Executive"
  tags: string[]
  postedAt: string // ISO date
  description: string // Markdown
  applyExternalUrl?: string
}
```

## 🎨 Customization

### Branding
- Update logo and colors in the navbar component
- Modify the hero section content
- Customize the footer with your links and information

### Content
- Edit job data in `/data/jobs.json`
- Update testimonials in the testimonials component
- Modify the about page content

### Styling
- All styling uses Tailwind CSS
- Color scheme can be modified in `globals.css`
- Dark mode is automatically handled

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms
- Build the project: `pnpm build`
- Deploy the `.next` folder and `package.json`
- Ensure environment variables are set

## 🧪 Testing

```bash
# Run linting
pnpm lint

# Run type checking
pnpm build

# Test job filtering functionality
# Check component accessibility
# Validate form submissions
```

## 📈 Performance

- **Lighthouse Score**: 90+ on mobile
- **Bundle Size**: Optimized with Next.js
- **Images**: Responsive with next/image
- **Fonts**: Self-hosted with next/font

## 🔒 Security

- **Form Validation**: Handled by GoHighLevel forms
- **Secure Submission**: Direct to GoHighLevel servers
- **No API Exposure**: Forms handled client-side

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript errors and fix imports
2. **Form Issues**: Verify GoHighLevel form URLs are correct
3. **Display Issues**: Check form embedding and CSS

### Getting Help

- Check the console for detailed error messages
- Verify GoHighLevel form URLs are accessible
- Ensure forms are published and active in GoHighLevel

## 📄 License

This project is proprietary. All rights reserved.

## 🤝 Contributing

This is a production codebase. Please follow the established patterns and test thoroughly before deployment.

---

Built with ❤️ for exceptional talent worldwide