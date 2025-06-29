import { LoginForm } from "@/components/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white sm:bg-gray-100 p-4">
      <LoginForm />
    </main>
  );
}