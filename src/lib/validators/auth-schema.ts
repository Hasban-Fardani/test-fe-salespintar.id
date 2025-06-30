import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter your username",
  }),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
});

export const registerSchema = loginSchema.extend({
  role: z.enum(["User", "Admin"], {
    required_error: "Role is required",
  }),
  username: z.string().min(3, {
    message: "Please enter your username, at least 3 characters",
  }),
  password: z.string().min(8, {
    message: "Please enter your password, at least 8 characters",
  }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
