# 🧪 test-frontend-sellerpintar.id

Frontend project berbasis **Next.js 15+** (App Router) dengan standar folder & konvensi ketat untuk efisiensi tim dan konsistensi kode.

---

## ⚙️ Teknologi

- 🔧 **Next.js 15+** + **React 19+**
- 🎨 Tailwind CSS v4
- 🧩 shadcn/ui
- 🧾 React Hook Form + Zod
- 🔄 SWR + Axios
- 🔤 Lucide Icons

---

## 📦 Struktur Folder

```
src/
├─ app/               # Halaman + API lokal
│  ├─ api/            # Proxy ke backend eksternal
│  └─ dashboard/
├─ components/
│  ├─ features/       # Komponen spesifik fitur
│  └─ ui/             # Komponen reusable (shadcn)
├─ context/           
├─ hooks/             # Custom hooks
├─ lib/               # API client, fetcher, utils, validator
├─ types/             # Global types/interfaces
```

---

## 🔌 Aturan API

✅ Semua request lewat `/api/*.ts` (proxy)  
✅ Gunakan `api.ts` HANYA di route handler  
✅ Ambil data dengan `fetcher.ts` (jangan pakai native `fetch()`)

---

## 📤 Fetcher + Axios

```ts
// lib/api.ts
import axios from "axios";
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});
```

```ts
// lib/fetcher.ts
import api from "@/lib/api";
export const fetcher = (url: string) => api.get(url).then(res => res.data);
```

---

## 🧠 Contoh Penggunaan

### ✅ Server Component

```tsx
import { fetcher } from "@/lib/fetcher";

export default async function Page() {
  const data = await fetcher("http://localhost:3000/api/users");
  return <div>{data.length} users</div>;
}
```

### ✅ Client Component (SWR)

```tsx
"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const ProfileForm = () => {
  const { data, isLoading } = useSWR("/api/users", fetcher);
  if (isLoading) return <p>Memuat...</p>;
  return <pre>{JSON.stringify(data)}</pre>;
};
```

### ✅ Form Submission

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { profileSchema, ProfileSchemaType } from "@/lib/validators/profile-schema";

const form = useForm<ProfileSchemaType>({ resolver: zodResolver(profileSchema) });

const onSubmit = async (data: ProfileSchemaType) => {
  await axios.post("/api/profile", data);
};
```

---

## 🧩 Penamaan File

| Jenis         | Format       | Contoh               |
|---------------|--------------|----------------------|
| Komponen      | `PascalCase` | `UserProfile.tsx`    |
| Hook          | `camelCase`  | `useUser.ts`         |
| API Route     | `camelCase`  | `userLogin.ts`       |
| Schema        | `kebab-case` | `profile-schema.ts`  |
| Folder        | `kebab-case` | `profile-form/`      |

---

## 📜 Script Penting

| Perintah       | Fungsi                          |
|----------------|---------------------------------|
| `pnpm dev`     | Jalankan development server     |
| `pnpm build`   | Build untuk production          |
| `pnpm start`   | Start server production         |
| `pnpm beautify`| Format + lint pakai Biome       |

---

## 👤 Author

**Hasban Fardani**  
📍 Cimahi, Jawa Barat  
🌐 [hasban.site](https://hasban.site) • 🧑‍💻 [GitHub](https://github.com/Hasban-Fardani)

---

> Untuk struktur lengkap dan rule tambahan, lihat `llms.txt` di project root.
