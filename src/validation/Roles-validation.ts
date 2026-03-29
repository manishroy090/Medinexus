
import { title } from 'node:process';
import { z } from 'zod';
export const RoleSchema = z.object({
    title: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    description: z.string({ error: "Description must be a string" }).optional(),
})


export type RoleSchema = z.infer<typeof RoleSchema>