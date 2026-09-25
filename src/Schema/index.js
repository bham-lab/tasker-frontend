import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[a-z]/, "Must include a lowercase letter")
})


export const todoSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Task can't be empty")
    .max(200, "It's too many characters")
})


export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name is too long"),

  email: z
    .string()
    .email("Invalid email"),

  bio: z
    .string()
    .optional(),

  url: z
    .string()
    .optional()
})


export const signupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name is too long"),
  email: z
    .string()
    .email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[a-z]/, "Must include a lowercase letter"),
  confirmPassword: z.string()


}).refine((data) => data.password === data.confirmPassword, { message: "The password doesn't much", path: [ "confirmPassword" ], })