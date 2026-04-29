
import { title } from 'node:process';
import { z } from 'zod';
export const HoshpitalOnbardingSchema = z.object({
    name: z.string({
        error: "Title must be a string"
    }).min(1, { message: "Title is required" }).max(100),
    email: z.email({
        error: "Please enter valid email address"
    }).min(1, { message: "Email is required" }).max(100),
    password: z.string().min(1, { message: "Password is required" }).max(100),
    confirm_password: z.string().min(1, { message: "Confirm Password is required" }).max(100),
    registration_number: z.string().min(1, { message: "Registration number is required" }).max(100),
    tax_id: z.string().min(1, { message: "Tax id is required" }).max(100),
    website: z.string().min(1, { message: "Website is required" }).max(100),
    emergency_contact: z.string().min(1, { message: "Emergency contact is required" }).max(100),
    established_date: z.string().min(1, { message: "Established date is required" }).max(100),
    total_beds: z.string().min(1, { message: "Total bed is required" }).max(100),
    // logo: z.object({
    //     logo: z
    //         .instanceof(File, { message: "Logo is required" })
    //         .refine(
    //             (file) => ["image/png", "image/jpeg"].includes(file.type),
    //             { message: "Only PNG and JPEG images are allowed" }
    //         )
    //         .refine(
    //             (file) => file.size > 0,
    //             { message: "Logo is required" }
    //         ),
    // }),
    address_line1: z.string().min(1, { message: "Address line is required" }).max(100),
    address_line2: z.string().min(1, { message: "Address line 2 required" }).max(100),
    city: z.string().min(1, { message: "City is required" }).max(100),
    state: z.string().min(1, { message: "State is required" }).max(100),
    country_id: z.number().min(10, { message: "Country is required" }).max(500),
    description: z.string({ error: "Description must be a string" }).optional(),
    postal_code:z.string().min(1, { message: "PostalCode is required" }).max(100),
})


export type HoshpitalOnbardingSchema = z.infer<typeof HoshpitalOnbardingSchema>