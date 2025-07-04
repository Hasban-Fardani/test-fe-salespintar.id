"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner"
import { LoginSchemaType, loginSchema } from "@/lib/validators/auth-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import request from "@/lib/request";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setServerError(null);
    try {
      const response = await request.post("/api/auth/login", data);

      if (response.status === 200) {
        toast.success("Login Successful");
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
        setServerError(errorMessage);
        toast.error("Login Failed", {
          description: errorMessage,
        });
      } else {
        console.error("ERROR: ", error)
        toast.error("An Error Occurred", {
          description: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image src="/images/logo-ipsum.png" alt="Logo" width={150} height={70} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="input username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="input password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {serverError && (
              <div className="text-sm font-medium text-destructive">
                {serverError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/register" className="font-medium text-primary hover:underline">
            Register
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}