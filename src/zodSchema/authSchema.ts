import { z } from "zod";
import { EmailSchema, PasswordSchema } from "./commonSchema";

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type Login = z.infer<typeof LoginSchema>;
