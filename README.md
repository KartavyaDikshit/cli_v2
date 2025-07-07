# cli_v2

This project is a Next.js application bootstrapped with `create-next-app`, designed to provide a robust foundation for modern web development. It leverages the App Router for routing, Tailwind CSS for styling, and `next-intl` for comprehensive internationalization. The application is configured for optimal SEO and includes a testing setup with Jest, Playwright, and Cypress.

---

## 🔑 Key Features

- **Framework:** Next.js 15.3.5 with App Router  
- **Styling:** Tailwind CSS  
- **Internationalization:** Support for English (en), French (fr), German (de), Japanese (ja), and Korean (ko) using `next-intl`  
- **SEO:** Pre-configured for optimal search engine performance with `SEOHead` component and structured data generation. Includes Lighthouse configuration for auditing.  
- **Testing:** Comprehensive suite including Jest, Playwright, and Cypress

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KartavyaDikshit/cli_v2.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cli_v2
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

---

## 💻 Development Workflow

To start the local development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. The page will auto-update as you edit the files.

### Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production-ready build.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase for errors.

---

## 🗂️ Project Structure

```
cli_v2/
├── src/
│   ├── app/                # App Router setup, global styles, root layout
│   ├── components/         # Reusable React components (e.g., SEOHead)
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   ├── i18n/           # next-intl locale definitions
│   │   └── seo/            # SEO-related utilities (structured-data.ts)
│   ├── testing/            # Testing-related utilities
│   └── types/              # TypeScript definitions
├── public/                 # Static assets (images, favicons)
├── tests/
│   └── seo/                # SEO-specific tests
├── .github/workflows/      # GitHub Actions (CI/CD)
├── middleware.ts           # i18n + route handling
├── next.config.mjs         # Next.js config
├── postcss.config.mjs      # Tailwind/PostCSS config
├── tsconfig.json           # TypeScript config
└── lighthouserc.js         # Lighthouse CI config
```

---

## 🧪 Testing

This project uses:

- **Jest**, **Playwright**, and **Cypress** for quality assurance.
- While specific scripts like `test:unit` or `test:e2e` aren't predefined, you can run:
  - `jest`
  - `npx playwright test`
  - `npx cypress run`

- **SEO Audits** via Lighthouse:

   ```bash
   npm run lighthouse
   ```

   Or manually via CLI using the included `lighthouserc.js`.

---

## 📦 Deployment

This app is easily deployable to [Vercel](https://vercel.com/). Ensure your environment variables and `next.config.mjs` settings are aligned with the deployment platform.

---

## 📄 License

MIT License – feel free to use, modify, and distribute under the license terms.
