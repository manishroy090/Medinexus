
import { title } from 'node:process';
import { z } from 'zod';
export const LoginSchema = z.object({
    email: z.email({
        error: "Please enter valid email address"
    }).min(1, { message: "Email is required" }).max(100),
    password: z.string().min(1, { message: "Password is required" }).max(100), 
})


export type LoginSchema = z.infer<typeof LoginSchema>