import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || z.string().url().safeParse(value).success, "Enter a valid URL");

export const planSchema = z.object({
  name: z.string().trim().min(1, "Plan name is required"),
  priceMonthly: z.string().trim().optional(),
  priceYearly: z.string().trim().optional(),
  limits: z.string().trim().min(1, "Key limits are required"),
  ctaLabel: z.string().trim().min(1, "CTA label is required"),
});

export const submitSchema = z
  .object({
    name: z.string().trim().min(2, "Tool name is required").max(50, "Keep the name under 50 characters"),
    tagline: z
      .string()
      .trim()
      .min(5, "Tagline is required")
      .max(80, "Tagline must be 80 characters or fewer"),
    description: z
      .string()
      .trim()
      .min(100, "Description must be at least 100 characters"),
    primaryCategory: z.string().min(1, "Primary category is required"),
    secondaryCategory: z.string().optional().or(z.literal("")),
    tags: z
      .array(z.string().trim().min(1))
      .min(1, "Choose at least one tag")
      .max(10, "You can add up to 10 tags"),
    features: z
      .array(z.string().trim().min(1, "Feature cannot be empty"))
      .min(1, "Add at least one feature")
      .max(10, "You can add up to 10 features"),
    pricingModel: z.enum(["Free", "Freemium", "Paid", "API-only"]),
    plans: z.array(planSchema).max(10, "You can add up to 10 plans"),
    hasFreeTier: z.boolean().default(false),
    isOpenSource: z.boolean().default(false),
    openSourceUrl: optionalUrl,
    websiteUrl: z.string().trim().url("Enter a valid website URL"),
    logoUrl: z.string().trim().min(1, "Logo is required"),
    twitterUrl: optionalUrl,
    githubUrl: optionalUrl,
    docsUrl: optionalUrl,
    apiDocsUrl: optionalUrl,
  })
  .superRefine((data, ctx) => {
    if ((data.pricingModel === "Freemium" || data.pricingModel === "Paid") && data.plans.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["plans"],
        message: "Add at least one pricing plan",
      });
    }

    if (data.isOpenSource && !data.openSourceUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["openSourceUrl"],
        message: "GitHub URL is required for open source tools",
      });
    }
  });

export type SubmitFormData = z.infer<typeof submitSchema>;
