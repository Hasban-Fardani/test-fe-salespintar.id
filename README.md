# Frontend Blog Article App

A modern blog article management app built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui. This app is designed with a clear separation of user and admin roles, supports SEO-friendly server components, and integrates with a remote backend via local API proxy routes.

![preview](./public/images/preview-desktop.jpg)

---

## ✨ Features

### User

* Login / Register with form validation
* List articles with:

  * Search (with debounce)
  * Filter by category
  * Pagination
* View full article detail
* See related articles (same category)

### Admin

* Login / Register with form validation
* Create / Edit / Delete categories
* Create / Edit / Delete articles
* Preview article before submission
* Manage content with full form validation

---

## 🪄 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **UI:** React 19, Tailwind CSS v4, shadcn/ui
* **Form:** React Hook Form + Zod
* **Data Fetching:** SWR + Axios
* **Icons:** lucide-react
* **Validation:** Zod
* **State Management:** Zustand (for auth)
* **Theme:** next-themes

---

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Lint and format
pnpm lint     # for linting only
pnpm beautify # lint + format
```

Ensure you have the following `.env`:

```env
NEXT_PUBLIC_API_URL=https://test-fe.mysellerpintar.com/api
```

---

## 🔄 Folder Structure

```bash
src/
├── app/                     # App Router
│   ├── api/                 # Local API proxy
│   ├── dashboard/           # Admin-only pages
│   └── articles/            # Public article pages
├── components/
│   ├── features/            # Feature-specific components
│   └── ui/                  # Reusable shadcn/ui components
├── lib/
│   ├── api.ts               # Axios instance
│   ├── fetcher.ts           # SWR fetcher
│   ├── utils.ts
│   └── validators/
├── hooks/
├── context/
├── types/
public/
├── images/
```

---

## 📁 API Access Rules

* All requests go through `/src/app/api/*.ts` as proxy
* Use `@/lib/api.ts` only in `api/` route handlers
* Use `@/lib/fetcher.ts` with SWR in components

### Example: Server Component Fetch

```tsx
const data = await fetcher("http://localhost:3000/api/articles")
```

### Example: Client Component Fetch (with SWR)

```tsx
const { data, isLoading } = useSWR("/api/articles", fetcher)
```

### Example: Form Submit

```tsx
await axios.post("/api/articles", data) // use local API route
```

---

## 📅 Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Type        | When to use                                 |
| ----------- | ------------------------------------------- |
| `feat:`     | Add new user-facing feature                 |
| `fix:`      | Fix a bug                                   |
| `docs:`     | Documentation only changes                  |
| `style:`    | Changes that do not affect logic (CSS)      |
| `chore:`    | Install deps, setup config, or housekeeping |
| `refactor:` | Code restructure, no behavior change        |

### Example:

```bash
git commit -m "chore: install axios and setup api instance"
git commit -m "feat: implement article search with debounce"
```

---

## 🔧 Deployment

App is designed to be deployed on [Vercel](https://vercel.com/):

* SSR + CSR ready
* Optimized for SEO
* Environment variable support

---

## 🌐 Live Demo
> [test-fe-salespintar-id-hf.vercel.app](test-fe-salespintar-id-hf.vercel.app)

---


## ✌️ Author

Made with ❤️ by Hasban Fardani
[hasban.site](https://hasbanfardani.my.id)  •  [GitHub](https://github.com/Hasban-Fardani)  •  [YouTube](https://www.youtube.com/@code_with_hasban)
