# TCC Recruitment Website

A production-ready Next.js 14 application for a global recruitment site, built with modern technologies and best practices.

## 🚀 Features

- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Component Library**: shadcn/ui with custom theming
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Job Management**: Dynamic job listings with search and filters
- **Application System**: CV upload and form submission
- **CRM Integration**: HighLevel (GoHighLevel) API v2 integration
- **File Storage**: AWS S3 with presigned uploads
- **Motion Design**: Framer Motion animations
- **SEO Optimized**: JSON-LD structured data, meta tags
- **Dark Mode**: System preference with manual toggle
- **Analytics**: Plausible Analytics integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React 19
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Storage**: AWS S3 (presigned uploads)
- **CRM**: HighLevel (GoHighLevel) API v2
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

   # HighLevel (GoHighLevel) API Configuration
   GHL_BASE_URL=https://services.leadconnectorhq.com
   GHL_API_VERSION=2021-07-28
   GHL_LOCATION_ID=your_location_id
   GHL_PIPELINE_ID=your_pipeline_id
   GHL_STAGE_ID=your_stage_id
   GHL_TOKEN=your_api_token

   # HighLevel Custom Field IDs
   GHL_CF_CV_URL=your_cv_field_id

   # AWS S3 Configuration
   S3_BUCKET=your-s3-bucket
   S3_REGION=us-east-1
   S3_ACCESS_KEY_ID=your_access_key
   S3_SECRET_ACCESS_KEY=your_secret_key
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
│   │   └── api/               # API routes
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
│   ├── highlevel.ts          # HighLevel API integration
│   ├── s3.ts                 # AWS S3 utilities
│   └── utils.ts              # General utilities
├── data/
│   └── jobs.json             # Sample job data
└── styles/
    └── globals.css           # Global styles
```

## 📝 Configuration

### HighLevel Setup

1. **Create a HighLevel account** and get your API credentials
2. **Set up custom fields** for CV URL
3. **Create a pipeline** for job applications and talent pool
4. **Configure webhooks** (optional) for real-time updates

### AWS S3 Setup

1. **Create an S3 bucket** for file uploads
2. **Configure CORS** to allow uploads from your domain:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "POST", "PUT"],
       "AllowedOrigins": ["https://your-domain.com"],
       "ExposeHeaders": ["ETag"]
     }
   ]
   ```

3. **Set up IAM user** with limited permissions:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:PutObjectAcl",
           "s3:GetObject"
         ],
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

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

- **Form Validation**: Client and server-side with Zod
- **File Uploads**: Restricted types and sizes
- **API Routes**: Input validation and error handling
- **CORS**: Properly configured for S3 uploads

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript errors and fix imports
2. **API Issues**: Verify environment variables are set
3. **Upload Issues**: Check S3 bucket permissions and CORS
4. **HighLevel Issues**: Verify API credentials and field IDs

### Getting Help

- Check the console for detailed error messages
- Verify all environment variables are correctly set
- Ensure external services (HighLevel, S3) are properly configured

## 📄 License

This project is proprietary. All rights reserved.

## 🤝 Contributing

This is a production codebase. Please follow the established patterns and test thoroughly before deployment.

---

Built with ❤️ for exceptional talent worldwide