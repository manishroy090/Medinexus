
import { title } from 'node:process';
import { z } from 'zod';
export const HoshpitalOnboardingSchema = z.object({
    name: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    email: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    password: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    confirm_password: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    registration_number: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    tax_id: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    website: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    emergency_contact: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    established_date: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    total_beds: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    logo: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    address_line_1: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    address_line2: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    city: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    state: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    country_id: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    description: z.string({ error: "Description must be a string" }).optional(),
})


export type HoshpitalOnbardingSchema = z.infer<typeof HoshpitalOnboardingSchema>