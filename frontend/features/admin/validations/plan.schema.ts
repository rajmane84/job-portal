import z from "zod";

export const planSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  price: z
    .number({ error: "Price must be a number" })
    .min(0, "Price cannot be negative"),
  currency: z.enum(["INR", "USD", "EUR", "GBP"]),
  durationDays: z
    .number({ error: "Duration must be a number" })
    .int("Duration must be a whole number")
    .min(1, "Duration must be at least 1 day"),
  jobPostLimit: z
    .number({ error: "Job post limit must be a number" })
    .int("Job post limit must be a whole number")
    .min(-1, "Use -1 for unlimited, or a positive number"),
  features: z.array(z.string().min(1, "Feature description is required")).default([]),
  isFeatured: z.boolean(),
  isDefault: z.boolean(),
  displayOrder: z
    .number({ error: "Display order must be a number" })
    .int()
    .min(0),
  isActive: z.boolean(),
});

export type PlanFormValues = z.infer<typeof planSchema>;